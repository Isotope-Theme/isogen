const Handlebars = require('handlebars');
import * as fs from 'fs'
import * as path from 'path'
import Color from 'color'

Handlebars.registerHelper('isDefined', (str) => str !== undefined && str !== '');
Handlebars.registerHelper('hex', (str) => Color(str).hex());
Handlebars.registerHelper('Hex', (str) => Color(str).hex().substring(1));
Handlebars.registerHelper('hsl', (str) => Color(str).hsl().string());
Handlebars.registerHelper('rgb', (str) => Color(str).rgb().string());

export function generateFile(sourcePath: string, outputPath: string, args: any): boolean {
  try {
    if (!fs.existsSync(path.dirname(outputPath))) {
      fs.mkdirSync(path.dirname(outputPath), {recursive: true});
    }
    const templateSource: string = fs.readFileSync(sourcePath).toString();
    const template = Handlebars.compile(templateSource);
    fs.writeFileSync(outputPath, template(args));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
export function generateDirectory(sourcePath: string, outputPath: string, args: any): boolean {
  const dirPaths = fs.readdirSync(sourcePath);
  for (const dirPath of dirPaths) {
    if (fs.lstatSync(path.join(sourcePath, dirPath)).isDirectory()) {
      if (!generateDirectory(path.join(sourcePath, dirPath), path.join(outputPath, dirPath), args)) return false;
    } else {
      if (!generateFile(path.join(sourcePath, dirPath), path.join(outputPath, dirPath.replace('.hbs', '')), args)) return false;
    }
  }
  return true;
}
