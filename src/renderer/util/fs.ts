const fs = require("fs");
var request = require("request");
var Bagpipe = require("bagpipe");
const compressing = require("compressing");

import { log, getGlobal } from "@/util/electronFun";
import { download, downloadSchedule, downloadSuccess } from "@/util/electronFun";

function _path(filename) {
    return getGlobal("__static") + "/save/" + filename;
}

// 下载图片
const downloadImg = function(filename, list) {
    const filePath = _path(filename);
    try {
        fs.accessSync(filePath, fs.constants.R_OK | fs.constants.W_OK);
    } catch (err) {
        fs.mkdirSync(filePath);
    }

    var bagpipe = new Bagpipe(2);
    function downloadPic(file, name, callback) {
        request(file)
            .pipe(fs.createWriteStream(filePath + "/" + name))
            .on("close", function() {
                callback();
            });
    }
    for (let i = 0; i < list.length; i++) {
        var name = list[i].split("/")[list[i].split("/").length - 1];
        bagpipe.push(downloadPic, list[i], name, function() {
            if (i === list.length - 1) {
                compressing.zip.compressDir(filePath, _path(filename + ".zip")).then((res) => {
                    download(_path(filename + ".zip"));
                });
            }
        });
    }
};

export { downloadImg };
