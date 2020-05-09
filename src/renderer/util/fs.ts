const fs = require("fs");
const request = require("request");
const Bagpipe = require("bagpipe");
const compressing = require("compressing");
const xlsx = require("node-xlsx");

import { bindNodeCallback, interval, forkJoin } from "rxjs";
import { find } from "rxjs/operators";

import { download, getUserDataPath } from "@/util/electronFun";

function _path(filename?) {
    return filename ? getUserDataPath("/" + filename) : getUserDataPath();
}

function _downloadPic(file, name, filpath, callback) {
    request(file)
        .pipe(fs.createWriteStream(filpath + "/" + name))
        .on("close", function() {
            callback();
        });
}

function del(filepath) {
    var arr = fs.readdirSync(filepath);
    for (var i in arr) {
        var stats = fs.statSync(filepath + "/" + arr[i]);
        stats.isFile() ? fs.unlinkSync(filepath + "/" + arr[i]) : del(filepath + "/" + arr[i]);
    }
    fs.rmdirSync(filepath);
}

// 下载文件
const downloadFile = function(type, filename, list) {
    console.log(_path());
    const filePath = _path(filename);
    const filePathPic = _path(filename) + "/图片";
    const fileComment = _path(filename) + "/评论";
    const fileCommentPic = _path(filename) + "/评论和图片";
    const fileAskAll = _path(filename) + "/问大家";
    try {
        fs.accessSync(filePath, fs.constants.R_OK | fs.constants.W_OK);
    } catch (err) {
        fs.mkdirSync(filePath);
    }
    switch (type) {
        // 评论
        case "1":
            downloadComment().subscribe(() => {
                download(fileComment + "/" + filename + ".xls");
            });
            break;
        // 图片
        case "2":
            downloadPic().subscribe(() => {
                compressing.zip.compressDir(filePathPic, filePath + "/" + filename + ".zip").then((res) => {
                    download(filePath + "/" + filename + ".zip");
                });
            });
            break;
        // 图片加评论
        case "3":
            downloadCommentPic().subscribe(() => {
                compressing.zip.compressDir(fileCommentPic, filePath + "/" + filename + ".zip").then((res) => {
                    download(filePath + "/" + filename + ".zip");
                });
            });
            break;
        // 问大家
        case "4":
            downloadAskAll().subscribe(() => {
                download(fileAskAll + "/" + filename + ".xls");
            });
        default:
            break;
    }
    // 下载excel
    function downloadComment() {
        try {
            fs.accessSync(fileComment, fs.constants.R_OK | fs.constants.W_OK);
        } catch (err) {
            fs.mkdirSync(fileComment);
        }
        var arr = [["SKU", "旺旺名", "初次评语", "初次评语时间", "服务评语", "初次商家回复", "追加评语", "追加评语时间", "追加商家回复"]];
        list.map((item) => {
            arr.push([item.sku, item.wangwang, item.firstrate, item.firstratetime, item.servicerate, item.sellerreply, item.appendrate, item.appendratetime, item.appendsellerreply]);
        });
        var options = { "!cols": [{ wch: 30 }, { wch: 10 }, { wch: 50 }, { wch: 10 }, { wch: 20 }, { wch: 20 }, { wch: 40 }, { wch: 10 }, { wch: 20 }] };
        var writeFile = bindNodeCallback(fs.writeFile);
        return writeFile(fileComment + "/" + filename + ".xls", xlsx.build([{ name: "sheetName", data: arr }], options), "binary");
    }
    // 下载图片
    function downloadPic() {
        try {
            fs.accessSync(filePathPic, fs.constants.R_OK | fs.constants.W_OK);
        } catch (err) {
            fs.mkdirSync(filePathPic);
        }
        var bagpipe = new Bagpipe(10);
        var flag = false;
        for (let i = 0; i < list.length; i++) {
            var name = list[i].split("/")[list[i].split("/").length - 1];
            bagpipe.push(_downloadPic, list[i], name, filePathPic, function() {
                i === list.length - 1 && (flag = true);
            });
        }
        return interval(1000).pipe(find(() => flag));
    }
    // 下载评论加图片
    function downloadCommentPic() {
        try {
            fs.accessSync(fileCommentPic, fs.constants.R_OK | fs.constants.W_OK);
        } catch (err) {
            fs.mkdirSync(fileCommentPic);
        }
        var txt = [],
            pic = [],
            txtFlag = false,
            picFlag = false;

        var txtBagpipe = new Bagpipe(5);
        var picagpipe = new Bagpipe(5);
        list.map((item, i) => {
            if (item.firstrate) txt.push({ index: i, name: 1, value: item.firstrate });
            if (item.appendrate) txt.push({ index: i, name: 2, value: item.appendrate });
            if (item.image.length > 0) pic.push(...item.image);
        });
        // 循环文本数据 输出
        for (let i = 0; i < txt.length; i++) {
            try {
                fs.accessSync(fileCommentPic + "/" + txt[i].index, fs.constants.R_OK | fs.constants.W_OK);
            } catch (err) {
                fs.mkdirSync(fileCommentPic + "/" + txt[i].index);
            }
            txtBagpipe.push(fs.writeFile, fileCommentPic + "/" + txt[i].index + (txt[i].name === 1 ? "/初次评语.txt" : "/追加评语.txt"), txt[i].value, function() {
                i === list.length - 1 && (txtFlag = true);
            });
        }
        // 循环图片数据 输出
        for (let i = 0; i < pic.length; i++) {
            try {
                fs.accessSync(fileCommentPic + "/" + pic[i].index, fs.constants.R_OK | fs.constants.W_OK);
            } catch (err) {
                fs.mkdirSync(fileCommentPic + "/" + pic[i].index);
            }
            var name = pic[i].url.split("/")[pic[i].url.split("/").length - 1];
            picagpipe.push(_downloadPic, pic[i].url, name, fileCommentPic + "/" + pic[i].index, function() {
                i === list.length - 1 && (picFlag = true);
            });
        }
        return forkJoin(interval(1000).pipe(find(() => txtFlag)), interval(1000).pipe(find(() => picFlag)));
    }
    // 下载问大家
    function downloadAskAll() {
        try {
            fs.accessSync(fileAskAll, fs.constants.R_OK | fs.constants.W_OK);
        } catch (err) {
            fs.mkdirSync(fileAskAll);
        }
        var arr = [["时间", "买手旺旺", "买手问题", "回答"]];
        list.map((item) => {
            var answer = "";
            item.answer.map((val) => {
                answer += "旺旺：" + val.usernick + "，回答：" + val.title + ";";
            });
            arr.push([item.createtime, item.question.usernick, item.question.title, answer]);
        });
        var options = { "!cols": [{ wch: 30 }, { wch: 10 }, { wch: 100 }, { wch: 500 }] };
        var writeFile = bindNodeCallback(fs.writeFile);
        return writeFile(fileAskAll + "/" + filename + ".xls", xlsx.build([{ name: "sheetName", data: arr }], options), "binary");
    }
};

// 删除文件
const rmdir = function(filename) {
    try {
        fs.accessSync(_path(filename), fs.constants.R_OK | fs.constants.W_OK);
    } catch (err) {}
    del(_path(filename));
};

export { downloadFile, rmdir };
