alert(1)

const xhrProxy = require('../../assets/util/xhr_proxy');
const fetchProxy = require('../../assets/util/fetch_proxy');
const { remote, ipcRenderer } = require('electron');
const { xhrList, fetchList } = require("../../assets/util/factory");
const { from, interval, timer } = require("rxjs");
const { filter, take, tap, delay } = require("rxjs/operators");

let delayTime = 1000;
// 渲染进程id
const id = remote.getGlobal('mainWindowId');
// 生意参谋进程id
from(remote.BrowserWindow.getAllWindows()).pipe(filter(item => item.id !== id)).subscribe(item => {
    remote.getGlobal('sycmWindowId').id = item.id;
});

// 发送数据到渲染进程 xhr
xhrProxy.addHandler(function (xhr) {
    from(xhrList).pipe(filter(item => xhr.responseURL.includes(item))).subscribe(item => {
        // 接口成功
        var data = JSON.parse(xhr.response);
        if (0 === data.code) {
            remote.BrowserWindow.fromId(id).webContents.send('send-xhr-data', item, {}, JSON.stringify(data.data));
        }
    });
});

// 发送数据到渲染进程 fetch
fetchProxy.addHandler(function (params, res) {
    from(fetchList).pipe(filter(item => res.clone().url.includes(item))).subscribe(item => {
        // 接口成功
        res.clone().json().then(result => {
            if (0 === result.code) {
                remote.BrowserWindow.fromId(id).webContents.send('send-xhr-data', item, params, result.data);
            }
        });
    });
});


// 登录成功后
ipcRenderer.on('login-success', (event, type, data) => {
    点击竞争
    interval(1000)
        .pipe(filter(() => document.querySelectorAll(".menu-list").length > 0))
        .pipe(filter(() => !hasClass(document.querySelector(".menu-list").querySelectorAll('li')[14], "selected")))
        .pipe(take(1))
        .pipe(tap(() => { document.querySelector(".menu-list").querySelectorAll('li')[14].querySelector('a').click() }))
        .subscribe();
    // 点击监控商品
    interval(1000)
        .pipe(filter(() => document.querySelectorAll(".ebase-ModernFrame__leftMenu").length > 0))
        .pipe(filter(() => !hasClass(document.querySelector(".ebase-ModernFrame__leftMenu").querySelectorAll('.level-leaf')[3], "selected")))
        .pipe(take(1))
        .pipe(tap(() => { document.querySelector(".ebase-ModernFrame__leftMenu").querySelectorAll('.level-leaf')[3].querySelector('a').click() }))
        .subscribe();
    // 点击分页参数
    interval(1000)
        .pipe(filter(() => document.querySelectorAll(".alife-dt-card-common-table-pagination-container").length > 0))
        .pipe(take(1))
        .pipe(tap(() => document.querySelector(".alife-dt-card-common-table-pagination-container").querySelector('.oui-select').click()))
        .pipe(delay(delayTime))
        .pipe(tap(() => { document.querySelector(".ant-select-dropdown").querySelectorAll('li')[3].click() }))
        .subscribe();
});

// list获取成功之后
ipcRenderer.on('list-success', (event, type, data) => {
    // 点击竞争
    interval(1000)
        .pipe(filter(() => document.querySelectorAll(".menu-list").length > 0))
        .pipe(filter(() => !hasClass(document.querySelector(".menu-list").querySelectorAll('li')[14], "selected")))
        .pipe(take(1))
        .pipe(tap(() => { document.querySelector(".menu-list").querySelectorAll('li')[14].querySelector('a').click() }))
        .subscribe();
    // 点击竞品分析
    interval(1000)
        .pipe(filter(() => document.querySelectorAll(".ebase-ModernFrame__leftMenu").length > 0))
        .pipe(filter(() => !hasClass(document.querySelector(".ebase-ModernFrame__leftMenu").querySelectorAll('.level-leaf')[5], "selected")))
        .pipe(take(1))
        .pipe(tap(() => { document.querySelector(".ebase-ModernFrame__leftMenu").querySelectorAll('.level-leaf')[5].querySelector('a').click() }))
        .subscribe();
    // 点击日
    interval(1000)
        .pipe(filter(() => document.querySelectorAll(".oui-date-picker-particle-button").length > 0))
        .pipe(filter(() => !hasClass(document.querySelector(".oui-date-picker-particle-button").querySelectorAll('button')[3], "ant-btn-primary")))
        .pipe(take(1))
        .pipe(tap(() => { document.querySelector(".oui-date-picker-particle-button").querySelectorAll('button')[3].click() }))
        .subscribe();
    // 点击+号
    interval(1000).pipe(filter(() => document.querySelectorAll(".sycm-common-select-2").length === 1))
        .pipe(filter(() => document.querySelectorAll(".sycm-common-select-3").length === 1))
        .pipe(take(1))
        .pipe(tap(() => { document.querySelectorAll(".sycm-common-select-2")[0].querySelector("span").click() }))
        .pipe(delay(200))
        .pipe(tap(() => { document.querySelectorAll(".sycm-common-select-3")[0].querySelector("span").click() }))
        .subscribe();

    //  点击自家产品列表
    var o = interval(delayTime * 11)
        .pipe(filter(() => document.querySelectorAll(".sycm-common-select-2").length > 1 && document.querySelectorAll(".sycm-common-select-3").length > 1))
        .pipe(delay(delayTime))
        .subscribe((item) => {
            window.scrollTo(0, 800);
            let l = document.querySelectorAll(".sycm-common-select-2")[1].querySelectorAll(".oui-typeahead-dropdown-item").length;
            let _l = document.querySelectorAll(".sycm-common-select-3")[1].querySelectorAll(".oui-typeahead-dropdown-item").length;
            let max = Math.max(l, _l);
            // 两者共有
            if (item <= max) {
                timer(delayTime)
                    .pipe(take(1))
                    .pipe(tap(() => {
                        const dom = document.querySelectorAll(".sycm-common-select-2")[1].querySelectorAll(".oui-typeahead-dropdown-item")[item];
                        dom && dom.click();
                    }))
                    .pipe(delay(delayTime))
                    .pipe(tap(() => {
                        const dom = document.querySelectorAll(".sycm-common-select-3")[1].querySelectorAll(".oui-typeahead-dropdown-item")[item];
                        dom && dom.click();
                    }))
                    .pipe(delay(delayTime))
                    // 点击下拉
                    .pipe(tap(() => { document.querySelectorAll(".oui-select")[1].click() }))
                    .pipe(delay(delayTime))
                    .pipe(tap(() => { document.querySelectorAll(".oui-select")[2].click() }))
                    .pipe(delay(delayTime))
                    // 点击无线端
                    .pipe(tap(() => { document.querySelectorAll(".ant-select-dropdown")[0].querySelectorAll("li")[1].click() }))
                    .pipe(delay(delayTime))
                    // 点击天猫
                    .pipe(tap(() => { document.querySelector(".oui-card-switch").querySelectorAll(".oui-card-switch-item")[1].click() }))
                    .pipe(delay(delayTime))
                    // 点击pc端
                    .pipe(tap(() => { document.querySelectorAll(".ant-select-dropdown")[0].querySelectorAll("li")[0].click() }))
                    .pipe(delay(delayTime))
                    // 点击淘宝
                    .pipe(tap(() => { document.querySelector(".oui-card-switch").querySelectorAll(".oui-card-switch-item")[0].click() }))
                    .pipe(delay(delayTime))
                    //  入店来源无线端
                    .pipe(tap(() => { document.querySelectorAll(".ant-select-dropdown")[1].querySelectorAll("li")[0].click() }))
                    .pipe(delay(delayTime))
                    // 入店来源pc端
                    .pipe(tap(() => { document.querySelectorAll(".ant-select-dropdown")[1].querySelectorAll("li")[1].click() }))
                    .subscribe();
            } else {
                o.unsubscribe();
            }
        });
})

ipcRenderer.on("add-competition", (event, type, data) => {
    // 点击监控商品
})

// 是否有classname
function hasClass(ele, cls) {
    if (ele) {
        cls = cls || ''
        if (cls.replace(/\s/g, '').length == 0) return false;
        return new RegExp(' ' + cls + ' ').test(' ' + ele.className + ' ')
    }
}