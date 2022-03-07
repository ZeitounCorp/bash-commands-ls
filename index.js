const bash = require('bash');
const util = require('util');
const fs = require('fs');
const path = require('path');
const exec = util.promisify(require('child_process').exec);
const mkdir = util.promisify(fs.mkdir);
const getDirName = path.dirname;

const default_path = './';
const default_output = 'console';
const default_options = {
  args: {},
  output_path: './out/',
  arg_prefix: '-',
  arg_suffix: ' ',
};

/**
 * @param {string} dir
 * @param {'console'|'file'} output
 * @param {{ args?: object, output_path?: string, arg_prefix?: string, arg_suffix?: string}} options
 * @returns {Promise<Array|string>} the output of the command if output is 'console' else the path to the file
 */
async function ls(dir = default_path, output = default_output, options = default_options) {
  try {
    let args_formatted = '';
    if (options.args) {
      args_formatted = bash.args(options.args, options.arg_prefix || default_options.arg_prefix, options.arg_suffix || default_options.arg_suffix);
    }
    if (output === 'console') {
      const { stdout, stderr } = await exec(`ls ${args_formatted} ${dir}`);
      if (stderr) {
        throw new Error(stderr);
      }
      return stdout.split('\n').filter(line => line !== '');
    } else {
      const output_path = path.join(options.output_path || default_options.output_path, `ls_${Date.now()}.txt`);
      const {stderr, stdout} = await exec(`ls ${args_formatted} ${dir}`);
      if (stderr) {
        throw new Error(stderr);
      }
      await writeFile(output_path, stdout);
      return output_path;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// Helper write to local file function
async function writeFile(path, content) {
   try {
     await mkdir(getDirName(path), { recursive: true });
     fs.writeFileSync(path, content);
     return path;
   } catch (err) {
     console.error(err);
     throw err;
   }
}

module.exports = ls;
