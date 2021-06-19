#!/usr/bin/env node
// fs
import fs from "fs";
import path from "path";
import execa from "execa";
import chalk from 'chalk'
import createIndexTemplate from "./createIndexTemplate.js";
import createPackageTemplate from "./createPackageTemplate.js";
import question from "./question/index.js";
import {createConfig} from "./config.js";
import {fsExistsSync, deleteall, getRootPath2, createPath, isWinOS, isMacOS, isLinuxOS} from './utils/commonUtils.js'

const log = console.log;

// 开始实际逻辑代码
const answer = await question();
// 将用户所有的交互答案放入一个config里
const config = createConfig(answer);
console.log('...config...  => ', config)
// 从config里拿出用户自己配置的项目名
const packageName = config.packageName;

console.log('...getRootPath2(packageName) => ', getRootPath2(packageName))
console.log('...createPath(packageName, fileName) => ', createPath(packageName, 'index.js'))
console.log('...isWinOS()...', isWinOS())
console.log('...isMacOS()...', isMacOS())
console.log('...isLinuxOS()...', isLinuxOS())

// 前期处理
// 生成dist文件夹 用于存放生成的项目
const codeFolder = path.resolve(process.cwd(), 'dist')
console.log('...codeFolder => ', codeFolder)

log('--------------------------------------------------------------------------------------')
log(chalk.blue(`...正式安装之前的准备工作 开始 ...`));
const exitFlag = fsExistsSync(codeFolder);
if (exitFlag) {
    console.log('...dist目录已存在,进行删除操作...');
    // 删除 进行同步操作
    await deleteall(codeFolder)
    // 删除之后 则再新建一个dist文件夹
    console.log('...新建一个空dist文件夹...');
    fs.mkdirSync(codeFolder);
} else {
    // 不存在 则新建一个dist文件夹
    console.log('...dist目录不存在,新建一个dist文件夹...');
    fs.mkdirSync(codeFolder);
}
log(chalk.blue(`...正式安装之前的准备工作 结束 ...`));
log('--------------------------------------------------------------------------------------')

// 1. 开始安装
log(chalk.blue(`No.1. 正式安装开始 ... QAQ ...`));

// 2. 创建文件夹 -> 自定义项目名称 packageName
log(chalk.blue(`No.2. 创建文件夹 -> ${config.packageName}`));
fs.mkdirSync(getRootPath2(packageName));

// 3. 创建入口文件 -》 index.js
log(chalk.blue(`No.3. 创建入口文件 -> index.js`));
// fs.writeFileSync(`${getRootPath()}/index.js`, createIndexTemplate(config));
fs.writeFileSync(createPath(packageName, 'index.js'), createIndexTemplate(config));

// 4. 创建package.json
log(chalk.blue(`No.4. 创建项目的根目录json -> package.json`));
// fs.writeFileSync(`${getRootPath()}/package.json`, createPackageTemplate(config));
fs.writeFileSync(createPath(packageName, 'package.json'), createPackageTemplate(config));

// 5. 安装依赖
// 下面代码 使用yarn安装依赖 win 下执行有问题
// 判断 如果是win系统的话 改成 npm i 来安装依赖 就没有问题了
if (isWinOS()) { // 是win系统
    log(chalk.blue(`No.5. 安装依赖 -> npm i`));
    await execa("npm i", { // npm install
        cwd: getRootPath2(packageName),
        stdio: [2, 2, 2],
    });
} else { // 是其他系统
    log(chalk.blue(`No.5. 安装依赖 -> yarn`));
    await execa("yarn", { // yarn install
        cwd: getRootPath2(packageName),
        stdio: [2, 2, 2],
    });
}

// 6. 安装结束
log(chalk.blue(`No.6. 正式安装结束 ... QAQ ...`));
log('--------------------------------------------------------------------------------------')
log(chalk.blue(`No.7. enjoy it ...`));
log(chalk.hex("#16c936").bold(`cd ./dist/${config.packageName} && nodemon index.js`));
log(chalk.hex("#DEADED").bold("happy every day -_-# !~LC"));
log('--------------------------------------------------------------------------------------')
