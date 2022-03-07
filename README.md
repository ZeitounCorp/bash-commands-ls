# ls

> ls command from bash ported to node.js

## Installation

```bash
npm install --save @bash-commands/ls
```

## Usage

```node
const ls = require('@bash-commands/ls');

// .... Your code here ....
async function main() {
  try {
    let result;
    
    // usage with default options
    result = await ls();
    console.log(result);
    // [ 'README.md', 'package.json', 'package-lock.json', 'node_modules', 'dist', 'src', 'index.js' ]

    // usage with custom options
    result = await ls('./', 'file', {
      args: {
        a: true, // equivalent to -a
        l: true, // equivalent to -l
      },
      output_path: './tmp/logs/', // default is './out/'
      arg_prefix: '--', // default is '-'
      arg_suffix: '=', // default is ' '
    });
    console.log(result);
    /** 
      * [
      * 'drwxr-xr-x  15 username  staff   480  7 jan 16:20 .', 
      * 'drwxr-xr-x  15 username  staff   480  7 jan 16:20 ..',
      * '-rw-r--r--  1 username  staff   609  7 jan 16:20 README.md',
      * '-rw-r--r--  1 username  staff   609  7 jan 16:20 package.json',
      * ]
      */
  } catch (err) {
    console.error(err);
  }
}
```

## Configuration (optional)

| Parameter | Type       | Default                                                              | Description                                                                                              |
| --------- | ---------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| dir       | `string`   | `./`                                                                 | On which directory should ls be executed                                                                 |
| output    | `'console' | 'file'`                                                              | `'console'`                                                                                              | Should the ls command returns the stdout or should write it in an output file |
| options   | `object`   | `{args: {}, output_path: './out', arg_prefix: '-', arg_suffix: ' '}` | Configuration for the ls command, like passing `args`, defining the output path when `output === 'file'` |

## License

[![License: ISC](https://img.shields.io/badge/License-ISC-red.svg)](https://opensource.org/licenses/ISC)
