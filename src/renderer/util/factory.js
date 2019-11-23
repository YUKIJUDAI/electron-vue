const { http } = require("./http");
const { remote } = require('electron');

exports.xhrList = [
    "getPersonalView", // 个人信息
];

exports.fetchList = [
    "list", // 竞品列表
]

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
    callback: function (res) {
        const data = JSON.parse(res);
        // 生意参谋进程id
        const id = remote.getGlobal('sycmWindowId').id;
        remote.getGlobal('tbInfo').user_account = data.loginUserName;   //  淘宝登录账户
        remote.getGlobal('tbInfo').shop_id = data.runAsShopId;          //  店铺id
        remote.getGlobal('tbInfo').shop_name = data.runAsShopTitle;     //  当前店铺名称
        remote.getGlobal('tbInfo').tb_login_user_id = data.loginUserId; //  淘宝登录用户id
        remote.getGlobal('tbInfo').run_as_user_id = data.runAsUserId;   //  当前使用的淘宝用户id
        remote.BrowserWindow.fromId(id).webContents.send("login-success");
    }
});
// 竞品列表
factory.add("list", {
    callback: function (res) {
        console.log(res);
    }
})

exports.factory = factory;
