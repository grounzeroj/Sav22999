import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import { fileURLToPath } from 'url';

export default (config) => {
  const __dirname = fileURLToPath(import.meta.url);
  console.log('...createIndexTemplate.js...__dirname...  => ', __dirname);
  console.log('...createIndexTemplate.js...__dirname...2...  => ', path.resolve(__dirname, '../template/index.ejs'));
  const indexTemplate = fs.readFileSync(path.resolve(__dirname, '../template/index.ejs'));

  const code = ejs.render(indexTemplate.toString(), {
    config: config
  });

  return prettier.format(code, { parser: 'babel' });
};
