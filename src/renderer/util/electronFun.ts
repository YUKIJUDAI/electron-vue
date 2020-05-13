const { ipcRenderer, shell, remote } = require("electron");
const path = require("path");

import router from "@/router/index";
import config from "@/config/config";
import factory from "@/util/factory";
import { rmdir } from "@/util/fs";

// 打开广告
export const openAd = (ads_id) => {
    ipcRenderer.send("open-ad", ads_id, config.proxyid);
};
// 日志
export const log = (error) => {
    ipcRenderer.send("log", error.toString());
};
// 隐藏生意参谋
export const hideSycm = () => {
    ipcRenderer.send("hide-sycm");
};
// 打开生意参谋
export const openSycm = (account, pwd) => {
    ipcRenderer.send("open-sycm", account, pwd);
};

// 操作窗口
export const wd = (type: "min" | "max" | "close") => {
    ipcRenderer.send(type);
};
// 下载
export const download = (url) => {
    ipcRenderer.send("download", url);
};
// 检查更新
export const checkForUpdate = () => {
    ipcRenderer.send("checkForUpdate");
};
// 下载更新
export const upDateExe = () => {
    ipcRenderer.send("isUpdateNow");
};

export const loadURL = () => {
    ipcRenderer.on("loadURL", (event, url) => {
        ipcRenderer.send("loadURL", url);
    });
};

// 获取xhr信息后处理
export const sendXhrData = () => {
    ipcRenderer.on("send-xhr-data", (event, type, params, data) => {
        if (factory.obj[type]) {
            typeof factory.obj[type].callback === "function" && factory.obj[type].callback(params, data);
        }
    });
};
// 输出信息
export const message = () => {
    ipcRenderer.on("message", (event, text) => {
        console.log(text);
    });
};
// 页面跳转
export const routerTo = () => {
    ipcRenderer.on("router-to", (event, routes) => {
        router.push(routes);
    });
};
// 获取日志
export const getLog = (vue) => {
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
// 获取下载进度
export const downloadSchedule = (vue) => {
    ipcRenderer.on("download-schedule", (event, index, sum) => {
        var s = ~~((index / sum) * 100);
        vue.percentage = s;
    });
};
export const downloadSuccess = (vue) => {
    ipcRenderer.on("download-success", (event, flag) => {
        vue.progressDialog = false;
        vue.percentage = 0;
        rmdir(vue.goodsId);
        flag ? vue.$message.success("下载成功") : vue.$message.error("下载失败或被取消");
    });
};
// 有新下载
export const isUpdateNow = (vue) => {
    ipcRenderer.on("isUpdateNow", () => {
        vue.getAppVersion && typeof vue.getAppVersion === "function" && vue.getAppVersion();
    });
};

// 打开url
export const openUrl = (url) => {
    shell.openExternal(url);
};
// 获取全局变量
export const getGlobal = (params) => {
    return remote.getGlobal(params);
};

// userData目录
export const getUserDataPath = (_path = "") => {
    return path.join(remote.app.getPath("userData"), _path);
};

// 获取所有窗口
export const getAllWindows = () => {
    return remote.BrowserWindow.getAllWindows();
};
// 通过id获取窗口
export const fromId = (id, type, params = []) => {
    return remote.BrowserWindow.fromId(id).webContents.send(type, ...params);
};
