const fs = require("fs");
var request = require("request");
var Bagpipe = require("bagpipe");

import { log, getGlobal } from "@/util/electronFun";

function _path(filename) {
    return getGlobal("__static") + "/save/" + filename;
}

// 下载图片
const downloadImg = function(filename, list, limit) {
    try {
        fs.accessSync(_path(filename), fs.constants.R_OK | fs.constants.W_OK);
    } catch (err) {
        fs.mkdirSync(_path(filename));
    }

    var bagpipe = new Bagpipe(limit);
    function downloadPic(file, name) {
        request(file).pipe(fs.createWriteStream(_path(filename) + "/" + name));
    }
    for (var i = 0; i < list.length; i++) {
        var name = list[i].split("/")[list[i].split("/").length - 1];
        bagpipe.push(downloadPic, list[i], name);
    }
};

export { downloadImg };
