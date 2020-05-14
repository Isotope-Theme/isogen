import {Command, flags} from '@oclif/command'

import * as fs from 'fs'
import * as path from 'path'

import inquirer from 'inquirer';
import YAML from 'yaml';
import {generateDirectory} from '../generator'

export default class Generate extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    template: flags.string({char: 't', required: true, default: 'template', description: 'path to template directory'}),
    output: flags.string({char: 'o', required: true, default: './', description: 'path to output directory'}),
    scheme: flags.string({char: 's', default: '../Isotope-Theme/palette.yml', description: "path to color scheme definition"})
  }

  async run() {
    const {flags} = this.parse(Generate)

    const scheme = YAML.parse(fs.readFileSync(flags.scheme, 'utf8'))

    var args: any = {...scheme};
    args['year'] = (new Date()).getFullYear();
    args['githubOrg'] = 'https://github.com/Isotope-Theme'
    generateDirectory(flags.template, flags.output, args);
  }
}
