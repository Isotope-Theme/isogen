import {Command, flags} from '@oclif/command'

import * as fs from 'fs'
import * as path from 'path'

import inquirer from 'inquirer';
import {generateDirectory} from '../generator'

export default class New extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    name: flags.string({char: 'n', description: 'name of program/project'}),
    url: flags.string({char: 'u', description: 'url for program/project'}),
    output: flags.string({char: 'o', description: 'path to output file/directory'}),
    template: flags.string({char: 't', description: 'path to template file/directory'}),
  }

  async run() {
    const {flags} = this.parse(New)
    var templateDir: string = "";
    if (flags.template === undefined && fs.existsSync(path.join(process.cwd(), 'Isotope-Theme/template/'))) {
      templateDir = path.join(process.cwd(), 'Isotope-Theme/template/');
    } else if (flags.template === undefined) {
      console.error("Must define a repository template")
      return false;
    } else {
      templateDir = flags.template;
    }
    var prompts = []
    if (!flags.name) {
      prompts.push({name: 'name', type: 'string', message: 'name of program/project'})
    }
    if (!flags.url) {
      prompts.push({name: 'url', type: 'string', message: 'url for program/project'})
    }
    inquirer.prompt(prompts).then(function (prompted) {
      var args: any = {}
      args['name'] = prompted['name'] || flags.name
      args['url'] = prompted['url'] || flags.url || undefined;
      args['year'] = (new Date()).getFullYear();
      args['githubUserContent'] = `https://raw.githubusercontent.com/Isotope-Theme/${args['name'].toLowerCase()}`
      generateDirectory(templateDir, flags.output || path.join(process.cwd(), args['name'].toLowerCase()), args);
    });
  }
}
