import fs from 'fs';
import path from 'path';

// 检测文件或者文件夹存在 nodeJS
function fsExistsSync(path) {
  try {
    fs.accessSync(path, fs.F_OK);
  } catch (e) {
    return false;
  }
  return true;
}

// 删除文件夹 递归删除
function deleteall(path) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function(file, index) {
      const curPath = path + '/' + file;
      if (fs.statSync(curPath).isDirectory()) { // recurse
        deleteall(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

// 获取路径
// function getRootPath() {
//     console.log('getRootPath => ', './' + packageName)
//     return './' + packageName;
// }

function getRootPath2(packageName) {
  return path.resolve(process.cwd(), 'dist', packageName);
}

function createPath(packageName, fileName) {
  return path.resolve(getRootPath2(packageName), fileName);
}

// 判断是否为win操作系统
// 是的话 process.platform 会输出 win32
// windows 系统内核
function isWinOS() {
  return process.platform === 'win32';
}

// 判断是否为mac操作系统
// 是的话 process.platform 会输出 darwin
// mac核心 是 unix 系统内核
function isMacOS() {
  return process.platform === 'darwin';
}

// 判断是否为Linux操作系统
// 是的话 process.platform 会输出 linux
// unix 系统内核
function isLinuxOS() {
  return process.platform === 'linux';
}

export {
  fsExistsSync,
  deleteall,
  getRootPath2,
  createPath,
  isWinOS,
  isMacOS,
  isLinuxOS
};
