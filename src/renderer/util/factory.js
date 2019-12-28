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
        remote.getGlobal('tbInfo').loginUserName = data.loginUserName;   //  淘宝登录账户
        remote.getGlobal('tbInfo').runAsShopId = data.runAsShopId;          //  店铺id
        remote.getGlobal('tbInfo').runAsShopTitle = data.runAsShopTitle;     //  当前店铺名称
        remote.getGlobal('tbInfo').loginUserId = data.loginUserId; //  淘宝登录用户id
        remote.getGlobal('tbInfo').runAsUserId = data.runAsUserId;   //  当前使用的淘宝用户id
        http.post("/user/relateTbAccount", { tb_account: data.loginUserName, tb_user_id: data.loginUserId }).then(res => {
            0 === res.code && from(remote.BrowserWindow.getAllWindows()).subscribe(i => {
                remote.BrowserWindow.fromId(i.id).webContents.send("login-success");
            });
        });
    }
});

// 我的店铺趋势
factory.add("trend", {
    callback: function (params, res) {
        // 返回数据
        const data = {
            sys: JSON.stringify({ ...params }),
            crawler_data: JSON.stringify(res.data)
        }
        http.post("/crawler/saveShopTrend", data).then();
    }
});

// 我的店铺数据
factory.add("overview", {
    callback: function (params, res) {
        if (!res.data) return;
        // 返回数据
        const data = {
            sys: JSON.stringify({ ...params }),
            crawler_data: JSON.stringify(res.data)
        }
        http.post("/crawler/saveShopOverview", data).then();
    }
});

// 店铺类目信息
factory.add("getShopCate", {
    callback: function (params, res) {
        const tbInfo = remote.getGlobal("tbInfo");
        // 返回数据
        let result = JSON.parse(aes(res));
        remote.getGlobal('tbInfo').cateId = result.cateId;     // 店铺分类id
        remote.getGlobal('tbInfo').cateName = result.cateName; // 店铺分类名字
        const data = {
            sys: JSON.stringify({ ...params }),
            source: 'getShopCate',
            crawler_data: JSON.stringify(result)
        }
        // http.post("/crawler/saveLog", data).then(r => {

        // });
    }
})

// 竞品列表
factory.add("list", {
    callback: function (params, res) {
        if (params.pageSize && params.pageSize === 100) {
            // 返回数据
            const data = {
                sys: JSON.stringify({ ...params }),
                crawler_data: aes(res)
            }
            http.post("/crawler/saveList", data).then(r => {
                //0 === r.code && remote.BrowserWindow.fromId(id).webContents.send("list-success");
            });
        }
    }
});

// 竞争商品信息
factory.add("getSingleMonitoredInfo", {
    callback: function (params, res) {
        // 返回数据
        const data = {
            sys: JSON.stringify({ ...params }),
            crawler_data: aes(res)
        }
        http.post("/crawler/addCompeteInfo", data).then();
    }
});

// 关键指标对比
factory.add("getCoreIndexes", {
    callback: function (params, res) {
        // 返回数据
        const data = {
            sys: JSON.stringify({ ...params }),
            crawler_data: aes(res)
        }
        http.post("/crawler/saveLog", data).then();
    }
});

// 曲线图数据
factory.add("getCoreTrend", {
    callback: function (params, res) {
        // 返回数据
        const data = {
            sys: JSON.stringify({ ...params }),
            crawler_data: aes(res)
        }
        http.post("/crawler/saveLog", data).then();
    }
});

// 入店关键词
factory.add("getKeywords", {
    callback: function (params, res) {
        // 返回数据
        const data = {
            sys: JSON.stringify({ ...params }),
            crawler_data: aes(res)
        }
        http.post("/crawler/saveLog", data).then();
    }
});

// 入店来源
factory.add("getFlowSource", {
    callback: function (params, res) {
        // 返回数据
        const data = {
            sys: JSON.stringify({ ...params }),
            crawler_data: aes(res)
        }
        http.post("/crawler/saveLog", data).then();
    }
});

export default factory;