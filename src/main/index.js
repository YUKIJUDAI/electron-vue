const { app, BrowserWindow, ipcMain, dialog, Menu, Tray } = require('electron');
const path = require('path');
const fs = require('fs');
const { autoUpdater } = require("electron-updater");

if (process.env.NODE_ENV !== 'development') {
    global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow;
let sycmWindow;
let tray;
let uploadUrl = "http://127.0.0.1:3000/public";

const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

// 打开生意参谋
ipcMain.on("open-sycm", function () {
    createView();
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


app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});

// 创建窗口
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280, height: 800, autoHideMenuBar: true,
        minWidth: 1280, minHeight: 800, frame: false,
        webPreferences: {
            webviewTag: true,
            webSecurity: true,
            nodeIntegration: true
        }
    });
    // 加载网页
    mainWindow.loadURL(winURL);
    // 打开调试
    mainWindow.webContents.closeDevTools();
    // mainWindow.webContents.openDevTools();
    // 存储用户信息
    global.userInfo = {
        token: "",      //token
        phone: ""      // 手机号
    }
    mainWindow.on('closed', function () {
        mainWindow = null;
        global.userInfo = null;
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
    tray.setToolTip('黑搜开发器')
    tray.setContextMenu(contextMenu)
}

// 创建生意参谋子窗口
function createView() {
    if (sycmWindow) {
        dialog.showErrorBox("错误提示", "只能登录一个生意参谋");
        return;
    }
    sycmWindow = new BrowserWindow({
        width: 1000, height: 800, parent: mainWindow, autoHideMenuBar: true,
        webPreferences: {
            webviewTag: true,
            webSecurity: true,
            nodeIntegration: true,
            preload: __static + "/sycm.js"
        }
    });
    // 加载网页
    sycmWindow.webContents.loadURL('https://sycm.taobao.com/custom/login.htm');
    // 打开调试
    sycmWindow.webContents.closeDevTools();
    // sycmWindow.webContents.openDevTools();
    // 存储淘宝信息
    global.tbInfo = {
        loginUserName: "",    //  淘宝登录账户
        runAsShopId: "",           //  店铺id
        runAsShopTitle: "",      //  当前店铺名称
        loginUserId: "",  //  淘宝登录用户id
        runAsUserId: "",     //  当前使用的淘宝用户id
        cateId: "",   // 店铺分类id
        cateName: ""  // 店铺分类名字
    };

    sycmWindow.on('closed', function () {
        sycmWindow = null;
        global.tbInfo = null;
    });
}

// 版本更新
function updateHandle() {

    autoUpdater.setFeedURL(uploadUrl);
    autoUpdater.on('error', function (error) {
        sendUpdateMessage("检查更新出错");
    });
    autoUpdater.on('checking-for-update', function () {
        sendUpdateMessage("正在检查更新……");
    });
    autoUpdater.on('update-available', function (info) {
        sendUpdateMessage("检测到新版本，正在下载……");
    });
    autoUpdater.on('update-not-available', function (info) {
        sendUpdateMessage("现在使用的就是最新版本，不用更新");
    });
    // 执行更新
    autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
        const dialogOpts = {
            type: 'info',
            buttons: ['更新', '不更新'],
            title: '工具箱更新升级',
            message: process.platform === 'win32' ? releaseNotes : releaseName,
            detail: '监测到一个新的版本，请点击更新按钮更新工具箱'
        }

        ipcMain.on('isUpdateNow', (e, arg) => {
            dialog.showMessageBox(dialogOpts).then((returnValue) => {
                if (returnValue.response === 0) autoUpdater.quitAndInstall()
            });
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
    mainWindow.webContents.send('message', text)
}