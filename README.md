oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @nafkhanzam/amr
$ amr COMMAND
running command...
$ amr (--version)
@nafkhanzam/amr/0.0.1 linux-x64 node-v18.13.0
$ amr --help [COMMAND]
USAGE
  $ amr COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`amr hello PERSON`](#amr-hello-person)
* [`amr hello world`](#amr-hello-world)
* [`amr help [COMMAND]`](#amr-help-command)

## `amr hello PERSON`

Say hello

```
USAGE
  $ amr hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/nafkhanzam/amr/blob/v0.0.1/dist/commands/hello/index.ts)_

## `amr hello world`

Say hello world

```
USAGE
  $ amr hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `amr help [COMMAND]`

Display help for amr.

```
USAGE
  $ amr help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for amr.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.23/src/commands/help.ts)_
<!-- commandsstop -->
