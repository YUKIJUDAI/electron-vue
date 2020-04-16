const { ipcRenderer, shell, remote } = require("electron");
import router from "@/router/index";
import { proxyid } from "@/config/config";
import factory from "@/util/factory";

// 打开广告
const openAd = (ads_id) => {
    ipcRenderer.send("open-ad", ads_id, proxyid);
};
// 日志
const log = (error) => {
    ipcRenderer.send("log", error.toString());
};
// 隐藏生意参谋
const hideSycm = () => {
    ipcRenderer.send("hide-sycm");
};
// 打开生意参谋
const openSycm = (account, pwd) => {
    ipcRenderer.send("open-sycm", account, pwd);
};
// 操作窗口
const wd = (type: "min" | "max" | "close") => {
    ipcRenderer.send(type);
};
// 下载
const download = (url) => {
    ipcRenderer.send("download", url);
};

// 获取xhr信息后处理
const sendXhrData = () => {
    ipcRenderer.on("send-xhr-data", (event, type, params, data) => {
        if (factory.obj[type]) {
            typeof factory.obj[type].callback === "function" && factory.obj[type].callback(params, data);
        }
    });
};
// 输出信息
const message = () => {
    ipcRenderer.on("message", (event, text) => {
        console.log(text);
    });
};
// 页面跳转
const routerTo = () => {
    ipcRenderer.on("router-to", (event, routes) => {
        router.push(routes);
    });
};
// 获取日志
const getLog = (vue) => {
    ipcRenderer.on("get-log", (event, data) => {
        // flag 0 成功  1进行中  2 失败
        if (!vue.logFlag) {
            return;
        }
        switch (data.flag) {
            case 0:
                vue.addingFlag = false;
                vue.logFlag = false;
                vue.logList.push(data.msg);
                vue.$alert("数据获取成功,请点击开始查询重新获取数据", "", {
                    confirmButtonText: "确定",
                    callback: vue.handleClose,
                });
                break;
            case 1:
                vue.logList.push(data.msg);
                break;
            case 2:
                vue.addingFlag = false;
                vue.logFlag = false;
                vue.logList.push(data.msg);
                vue.$alert("数据获取失败", "", {
                    confirmButtonText: "确定",
                    callback: () => {
                        vue.goodsInfo &&
                            (vue.goodsInfo = {
                                goods_name: "",
                                pictUrl: "",
                                shop_name: "",
                                itemId: "",
                            });
                    },
                });
                break;
            default:
                break;
        }
    });
};

// 打开url
const openUrl = (url) => {
    shell.openExternal(url);
};
// 获取全局变量
const getGlobal = (params) => {
    return remote.getGlobal(params);
};
// 获取所有窗口
const getAllWindows = () => {
    return remote.BrowserWindow.getAllWindows();
};
// 通过id获取窗口
const fromId = (id, type, params = []) => {
    return remote.BrowserWindow.fromId(id).webContents.send(type, ...params);
};

export { openAd, log, hideSycm, openSycm, wd, download, sendXhrData, message, routerTo, getLog, openUrl, getGlobal, getAllWindows, fromId };