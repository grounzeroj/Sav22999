import path from "path";
import {fileURLToPath} from "url";
import {isLinuxOS} from '../bin/utils/commonUtils.js'

const __dirname = fileURLToPath(import.meta.url)

console.log('__dirname  => ', __dirname) // __dirname C:\_developSoftKu\ideaIU-2019.1.3.win\#CodeKu\koa-cli\test\test.js
console.log('process.cwd()  => ', process.cwd()) // process.cwd() C:\_developSoftKu\ideaIU-2019.1.3.win\#CodeKu\koa-cli\test
console.log('getRootPath  => ', path.resolve(process.cwd(), 'lc')) // getRootPath C:\_developSoftKu\ideaIU-2019.1.3.win\#CodeKu\koa-cli\test\lc
console.log('getRootPath  => ', getRootPath()) // getRootPath C:\_developSoftKu\ideaIU-2019.1.3.win\#CodeKu\koa-cli\test\lc
console.log('createPath  => ', createPath('lc2.json')) // createPath C:\_developSoftKu\ideaIU-2019.1.3.win\#CodeKu\koa-cli\test\lc\lc2.json

// -------------------------

console.log(process.platform); // win32 是 WinOS || darwin 就是 macOS || linux 就是 linuxOS

console.log('isLinuxOS()', isLinuxOS())

// -------------------------

function getRootPath() {
    return path.resolve(process.cwd(), 'lc');
}

function createPath(fileName) {
    return path.resolve(getRootPath(), fileName);
}
