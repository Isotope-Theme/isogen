isogen
======

Isotope theme generator

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/isogen.svg)](https://npmjs.org/package/isogen)
[![Downloads/week](https://img.shields.io/npm/dw/isogen.svg)](https://npmjs.org/package/isogen)
[![License](https://img.shields.io/npm/l/isogen.svg)](https://github.com/Nedra1998/isogen/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g isogen
$ isogen COMMAND
running command...
$ isogen (-v|--version|version)
isogen/0.0.0 linux-x64 node-v14.2.0
$ isogen --help [COMMAND]
USAGE
  $ isogen COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`isogen generate [FILE]`](#isogen-generate-file)
* [`isogen help [COMMAND]`](#isogen-help-command)
* [`isogen new`](#isogen-new)

## `isogen generate [FILE]`

describe the command here

```
USAGE
  $ isogen generate [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/generate.ts](https://github.com/Nedra1998/isogen/blob/v0.0.0/src/commands/generate.ts)_

## `isogen help [COMMAND]`

display help for isogen

```
USAGE
  $ isogen help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `isogen new`

describe the command here

```
USAGE
  $ isogen new

OPTIONS
  -h, --help               show CLI help
  -n, --name=name          name of program/project
  -o, --output=output      path to output file/directory
  -t, --template=template  (required) path to template file/directory
  -u, --url=url            url for program/project
```

_See code: [src/commands/new.ts](https://github.com/Nedra1998/isogen/blob/v0.0.0/src/commands/new.ts)_
<!-- commandsstop -->
