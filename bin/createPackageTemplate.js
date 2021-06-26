import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import { fileURLToPath } from 'url';

export default (config) => {
  const __dirname = fileURLToPath(import.meta.url);
  console.log('...createPackageTemplate.js.js...__dirname...  => ', __dirname);
  console.log('...createPackageTemplate.js.js...__dirname...2...  => ', path.resolve(__dirname, '../template/package.ejs'));
  const indexTemplate = fs.readFileSync(path.resolve(__dirname, '../template/package.ejs'));

  const code = ejs.render(indexTemplate.toString(), {
    packageName: config.packageName,
    middleware: config.middleware
  });

  return prettier.format(code, { parser: 'json' });
};
