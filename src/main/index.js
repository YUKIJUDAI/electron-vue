const { app, BrowserWindow, ipcMain, dialog, Menu, Tray, screen, session } = require("electron");
const path = require("path");
const fs = require("fs");
const request = require("request");
const { autoUpdater } = require("electron-updater");
const log4js = require("log4js");

const url = require("@@/package.json").build.publish[0].url;

let logPath = "", winURL = "";

if (process.env.NODE_ENV !== 'development') {
    global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\');
    logPath = app.getPath("userData") + "/logs/error-log.log";
    winURL = `file://${__dirname}/index.html`
} else {
    logPath = __static + "/logs/error-log.log";
    winURL = "http://localhost:9080";
}

let mainWindow;
let sycmWindow;
let adWindow;
let tray;

// 日志
log4js.configure({
    appenders: {
        error: { type: "dateFile", filename: logPath, pattern: ".yyyy-MM-dd", maxLogSize: 10240, backups: 3 },
    },
    categories: {
        default: { appenders: ["error"], level: "debug" },
    },
});
let logError = log4js.getLogger("default");

if (!app.requestSingleInstanceLock()) {
    app.quit();
} else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        if (mainWindow) {
            mainWindow.isMinimized() && mainWindow.restore();
            mainWindow.focus();
            mainWindow.show();
        }
    });
    app.on("ready", createWindow);
}

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
    if (mainWindow === null) createWindow();
});

// 输出日志
ipcMain.on("log", function (e, err) {
    logError.debug(err);
});

// 最小化
ipcMain.on("min", function () {
    mainWindow.minimize();
});

// 最大化
ipcMain.on("max", function () {
    mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
});

// 关闭
ipcMain.on("close", function (event) {
    mainWindow.hide();
    mainWindow.setSkipTaskbar(true);
    event.preventDefault();
});

ipcMain.on("loadURL", function (event, url) {
    sycmWindow.webContents.loadURL(
        url,
        { userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36" }
    );
    setTimeout(() => {
        sycmWindow.webContents.send("loadURL-success");
    }, 2000);
})

// 下载
ipcMain.on("download", function (e, url) {
    mainWindow.webContents.downloadURL(url);
});

// 打开生意参谋
ipcMain.on("open-sycm", function (e, account, pwd) {
    createSycmWindow(account, pwd);
});

// 隐藏生意参谋
ipcMain.on("hide-sycm", function () {
    sycmWindow && sycmWindow.hide();
});

//显示生意参谋
ipcMain.on("show-sycm", function () {
    sycmWindow && sycmWindow.showInactive();
});

// 打开广告
ipcMain.on("open-ad", function (e, id, proxyid) {
    createAdView(id, proxyid);
});

// 创建窗口
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 850,
        autoHideMenuBar: true,
        minWidth: 1280,
        minHeight: 850,
        frame: false,
        webPreferences: {
            devTools: true,
            webviewTag: true,
            webSecurity: true,
            nodeIntegration: true,
        },
    });
    mainWindow.loadURL(winURL);
    // 加载网页
    mainWindow.on("closed", function () {
        mainWindow = null;
    });
    // 启动更新
    updateHandle();
    // 下载进度
    session.defaultSession.on("will-download", function (event, downloadItem, webContents) {
        downloadItem.setSaveDialogOptions({ title: "文件保存" });
        downloadItem.on("updated", (event, state) => {
            if (state === "progressing") {
                mainWindow.webContents.send("download-schedule", downloadItem.getReceivedBytes(), downloadItem.getTotalBytes());
            }
        });
        downloadItem.once("done", (event, state) => {
            if (state === "completed") {
                mainWindow.webContents.send("download-success", true);
            } else {
                mainWindow.webContents.send("download-success", false);
            }
        });
    });

    tray = new Tray(__static + "/logo.ico");
    tray.setToolTip("火星情报");
    tray.on("click", () => {
        mainWindow.isVisible() ?
            (mainWindow.hide(), mainWindow.setSkipTaskbar(true))
            : (mainWindow.show(), mainWindow.setSkipTaskbar(false));
    })
    const contextMenu = Menu.buildFromTemplate([
        {
            label: "退出",
            type: "normal",
            click() {
                if (process.platform !== "darwin") app.quit();
            },
        }
    ]);
    tray.setContextMenu(contextMenu);
}

//创建广告弹出
function createAdView(id, proxyid) {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    let adWindow = new BrowserWindow({
        width: 250,
        height: 300,
        x: width - 260,
        y: height - 305,
        parent: mainWindow,
        autoHideMenuBar: true,
        resizable: false,
        movable: false,
        minimizable: false,
        maximizable: false,
    });
    adWindow.webContents.loadURL(__static + "/ad.html?proxyid=" + proxyid + "&id=" + id);
    adWindow.webContents.closeDevTools();
}

// 创建生意参谋子窗口
function createSycmWindow(account, pwd) {
    if (sycmWindow) {
        dialog.showErrorBox("错误提示", "只能登录一个生意参谋");
        return;
    }
    sycmWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        autoHideMenuBar: true,
        webPreferences: {
            devTools: true,
            webviewTag: true,
            webSecurity: true,
            preload: __static + "/sycm.js",
        },
    });
    // 加载网页
    sycmWindow.webContents.loadURL(
        "https://login.taobao.com/member/login.jhtml?from=sycm&full_redirect=true&style=minisimple&minititle=&minipara=0,0,0&sub=true&redirect_url=http://sycm.taobao.com/portal/home.htm",
        { userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36" }
    );
    sycmWindow.webContents.once("dom-ready", () => {
        sycmWindow.webContents.send("dom-ready");
        account && pwd && sycmWindow.webContents.send("autoLogin", account, pwd);
    });
    // 存储淘宝信息
    global.tbInfo = {
        loginUserName: "", //  淘宝登录账户
        tb_password: "", // 淘宝密码
        runAsShopId: "", //  店铺id
        runAsShopTitle: "", //  当前店铺名称
        loginUserId: "", //  淘宝登录用户id
        runAsUserId: "", //  当前使用的淘宝用户id
        cateId: "", // 店铺分类id
        cateName: "", // 店铺分类名字
        version: "", //生意参谋版本
        rand: ""
    };
    sycmWindow.on("closed", function () {
        mainWindow.webContents.send("router-to", "/heisou/binding");
        sycmWindow = null;
        global.tbInfo = null;
    });
}

// 版本更新
function updateHandle() {
    autoUpdater.setFeedURL(url);
    autoUpdater.on("error", function (error) {
        sendUpdateMessage(error.toString());
    });
    autoUpdater.on("checking-for-update", function () {
        sendUpdateMessage("正在检查更新……");
    });
    autoUpdater.on("update-available", function (info) {
        sendUpdateMessage("检测到新版本，正在下载……");
    });
    autoUpdater.on("update-not-available", function (info) {
        sendUpdateMessage("现在使用的就是最新版本，不用更新");
    });
    // 执行更新
    autoUpdater.on("update-downloaded", function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
        ipcMain.on('isUpdateNow', (e, arg) => {
            autoUpdater.quitAndInstall();
        });
        mainWindow.webContents.send('isUpdateNow');
    });

    ipcMain.on("checkForUpdate", () => {
        //执行自动更新检查
        autoUpdater.checkForUpdates();
    });
}

// 通过main进程发送事件给renderer进程
function sendUpdateMessage(text) {
    mainWindow.webContents.send("message", text);
}
