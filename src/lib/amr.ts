import fs from "fs-extra";
import {TypedRegEx} from "typed-regex";

const AMR_SEPARATOR = "\n\n";
const COMMENT_REGEX = TypedRegEx(
  `((::(?<key>\\S+) +(?<value>.+?(?= ::|$)))|::(?<keyOnly>\\S+))+`,
  `g`,
);
const INDENT = " ".repeat(6);

function processLines(lines: string[]): AMR[] {
  const amrs: AMR[] = [];

  const currAMRLines: string[] = [];
  const currComments: string[] = [];
  let level = 0;
  for (const [i, rawLine] of lines.entries()) {
    const line = rawLine.trim();
    if (!line) {
      continue;
    }
    if (line.startsWith("#")) {
      if (level) {
        throw new Error(`Invalid AMR content on line ${i + 1}.`);
      }
      currComments.push(line);
    } else {
      level += countBracketNests(line);
      currAMRLines.push(line);
      if (!level) {
        const amr = new AMR(currAMRLines.join(" "));
        for (const comment of currComments) {
          amr.addComment(comment);
        }
        amrs.push(amr);
        currAMRLines.length = 0;
        currComments.length = 0;
      }
    }
  }

  return amrs;
}

function countBracketNests(line: string): number {
  let res = 0;
  let valid = true;

  for (const c of line) {
    if (c === `"`) {
      valid = !valid;
    }
    if (valid) {
      if (c === "(") {
        ++res;
      } else if (c === ")") {
        --res;
      }
    }
  }

  return res;
}

export class AMR {
  static async fromFile(filePath: string): Promise<AMR[]> {
    const contentBuf = await fs.readFile(filePath);
    const content = contentBuf.toString("utf-8");
    return AMR.fromString(content);
  }

  static fromString(content: string): AMR[] {
    const lines = content.split("\n");
    return processLines(lines);
  }

  static async writeAllToFile(filePath: string, amrs: AMR[]): Promise<void> {
    const content = AMR.writeAllToString(amrs);
    await fs.writeFile(filePath, content);
  }

  static writeAllToString(amrs: AMR[]): string {
    const content = amrs.map((v) => v.toString()).join(AMR_SEPARATOR);
    return content;
  }

  public metadata: Map<string, string> = new Map();

  constructor(public linearizedAmr: string) {}

  addComment(comment: string): void {
    comment = comment.trim();
    const hashtagIndex = comment.indexOf("#");
    if (hashtagIndex !== -1) {
      if (comment.length === hashtagIndex + 1) {
        return;
      }
      comment = comment.substring(hashtagIndex + 1);
      comment = comment.trim();
    }

    const matches = COMMENT_REGEX.matchAll(comment);
    for (const match of matches) {
      if (!match.groups) {
        continue;
      }
      const {key, value, keyOnly} = match.groups;
      if (keyOnly) {
        this._safeAddMetadata(keyOnly, "");
      } else if (key && value) {
        this._safeAddMetadata(key, value);
      } else {
        //~ This should never happen.
        throw new Error(`Unexpected unhandled regex matching case.`);
      }
    }
  }

  toString(): string {
    const lines: string[] = [];

    for (const [key, rawValue] of this.metadata.entries()) {
      let value = rawValue;
      if (value) {
        value = " " + value;
      }
      lines.push(`# ::${key}${value}`);
    }

    lines.push(this.toAMRString());

    return lines.join("\n");
  }

  toAMRString(): string {
    const res: string[] = [];
    const lines = this.linearizedAmr.split(":");

    let level = 0;
    for (let i = 0; i < lines.length; ++i) {
      const line = lines[i].trim();
      if (i === 0) {
        res.push(line);
      } else {
        res.push(`${INDENT.repeat(level)}:${line}`);
      }
      level += countBracketNests(line);
    }

    return res.join("\n");
  }

  async writeToFile(filePath: string): Promise<void> {
    await fs.writeFile(filePath, this.toString());
  }

  private _safeAddMetadata(key: string, value: string): void {
    if (this.metadata.has(key)) {
      throw new Error(`Key "${key}" already exists in the current metadata.`);
    }
    this.metadata.set(key, value);
  }
}
