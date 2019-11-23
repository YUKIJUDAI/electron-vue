const xhrProxy = require('../../util/xhr_proxy');
const fetchProxy = require('../../util/fetch_proxy');
const { remote, ipcRenderer } = require('electron');
const { xhrList, fetchList } = require("../../util/factory");
const { from, interval } = require("rxjs");
const { filter, take } = require("rxjs/operators");

// 渲染进程id
const id = remote.getGlobal('mainWindowId');
// 生意参谋进程id
from(remote.BrowserWindow.getAllWindows()).pipe(filter(item => item.id !== id)).subscribe(item => {
    remote.getGlobal('sycmWindowId').id = item.id;
});



// 发送数据到渲染进程
xhrProxy.addHandler(function (xhr) {
    from(xhrList).pipe(filter(item => xhr.responseURL.includes(item))).subscribe(item => {
        // 接口成功
        var data = JSON.parse(xhr.response);
        if (0 === data.code) {
            remote.BrowserWindow.fromId(id).webContents.send('send-xhr-data', item, JSON.stringify(data.data));
        }
    });
});

fetchProxy.addHandler(function (res) {
    from(fetchList).pipe(filter(item => res.clone().url.includes(item))).subscribe(item => {
        // 接口成功
        res.clone().json().then(result => {
            if (0 === result.code) {
                remote.BrowserWindow.fromId(id).webContents.send('send-xhr-data', item, result.data);
            }
        });
    });
})


// 登录成功后
ipcRenderer.on('login-success', (event, type, data) => {
    // 点击竞争
    interval(1000)
        .pipe(filter(() => document.querySelectorAll(".menu-list").length > 0))
        .pipe(filter(() => !hasClass(document.querySelector(".menu-list").querySelectorAll('li')[14], "selected")))
        .pipe(take(1))
        .subscribe(() => {
            document.querySelector(".menu-list").querySelectorAll('li')[14].querySelector('a').click();
        });
    // 点击监控商品
    interval(1000).pipe(filter(() => document.querySelectorAll(".ebase-ModernFrame__leftMenu").length > 0))
        .pipe(filter(() => !hasClass(document.querySelector(".ebase-ModernFrame__leftMenu").querySelectorAll('.level-leaf')[3], "selected")))
        .pipe(take(1))
        .subscribe(() => {
            document.querySelector(".ebase-ModernFrame__leftMenu").querySelectorAll('.level-leaf')[3].querySelector('a').click();
        });
});

// 是否有classname
function hasClass(ele, cls) {
    if (ele) {
        cls = cls || ''
        if (cls.replace(/\s/g, '').length == 0) return false;
        return new RegExp(' ' + cls + ' ').test(' ' + ele.className + ' ')
    }
}