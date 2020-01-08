// node fs 文件系统

const fs = require("fs");
var { bindNodeCallback } = require("rxjs");

// 读取文件
const readFile = bindNodeCallback(fs.readFileSync);

// 设置文件
const writeFile = bindNodeCallback(fs.writeFile);

// 判断文件，文件夹是否存在
const access = bindNodeCallback(fs.access);

// 创建目录
const mkdir = bindNodeCallback(fs.mkdir);

export { readFile, writeFile, access, mkdir };
