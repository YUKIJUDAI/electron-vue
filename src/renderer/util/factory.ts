const { from } = require("rxjs");
var CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");

import http from "./http";
import { getGlobal, wd, getAllWindows, fromId } from "./electronFun";

const aes = function(txt) {
    var key = "w28Cz694s63kBYk4";
    var io = "4kYBk36s496zC82w";

    var txt2 = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(txt));

    var res = AES.decrypt(txt2, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(io),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });

    return res.toString(CryptoJS.enc.Utf8);
};

function Factory() {
    this.obj = {};
}
// 添加项目
Factory.prototype.add = function(name, option) {
    if (!this.obj.hasOwnProperty(name)) this.obj[name] = option;
};

var factory = new Factory();

// 个淘宝人信息
factory.add("getPersonalView", {
    callback: function(params, res) {
        const data = JSON.parse(res);
        const tbInfo = getGlobal("tbInfo") as any;
        const _data = { tb_account: data.loginUserName, tb_user_id: data.loginUserId, tb_password: tbInfo.tb_password };

        tbInfo.loginUserName = data.loginUserName; //  淘宝登录账户
        tbInfo.runAsShopId = data.runAsShopId + ""; //  店铺id
        tbInfo.runAsShopTitle = data.runAsShopTitle; //  当前店铺名称
        tbInfo.loginUserId = data.loginUserId + ""; //  淘宝登录用户id
        tbInfo.runAsUserId = data.runAsUserId + ""; //  当前使用的淘宝用户id

        http.post("/user/relateTbAccount", _data).then((res: any) => {
            0 == res.code &&
                from(getAllWindows()).subscribe((i) => {
                    fromId(i.id, "login-success");
                });
        });
    },
});

// 我的店铺趋势
factory.add("trend", {
    callback: function(params, res) {
        if (res instanceof Object) {
            // 返回数据
            const data = {
                sys: JSON.stringify({ ...params }),
                crawler_data: JSON.stringify(res.data),
                rand: getGlobal("tbInfo").rand,
            };
            http.post("/collect/saveShopTrend", data).then();
        } else {
            // 返回数据
            const data = {
                sys: JSON.stringify({ ...params }),
                crawler_data: aes(res),
            };
            http.post("/collect/addCoreTrendForMonitor", data).then();
        }
    },
});

// 我的店铺数据
factory.add("overview", {
    callback: function(params, res) {
        if (!res.data) return;
        // 返回数据
        const data = {
            sys: JSON.stringify({ ...params }),
            crawler_data: JSON.stringify(res.data)
        };
        http.post("/collect/saveShopOverview", data).then();
    },
});

// 店铺类目信息
factory.add("getShopCate", {
    callback: function(params, res) {
        const tbInfo = getGlobal("tbInfo") as any;
        // 返回数据
        let result = JSON.parse(aes(res));
        tbInfo.cateId = result.cateId; // 店铺分类id
        tbInfo.cateName = result.cateName; // 店铺分类名字
        const data = {
            sys: JSON.stringify({ ...params }),
            source: "getShopCate",
            crawler_data: JSON.stringify(result)
        };
        // http.post("/collect/saveLog", data).then(r => {

        // });
    },
});

// 竞品列表
factory.add("list", {
    callback: function(params, res) {
        if (params.pageSize && params.pageSize === 100) {
            // 返回数据
            const data = {
                sys: JSON.stringify({ ...params }),
                crawler_data: aes(res)
            };
            http.post("/collect/saveList", data).then((r) => {
                // todo
                //hideSycm();
                from(getAllWindows()).subscribe((i) => {
                    fromId(i.id, "router-to", ["/heisou-features/monitor"]);
                });
                wd("max");
            });
        }
    },
});

// 竞争商品信息
factory.add("getSingleMonitoredInfo", {
    callback: function(params, res) {
        // 返回数据
        const data = {
            sys: JSON.stringify({ ...params }),
            crawler_data: aes(res),
            rand: getGlobal("tbInfo").rand
        };
        http.post("/collect/addCompeteInfo", data).then();
    },
});

// 关键指标对比
factory.add("getCoreIndexes", {
    callback: function(params, res) {
        // 返回数据
        const data = {
            sys: JSON.stringify({ ...params }),
            crawler_data: aes(res),
            rand: getGlobal("tbInfo").rand,
        };
        // http.post("/collect/saveLog", data).then();
    },
});

// 曲线图数据
factory.add("getCoreTrend", {
    callback: function(params, res) {
        // 返回数据
        const data = {
            sys: JSON.stringify({ ...params }),
            crawler_data: aes(res),
            rand: getGlobal("tbInfo").rand,
        };
        http.post("/collect/addCoreTrend", data).then();
    },
});

// 入店关键词
factory.add("getKeywords", {
    callback: function(params, res) {
        // 返回数据
        const data = {
            sys: JSON.stringify({ ...params }),
            crawler_data: aes(res),
            rand: getGlobal("tbInfo").rand,
        };
        http.post("/collect/addKeywords", data).then();
    },
});

// 入店来源
factory.add("getFlowSource", {
    callback: function(params, res) {
        // 返回数据
        const data = {
            sys: JSON.stringify({ ...params }),
            crawler_data: aes(res),
            rand: getGlobal("tbInfo").rand,
        };
        http.post("/collect/addFlowSource", data).then();
    },
});

// 入店来源趋势
factory.add("getSourceTrend", {
    callback: function(params, res) {
        const data = {
            sys: JSON.stringify({ ...params }),
            crawler_data: JSON.stringify(res),
            rand: getGlobal("tbInfo").rand,
        };
        http.post("/collect/addSourceTrend", data).then();
    },
});

export default factory;
