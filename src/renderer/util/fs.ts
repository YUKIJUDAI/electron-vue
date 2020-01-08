const { readFile, writeFile, access, mkdir } = require("@/middle/fs");
var path = require("path");

function _path(filename) {
    return path.join(__dirname, "../../save/" + filename);
}

// 读取文件
const readSaveData = function (filename) {
    return readFile(_path(filename));
}

// 写入文件
const writeSaveData = function (filename, data) {
    return writeFile(_path(filename), JSON.stringify(data));
}

// 创建文件
const mkdirSaveData = function (filename) {
    access(_path(filename)).subscribe(
        () => {
            // todo存在 日志
        },
        (err) => {
            writeFile(_path(filename), JSON.stringify({})).subscribe(() => { }, () => { });
        }
    )
}

export {readSaveData, writeSaveData,mkdirSaveData}
