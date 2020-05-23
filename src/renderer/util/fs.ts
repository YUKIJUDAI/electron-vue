const fs = require("fs");
const request = require("request");
const Bagpipe = require("bagpipe");
const compressing = require("compressing");
const xlsx = require("node-xlsx");

import { bindNodeCallback, interval, forkJoin } from "rxjs";
import { find } from "rxjs/operators";

import { download, getUserDataPath } from "@/util/electronFun";

var writeFile = bindNodeCallback(fs.writeFile);

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
    const filePath = _path(filename);
    const _filePath = filePath + "/" + type;
    // 创建文件夹
    try {
        fs.accessSync(filePath, fs.constants.R_OK | fs.constants.W_OK);
    } catch (err) {
        fs.mkdirSync(filePath);
    }
    try {
        fs.accessSync(_filePath, fs.constants.R_OK | fs.constants.W_OK);
    } catch (err) {
        fs.mkdirSync(_filePath);
    }
    switch (type) {
        case "评论":
            downloadComment().subscribe(() => {
                download(_filePath + "/" + filename + ".xls");
            });
            break;
        case "图片":
            downloadPic().subscribe(() => {
                compressing.zip.compressDir(_filePath, filePath + "/" + filename + ".zip").then(() => {
                    download(filePath + "/" + filename + ".zip");
                });
            });
            break;
        case "评论和图片":
            downloadCommentPic().subscribe(() => {
                compressing.zip.compressDir(_filePath, filePath + "/" + filename + ".zip").then(() => {
                    download(filePath + "/" + filename + ".zip");
                });
            });
            break;
        case "问大家":
            downloadAskAll().subscribe(() => {
                download(_filePath + "/" + filename + ".xls");
            });
            break;
        case "二维码":
            downloadEwm().subscribe(() => {
                compressing.zip.compressDir(_filePath, filePath + "/" + filename + ".zip").then(() => {
                    download(filePath + "/" + filename + ".zip");
                });
            });
            break;
        case "竞品监控列表":
            downloadJpjkList().subscribe(() => {
                download(_filePath + "/" + filename + ".xls");
            });
            break;
        case "数据源":
            downloadJpfxDataSource().subscribe(() => {
                download(_filePath + "/" + filename + ".xls");
            });
            break;
        case "关键词分析":
            downloadJpfxKeywordAnalysis().subscribe(() => {
                download(_filePath + "/" + filename + ".xls");
            });
            break;
        case "词根分析":
            downloadJpfxRootAnalysis().subscribe(() => {
                download(_filePath + "/" + filename + ".xls");
            });
            break;
        case "流量结构分析":
            downloadJpfxTrafficStrucRtureAnalysis().subscribe(() => {
                download(_filePath + "/" + filename + ".xls");
            });
            break;
        case "黑搜报表":
            downloadJpfxReport().subscribe(() => {
                download(_filePath + "/" + filename + ".xls");
            });
            break;
        case "宝贝信息":
            downloadJpfxGoodsInfo().subscribe(() => {
                download(_filePath + "/" + filename + ".xls");
            });
            break;
        default:
            break;
    }
    // 下载excel
    function downloadComment() {
        var arr = [["SKU", "旺旺名", "初次评语", "初次评语时间", "服务评语", "初次商家回复", "追加评语", "追加评语时间", "追加商家回复"]];
        list.map((item) => {
            arr.push([item.sku, item.wangwang, item.firstrate, item.firstratetime, item.servicerate, item.sellerreply, item.appendrate, item.appendratetime, item.appendsellerreply]);
        });
        var options = { "!cols": [{ wch: 30 }, { wch: 10 }, { wch: 50 }, { wch: 10 }, { wch: 20 }, { wch: 20 }, { wch: 40 }, { wch: 10 }, { wch: 20 }] };
        return writeFile(_filePath + "/" + filename + ".xls", xlsx.build([{ name: "sheetName", data: arr }], options), "binary");
    }
    // 下载图片
    function downloadPic() {
        var bagpipe = new Bagpipe(10);
        var flag = false;
        for (let i = 0; i < list.length; i++) {
            var name = list[i].split("/")[list[i].split("/").length - 1];
            bagpipe.push(_downloadPic, list[i], name, _filePath, function() {
                i === list.length - 1 && (flag = true);
            });
        }
        return interval(1000).pipe(find(() => flag));
    }
    // 下载评论加图片
    function downloadCommentPic() {
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
                fs.accessSync(_filePath + "/" + txt[i].index, fs.constants.R_OK | fs.constants.W_OK);
            } catch (err) {
                fs.mkdirSync(_filePath + "/" + txt[i].index);
            }
            txtBagpipe.push(fs.writeFile, _filePath + "/" + txt[i].index + (txt[i].name === 1 ? "/初次评语.txt" : "/追加评语.txt"), txt[i].value, function() {
                i === list.length - 1 && (txtFlag = true);
            });
        }
        // 循环图片数据 输出
        for (let i = 0; i < pic.length; i++) {
            try {
                fs.accessSync(_filePath + "/" + pic[i].index, fs.constants.R_OK | fs.constants.W_OK);
            } catch (err) {
                fs.mkdirSync(_filePath + "/" + pic[i].index);
            }
            var name = pic[i].url.split("/")[pic[i].url.split("/").length - 1];
            picagpipe.push(_downloadPic, pic[i].url, name, _filePath + "/" + pic[i].index, function() {
                i === list.length - 1 && (picFlag = true);
            });
        }
        return forkJoin(interval(1000).pipe(find(() => txtFlag)), interval(1000).pipe(find(() => picFlag)));
    }
    // 下载问大家
    function downloadAskAll() {
        var arr = [["时间", "买手旺旺", "买手问题", "回答"]];
        list.map((item) => {
            var answer = "";
            item.answer.map((val) => {
                answer += "旺旺：" + val.usernick + "，回答：" + val.title + ";";
            });
            arr.push([item.createtime, item.question.usernick, item.question.title, answer]);
        });
        var options = { "!cols": [{ wch: 30 }, { wch: 10 }, { wch: 100 }, { wch: 500 }] };
        return writeFile(_filePath + "/" + filename + ".xls", xlsx.build([{ name: "sheetName", data: arr }], options), "binary");
    }
    // 下载二维码
    function downloadEwm() {
        var flag = false;
        list.length > 0 &&
            list.map((item, i) => {
                var base64 = item.url.replace(/^data:image\/\w+;base64,/, "");
                var dataBuffer = new Buffer(base64, "base64");
                fs.writeFileSync(_filePath + "/" + item.name + ".png", dataBuffer);
                i === list.length - 1 && (flag = true);
            });
        return interval(1000).pipe(find(() => flag));
    }
    // 下载竞品监控列表
    function downloadJpjkList() {
        var arr = [["宝贝ID", "日期", "访客数", "买家数", "支付金额", "客单价", "转化率/%", "UV价值"]];
        list.map((item) => {
            arr.push([item.itemId, item.analysis_time_str, item.uvIndexNum, item.payByrCntIndexNum, item.tradeNum, item.per_price, item.payRateRatio, item.uvPrice]);
        });
        var options = { "!cols": [{ wch: 20 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }] };
        return writeFile(_filePath + "/" + filename + ".xls", xlsx.build([{ name: "竞品监控", data: arr }], options), "binary");
    }
    // 下载竞品分析数据源
    function downloadJpfxDataSource() {
        var arr0 = [["开始日期", "关键词", "访客数", "成交件数", "成交金额", "转化率/%", "UV价值"]];
        list[0].map((item) => {
            arr0.push([item.data_date, item.compete_keywords, item.uv, item.payByrCntIndexNum, item.tradeNum, item.payRateRatio, item.uvPrice]);
        });
        var arr1 = [["开始日期", "关键词", "访客数", "成交件数", "成交金额", "转化率/%"]];
        list[1].map((item) => {
            arr1.push([item.data_date, item.compete_keywords, item.uv, item.payByrCntIndexNum, item.tradeNum, item.payRateRatio]);
        });
        var arr2 = [["开始日期", "渠道", "访客数", "成交人数", "转化率/%", "交易额", "客单价", "UV价值"]];
        list[2].map((item) => {
            arr2.push([item.data_date, item.source_name, item.uv, item.payByrCntIndexNum, item.payRateRatio, item.tradeNum, item.unitPrice, item.uvPrice]);
        });
        var arr3 = [["开始日期", "访客数", "支付买家数", "支付件数", "收藏数", "加购数", "转化率/%", "交易额"]];
        list[3].map((item) => {
            arr3.push([item.analysis_time, item.uvIndexNum, item.payByrCntIndexNum, item.payByrCntIndexNum, item.cltHitsNum, item.cartHitsNum, item.payRateRatio, item.tradeNum]);
        });
        var options = { "!cols": [{ wch: 20 }, { wch: 20 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }] };
        return writeFile(
            _filePath + "/" + filename + ".xls",
            xlsx.build(
                [
                    { name: "引流关键词", data: arr0 },
                    { name: "成交关键词", data: arr1 },
                    { name: "流量结构", data: arr2 },
                    { name: "关键指标", data: arr3 },
                ],
                options
            ),
            "binary"
        );
    }
    // 下载竞品分析关键词分析
    function downloadJpfxKeywordAnalysis() {
        var arr0 = [["流量关键词", "访客数", "出现天数"]];
        list[0].map((item) => {
            arr0.push([item._id, item.uv, item.count]);
        });
        var arr1 = [["成交关键词", "成交数", "出现天数"]];
        list[1].map((item) => {
            arr1.push([item._id, item.trade_num, item.count]);
        });
        var arr2 = [["流量成交关键词", "访客数", "成交数", "成交金额", "转化率/%", "出现天数"]];
        list[2].map((item) => {
            arr2.push([item._id, item.uv, item.trade_num, item.trade_money, item.payRateRadio, item.count]);
        });
        var options = { "!cols": [{ wch: 20 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }] };
        return writeFile(
            _filePath + "/" + filename + ".xls",
            xlsx.build(
                [
                    { name: "流量关键词", data: arr0 },
                    { name: "成交关键词", data: arr1 },
                    { name: "流量成交关键词", data: arr2 },
                ],
                options
            ),
            "binary"
        );
    }
    // 下载竞品分析词根分析
    function downloadJpfxRootAnalysis() {
        var arr = [["词根", "访客数", "成交件数", "成交金额", "转化率/%"]];
        list.map((item) => {
            arr.push([item.compete_keywords, item.uv, item.payByrCntIndexNum, item.tradeNum, item.payRateRatio]);
        });
        var options = { "!cols": [{ wch: 20 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }] };
        return writeFile(_filePath + "/" + filename + ".xls", xlsx.build([{ name: "词根分析", data: arr }], options), "binary");
    }
    // 下载竞品分析流量结构分析
    function downloadJpfxTrafficStrucRtureAnalysis() {
        var arr = [["渠道", "访客数", "成交人数", "转化率/%", "交易额"]];
        list.map((item) => {
            arr.push([item._id, item.uv, item.payByCntNum, item.payRateRadio, item.trade_money]);
        });
        var options = { "!cols": [{ wch: 20 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }] };
        return writeFile(_filePath + "/" + filename + ".xls", xlsx.build([{ name: "词根分析", data: arr }], options), "binary");
    }
    // 下载竞品分析黑搜报表
    function downloadJpfxReport() {
        var arr = [["日期", "访客数", "支付件数", "交易额", "收藏数", "加购数", "收藏率/%", "加购率/%", "转化率/%", "手淘搜索访客数", "手淘搜索成交量", "手淘搜索转化率/%", "手淘搜索成交额", "直通车访客数", "直通车成交量", "直通车转化率/%", "直通车成交额", "手淘首页访客数", "手淘首页成交量", "手淘首页转化率/%", "手淘首页成交额", "淘宝客访客数", "淘宝客成交量", "淘宝客转化率/%", "淘宝客成交额", "超级推荐访客数", "超级推荐成交量", "超级推荐转化率/%", "超级推荐成交额", "客单价", "UV值"]];
        list.map((item) => {
            arr.push([item.analysis_time, item.uvIndexNum, item.payByrCntIndexNum, item.tradeNum, item.cltHitsNum, item.cartHitsNum, item.cltRatio, item.cartRatio, item.payRateRatio, item.shoutao.uv, item.shoutao.payByCntNum, item.shoutao.payRateRatio, item.shoutao.tradeNum, item.ztc.uv, item.ztc.payByCntNum, item.ztc.payRateRatio, item.ztc.tradeNum, item.stsy.uv, item.stsy.payByCntNum, item.stsy.payRateRatio, item.stsy.tradeNum, item.tbk.uv, item.tbk.payByCntNum, item.tbk.payRateRatio, item.tbk.tradeNum, item.cjtj.uv, item.cjtj.payByCntNum, item.cjtj.payRateRatio, item.cjtj.tradeNum, item.per_price, item.uvPrice]);
        });
        var options = { "!cols": [{ wch: 20 }, ...new Array(30).fill({ wch: 15 })] };
        return writeFile(_filePath + "/" + filename + ".xls", xlsx.build([{ name: "黑搜报表", data: arr }], options), "binary");
    }
    // 下载竞品分析宝贝信息
    function downloadJpfxGoodsInfo() {
        var arr0 = [["开始日期", "原价", "现价区间", "库存", "SKU组合", "参与活动", "收藏数", "问题数", "评论数", "图评", "好评", "追评", "中评", "差评"]];
        list[0].map((item) => {
            arr0.push([item.data_date, item.oldPrice, item.newPrice + "-" + item.newPrice2, item.total_stock, item.stock_group_num, item.activity, item.favCount, item.questNum, item.commentCount, item.picCommentNum, item.goodCommentNum, item.addCommentNum, item.midCommentNum, item.badCommentNum]);
        });
        var arr1 = [["开始日期", "sku组合", "价格", "库存"]];
        list[1].map((item) => {
            arr1.push([item.data_date, item.stock_name, item.price, item.stock]);
        });
        var options = { "!cols": [{ wch: 20 }, ...new Array(13).fill({ wch: 15 })] };
        return writeFile(
            _filePath + "/" + filename + ".xls",
            xlsx.build(
                [
                    { name: "宝贝信息变化日记录", data: arr0 },
                    { name: "SKU信息变化日记录", data: arr1 },
                ],
                options
            ),
            "binary"
        );
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
