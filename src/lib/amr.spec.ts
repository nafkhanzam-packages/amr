import {AMR} from "./amr";

describe("Input and output tests.", () => {
  it("should process LDC2020T02 input and output correctly", async () => {
    const amrs = await AMR.fromFile("test/examples/LDC2020T02.txt");
    const content = AMR.writeAllToString(amrs);

    expect(content).toMatchSnapshot();
  });
});
