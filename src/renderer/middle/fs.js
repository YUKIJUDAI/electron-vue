// node fs 文件系统

var fs = require("fs");
var { bindNodeCallback } = require("rxjs");

// 读取文件
exports.readFile = bindNodeCallback(fs.readFileSync);

// 设置文件
exports.writeFile = bindNodeCallback(fs.writeFile);

// 判断文件，文件夹是否存在
exports.access = bindNodeCallback(fs.access);

// 创建目录
exports.mkdir = bindNodeCallback(fs.mkdir);
