import {Command, flags} from '@oclif/command';

import * as Color from 'color';

import * as path from 'path';
import * as fs from 'fs';
import * as isotopeScheme from './colors/isotope.json';

const Handlebars = require('handlebars')

Handlebars.registerHelper('hex', function (arg: string) {
  return Color(arg).hex();
});
Handlebars.registerHelper('Hex', function (arg: string) {
  return Color(arg).hex().substring(1);
});
Handlebars.registerHelper('rgb', function (arg: string) {
  return Color(arg).rgb().string();
});
Handlebars.registerHelper('hsl', function (arg: string) {
  return Color(arg).hsl().string();
});

function fillScheme(base: any): any{
  if (!('black0' in base)) base['black0'] = base['base1'];
  if (!('black1' in base)) base['black1'] = base['base2'];
  if (!('black2' in base)) base['black2'] = base['base3'];
  if (!('white0' in base)) base['white0'] = base['base5'];
  if (!('white1' in base)) base['white1'] = base['base6'];
  if (!('white2' in base)) base['white2'] = base['base7'];
  for (const key of Object.keys(base)) {
    const name = key.substring(0, key.length - 1);
    const index = parseInt(key.substring(key.length - 1), 16);
    if (index !== 0 && !(`${name}${index - 1}` in base)) {
      base[`${name}${index - 1}`] = Color(base[key]).darken(0.25).hex();
    }
    if (index !== 8 && !(`${name}${index + 1}` in base)) {
      base[`${name}${index + 1}`] = Color(base[key]).lighten(0.25).hex();
    }
  }
  return base;
}

function lightScheme(base: any): any{
  return fillScheme(base);
}
function darkScheme(base: any): any{
  return fillScheme(base);
}

class Isogen extends Command {
  static description = 'describe the command here'

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    all: flags.boolean({char: 'a', description: 'Generate scheme for all templates'}),
    template: flags.string({char: 't', multiple: true, description: 'Templates to generate scheme for'}),
    output: flags.string({char: 'o', description: 'output directory for targets', default: './out/'})
  }

  async run() {
    const {args, flags} = this.parse(Isogen)
    const files = fs.readdirSync(path.join(__dirname, '/templates'));
    const scheme = darkScheme(isotopeScheme)
    if(!fs.existsSync(path.join(process.cwd(), flags.output))) {
      fs.mkdirSync(path.join(process.cwd(), flags.output));
    }
    for (const src of files) {
      if (flags.all) {
        const destFile = path.join(process.cwd(), flags.output, src.substr(0, src.indexOf('.hbs')))
        this.log(`==> Generating ${destFile}`)
        const templateSource: string = fs.readFileSync(path.join(__dirname, 'templates', src)).toString();
        const template = Handlebars.compile(templateSource);
        fs.writeFileSync(destFile, template(scheme));
      }
    }
  }
}

export = Isogen
