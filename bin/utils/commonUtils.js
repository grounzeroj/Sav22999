import fs from "fs";
import path from "path";

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
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function (file, index) {
            var curPath = path + "/" + file;
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

export {
    fsExistsSync,
    deleteall,
    getRootPath2,
    createPath
}
