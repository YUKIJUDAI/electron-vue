var { readFile, writeFile, access, mkdir } = require("@/middle/fs");
var path = require("path");

function _path(filename) {
    return path.join(__dirname, "../../save/" + filename);
}

// 读取文件
exports.readSaveData = function (filename) {
    return readFile(_path(filename));
}

// 写入文件
exports.writeSaveData = function (filename, data) {
    return writeFile(_path(filename), JSON.stringify(data));
}

// 创建文件
exports.mkdirSaveData = function (filename) {
    access(_path(filename)).subscribe(
        () => {
            // todo存在 日志
        },
        (err) => {
            writeFile(_path(filename), JSON.stringify({})).subscribe(() => { }, () => { });
        }
    )
}