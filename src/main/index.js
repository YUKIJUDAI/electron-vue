const { app, BrowserWindow, ipcMain, dialog, Menu, Tray, screen } = require('electron');
const path = require('path');
const fs = require('fs');
const { autoUpdater } = require("electron-updater");
const log4js = require('log4js');

if (process.env.NODE_ENV !== 'development') {
    global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow;
let sycmWindow;
let adWindow;
let tray;
let uploadUrl = "http://127.0.0.1:3000/public";

// 日志
log4js.configure({
    appenders: {
        error: { type: "dateFile", filename: __static + "/logs/error-log.log", pattern: ".yyyy-MM-dd", maxLogSize: 10240, backups: 3 }
    },
    categories: {
        default: { appenders: ["error"], level: "debug" }
    }
});
let logError = log4js.getLogger("default");

const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`


app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});

// 输出日志
ipcMain.on("log", function (e, err) {
    logError.debug(err);
})

// 打开生意参谋
ipcMain.on("open-sycm", function (e, account, pwd) {
    createSycmWindow(account, pwd);
});

// 打开广告
ipcMain.on("open-ad", function (e, id, proxyid) {
    createAdView(id, proxyid);
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
ipcMain.on("close", function () {
    mainWindow.close();
});

// 隐藏生意参谋
ipcMain.on("hide-sycm", function () {
    sycmWindow && sycmWindow.hide();
});

//显示生意参谋
ipcMain.on("show-sycm", function () {
    sycmWindow && sycmWindow.showInactive();
});

// 创建窗口
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280, height: 800, autoHideMenuBar: true,
        minWidth: 1280, minHeight: 800, frame: false,
        webPreferences: {
            devTools: true,
            webviewTag: true,
            webSecurity: true,
            nodeIntegration: true
        }
    });
    // 加载网页
    mainWindow.loadURL(winURL);
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
    // 启动更新
    updateHandle();

    tray = new Tray(__static + "/logo.ico")
    const contextMenu = Menu.buildFromTemplate([
        {
            label: '退出', type: 'normal', click() {
                if (process.platform !== 'darwin') app.quit();
            }
        }
    ])
    tray.setToolTip('火星情报');
    tray.setContextMenu(contextMenu);
}

//创建广告弹出
function createAdView(id, proxyid) {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    let adWindow = new BrowserWindow({
        width: 250, height: 300,
        x: width - 260, y: height - 305,
        parent: mainWindow, autoHideMenuBar: true,
        resizable: false, movable: false,
        minimizable: false, maximizable: false
    })
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
        width: 1000, height: 800,
        parent: mainWindow, autoHideMenuBar: true,
        webPreferences: {
            devTools: true,
            webviewTag: true,
            webSecurity: true,
            preload: __static + "/sycm.js"
        }
    });
    // 加载网页
    sycmWindow.webContents.loadURL(
        'https://login.taobao.com/member/login.jhtml?from=sycm&full_redirect=true&style=minisimple&minititle=&minipara=0,0,0&sub=true&redirect_url=http://sycm.taobao.com/portal/home.htm',
        { userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36" }
    );
    sycmWindow.webContents.once("dom-ready", () => {
        sycmWindow.webContents.send("dom-ready");
        account && pwd && sycmWindow.webContents.send("autoLogin", account, pwd);
    });
    // 存储淘宝信息
    global.tbInfo = {
        loginUserName: "",    //  淘宝登录账户
        tb_password: "",       // 淘宝密码
        runAsShopId: "",      //  店铺id
        runAsShopTitle: "",   //  当前店铺名称
        loginUserId: "",      //  淘宝登录用户id
        runAsUserId: "",      //  当前使用的淘宝用户id
        cateId: "",           // 店铺分类id
        cateName: ""          // 店铺分类名字
    };
    sycmWindow.on('closed', function () {
        mainWindow.webContents.send("router-to", "/heisoubinding/binding");
        sycmWindow = null;
        global.tbInfo = null;
    });
}

// 版本更新
function updateHandle() {
    autoUpdater.setFeedURL(uploadUrl);
    // 执行更新
    autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
        const dialogOpts = {
            type: 'info',
            buttons: ['更新', '不更新'],
            title: '工具箱更新升级',
            message: process.platform === 'win32' ? releaseNotes : releaseName,
            detail: '监测到一个新的版本，请点击更新按钮更新工具箱'
        }
        dialog.showMessageBox(dialogOpts).then((returnValue) => {
            if (returnValue.response === 0) autoUpdater.quitAndInstall()
        });
    });

    ipcMain.on("checkForUpdate", () => {
        //执行自动更新检查
        autoUpdater.checkForUpdates();
    });
}