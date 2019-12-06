const { from } = require("rxjs");
const { remote } = require('electron');

const { aes } = require("./aes");
import http from "./http";

function Factory() {
    this.obj = {};
}
// 添加项目
Factory.prototype.add = function (name, option) {
    if (!this.obj.hasOwnProperty(name)) this.obj[name] = option;
}

var factory = new Factory();

// 个淘宝人信息 
factory.add("getPersonalView", {
    callback: function (params, res) {
        const data = JSON.parse(res);
        remote.getGlobal('tbInfo').user_account = data.loginUserName;   //  淘宝登录账户
        remote.getGlobal('tbInfo').shop_id = data.runAsShopId;          //  店铺id
        remote.getGlobal('tbInfo').shop_name = data.runAsShopTitle;     //  当前店铺名称
        remote.getGlobal('tbInfo').tb_login_user_id = data.loginUserId; //  淘宝登录用户id
        remote.getGlobal('tbInfo').run_as_user_id = data.runAsUserId;   //  当前使用的淘宝用户id
        http.post("/user/relateTbAccount", { tb_account: data.loginUserName, tb_user_id: data.loginUserId }).then(res => {
            0 === res.code && from(remote.BrowserWindow.getAllWindows()).subscribe(i => {
                remote.BrowserWindow.fromId(id).webContents.send("login-success");
            });
        });
    }
});
// 竞品列表
factory.add("list", {
    callback: function (params, res) {
        if (params.pageSize && params.pageSize === 100) {
            // 用户信息
            const tbInfo = remote.getGlobal("tbInfo");
            // 返回数据
            let result = JSON.parse(aes(res));
            result = Object.assign(result, { sys: {} });
            const data = {
                ...tbInfo,
                source: 'list',
                crawler_data: JSON.stringify(result)
            }
            http.post("/crawler/saveLog", data).then(r => {
                //0 === r.code && remote.BrowserWindow.fromId(id).webContents.send("list-success");
            });
        }
    }
});
// 关键指标对比
factory.add("getCoreIndexes", {
    callback: function (params, res) {
        // 用户信息
        const tbInfo = remote.getGlobal("tbInfo");
        // 返回数据
        let result = JSON.parse(aes(res));
        result = Object.assign(result, { sys: {} });
        const data = {
            ...tbInfo,
            source: 'getCoreIndexes',
            crawler_data: JSON.stringify(result)
        }
        http.post("/crawler/saveLog", data).then();
    }
});
// 曲线图数据
factory.add("getCoreTrend", {
    callback: function (params, res) {
        // 用户信息
        const tbInfo = remote.getGlobal("tbInfo");
        // 返回数据
        let result = JSON.parse(aes(res));
        result = Object.assign(result, { sys: {} });
        const data = {
            ...tbInfo,
            source: 'getCoreTrend',
            crawler_data: JSON.stringify(result)
        }
        http.post("/crawler/saveLog", data).then();
    }
});
// 入店关键词
factory.add("getKeywords", {
    callback: function (params, res) {
        // 用户信息
        const tbInfo = remote.getGlobal("tbInfo");
        // 返回数据
        let result = JSON.parse(aes(res));
        result = Object.assign(result, { sys: { ...params } });
        const data = {
            ...tbInfo,
            source: 'getKeywords',
            crawler_data: JSON.stringify(result)
        }
        http.post("/crawler/saveLog", data).then();
    }
});
// 入店来源
factory.add("getFlowSource", {
    callback: function (params, res) {
        // 用户信息
        const tbInfo = remote.getGlobal("tbInfo");
        // 返回数据
        let result = JSON.parse(aes(res));
        result = Object.assign(result, { sys: { ...params } });
        const data = {
            ...tbInfo,
            source: 'getFlowSource',
            crawler_data: JSON.stringify(result)
        }
        http.post("/crawler/saveLog", data).then();
    }
});

export default factory;