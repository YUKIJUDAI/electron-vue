const { remote, ipcRenderer } = require('electron');
const qs = require("qs");
const { from, interval, timer } = require("rxjs");
const { filter, take, tap, delay, map } = require("rxjs/operators");

let delayTime = 1000;

// 发送数据到渲染进程 xhr
let xhrProxy = new XhrProxy();
xhrProxy.addHandler(function (xhr) {
    from(xhrProxy.xhrList).pipe(filter(item => xhr.responseURL.includes(item))).subscribe(item => {
        // 接口成功
        var data = JSON.parse(xhr.response);
        if (0 === data.code) {
            from(remote.BrowserWindow.getAllWindows()).subscribe(i => {
                remote.BrowserWindow.fromId(i.id).webContents.send('send-xhr-data', item, {}, JSON.stringify(data.data));
            });
        }
    });
});

// 发送数据到渲染进程 fetch
let fetchProxy = new FetchProxy();
fetchProxy.addHandler(function (params, res) {
    from(fetchProxy.fetchList).pipe(filter(item => res.clone().url.includes(item))).subscribe(item => {
        // 接口成功
        res.clone().json().then(result => {
            if (0 === result.code) {
                from(remote.BrowserWindow.getAllWindows()).subscribe(i => {
                    remote.BrowserWindow.fromId(i.id).webContents.send('send-xhr-data', item, params, result.data);
                });
            }
        });
    });
});

// 登录成功后
ipcRenderer.on('login-success', (event, type, data) => {
    //点击竞争
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
// 添加竞品
ipcRenderer.on("add-monitor", (event, data) => {
    // todo
    let data1 = {
        firstCateId: 50010728,
        sellerType: -1,
        rivalType: "item",
        keyword: data.id,
        token: "b758749f8",
    }
    let data2 = {
        firstCateId: 50010728,
        rivalType: "item",
        itemId: data.id,
        token: "b758749f8"
    };
    let data3 = {
        dateType: "day",
        dateRange: "2019-12-05|2019-12-05",
        cateId: 50010728,
        itemId: data.id,
        device: 0,
        sellerType: -1,
        indexCode: "uvIndex, payRateIndex, tradeIndex, payByrCntIndex",
        token: "b758749f8"
    }
    let headers1 = {
        "transit-id": "Vbib0iPwoCDKW0ZsO3iwAiJ8putPDG3c6ewf3xmRMoBz3I2NV6hZHYL28SeRgjm8xPBa7K6Y3M8mnSST9VQmdb083ubQLpbJ1OZ4YC2g79mAO0sZLxSNu5NisnG+NwVYyZ4GLjqhHB9qCQeYRrVg09N/WHjlDvRYHAqrJsgAqPA="
    }
    let headers2 = {
        "transit-id": "bU47zaWeb8VVcm2sNmxQe19Wp4v5gg5aGLqrIX18nal2J7c8SkqT8euUXveAJIHSf50MVfUaFBdgNBERkxjfH4aBzGPMJNpUXbLW38OtZkgZvtJs8bUY/4HYOQN05p9P36sItFVASW1vtbJA2RFyaI6GIimPuncwkJo2M7hkcgs="
    }
    let headers3 = {
        "transit-id": "CFOeUXt/nqP1xWr41wurWvBAh5fXki2NDfkhh46M/6cMogqs7Qm1N/UlnvEN2igkBprtzoLTkIEDopZ3Y4C/b4161yPk7EEhwWjtKWSHHb7XFGxl1VCUpSFtWbItSCGSqfaml4sWTm+NIDNUvHqk3asu2dQn9d6B9f2Yqb9MgNk="
    }
    // 点击监控商品
    from(fetch("https://sycm.taobao.com/mc/ci/config/rival/item/queryItem.json?" + qs.stringify(Object.assign(data1, { "_": new Date().getTime() })), { headers: headers1 }))
        .pipe(map(res => res.json()))
        .subscribe((result) => {
            result.then(res => {
                if (0 === res.data.result) {
                    from(remote.BrowserWindow.getAllWindows()).subscribe(i => {
                        remote.BrowserWindow.fromId(i.id).webContents.send('get-log', { flag: 1, msg: `已获取竞品${data.id}的数据，正在解析` });
                    });
                } else {
                    from(remote.BrowserWindow.getAllWindows()).subscribe(i => {
                        remote.BrowserWindow.fromId(i.id).webContents.send('get-log', { flag: 2, msg: res.data.message });
                    });
                }
            }).catch(err => {
                from(remote.BrowserWindow.getAllWindows()).subscribe(i => {
                    rremote.BrowserWindow.fromId(i.id).webContents.send('get-log', { flag: 2, msg: "获取竞品信息失败，请重试" });
                });
            })
        });

    interval(5000)
        .pipe(take(1))
        .subscribe((i) => {
            from(fetch("https://sycm.taobao.com/mc/ci/config/rival/item/getSingleMonitoredInfo.json?" + qs.stringify(Object.assign(data2, { "_": new Date().getTime() })), { headers: headers2 }))
                .pipe(delay(5000))
                .pipe(map(res => res.json()))
                .subscribe();
        });

    interval(5000)
        .pipe(take(+data.time / 30))
        .subscribe((i) => {
            from(fetch("https://sycm.taobao.com/mc/ci/item/trend.json?" + qs.stringify(Object.assign(data3, { "_": new Date().getTime() })), { headers: headers3 }))
                .pipe(map(res => res.json()))
                .subscribe((result) => {
                    result.then(res => {
                        if (0 === res.code && i === (+data.time / 30 - 1)) {
                            from(remote.BrowserWindow.getAllWindows()).subscribe(j => {
                                remote.BrowserWindow.fromId(j.id).webContents.send('get-log', { flag: 0, msg: `获取竞品${data.id}信息成功` });
                            });
                        }
                    })
                });
        })

})

// 是否有classname
function hasClass(ele, cls) {
    if (ele) {
        cls = cls || ''
        if (cls.replace(/\s/g, '').length == 0) return false;
        return new RegExp(' ' + cls + ' ').test(' ' + ele.className + ' ')
    }
}

/**
 * 通过劫持原生XMLHttpRequest实现对页面ajax请求的监听
 */
function XhrProxy() {

    this.xhrList = [
        "getPersonalView", // 个人信息
    ];

    this.addHandler = function (handler) {
        initProxy();
        gHandlerList.push(handler);
    }

    this.removeHandler = function (handler) {
        gHandlerList = gHandlerList.filter(h => h !== handler);
    }

    const READY_STATE_CHANGE = 'readystatechange';
    let gHandlerList = [],  //截获请求的处理函数列表
        gIsInited = false;  //是否已经初始化
    let T_RSC_HANDLERS = Symbol('readyStateChangeHandler');
    let initProxy = function () {
        if (gIsInited) return;
        gIsInited = true;

        //这里先缓存一份原生的XMLHttpRequest类
        let winXMLHttpRequest = window.XMLHttpRequest;

        //用于替换原生XMLHttpRequest的类，继承自XMLHttpRequest
        let ProxyXHR = class extends winXMLHttpRequest {
            constructor() {
                super(...arguments);
                //readystatechange
                //数组中第0个为页面中调用xhr.onreadystatechange的回调函数
                //其他的为页面中调用addEventListener('readystatechange')时的回调函数
                this[T_RSC_HANDLERS] = [null];
                //调用原生XMLHttpRequest的addEventListener，添加对readystatechange事件的监听
                super.addEventListener(READY_STATE_CHANGE, async () => {
                    if (this.readyState == 4 && gHandlerList.length) {//只有4的时候会回调proxyHandler
                        try {
                            //调用注册的handler
                            await gHandlerList.map(proxyHandler => proxyHandler.call(this, this));
                        }
                        catch (e) {
                            //TODO 这里可以替换为其他的错误处理逻辑
                            console.error(e);
                        }
                    }
                    //调用页面中注册的回调函数，保证页面中逻辑正常
                    this[T_RSC_HANDLERS].forEach(handler => handler && handler.apply(this, arguments));
                });
            }
            /**
             * 重写addEventListener函数，对readystatechange事件做特殊处理
             */
            addEventListener(type, handler) {
                if (type == READY_STATE_CHANGE) {
                    this[T_RSC_HANDLERS].push(handler);
                }
                else {
                    return super.addEventListener(...arguments);
                }
            }
            /**
             * 重写removeEventListener函数，对readystatechange事件做特殊处理
             */
            removeEventListener(type, handler) {
                if (type == READY_STATE_CHANGE) {
                    this[T_RSC_HANDLERS] = this[T_RSC_HANDLERS].filter(i => i !== handler);
                }
                else {
                    return super.removeEventListener(...arguments);
                }
            }
            /**
             * 重写onreadystatechange属性的setter
             */
            set onreadystatechange(val) {
                this[T_RSC_HANDLERS][0] = val;
            }
            /**
             * 重写onreadystatechange属性的getter
             */
            get onreadystatechange() {
                return this[T_RSC_HANDLERS][0] || null;
            }

        }
        //覆盖原生的XMLHttpRequest
        window.XMLHttpRequest = ProxyXHR;
    }
}

/**
 * xhr_proxy.js
 * 通过劫持原生fetch实现对页面ajax请求的监听
 */
function FetchProxy() {

    this.addHandler = function (handler) {
        initProxy();
        gHandlerList.push(handler);
    }

    this.removeHandler = function (handler) {
        gHandlerList = gHandlerList.filter(h => h !== handler);
    }

    this.fetchList = [
        "list", // 竞品列表
        "getCoreIndexes", // 关键指标对比
        "getCoreTrend", // 曲线图数据
        "getKeywords", // 入店关键词
        "getFlowSource", // 入店来源
        "getSingleMonitoredInfo" // 竞争商品信息
    ]

    let gHandlerList = [],  //截获请求的处理函数列表
        gIsInited = false;  //是否已经初始化
    let initProxy = function () {
        if (gIsInited) return;
        gIsInited = true;
        var winFetch = window.fetch;
        window.fetch = function (input, opts) {
            return new Promise((resolve, reject) => {
                winFetch(input, opts).then(
                    (res) => {
                        try {
                            let params = (opts && opts.hasOwnProperty("params")) ? opts.params : {};
                            gHandlerList.map(proxyHandler => proxyHandler.call(this, params, res));
                        }
                        catch (e) {
                            console.error(e);
                        }
                        resolve(res);
                    },
                    (err) => {
                        reject(err)
                    }
                )
            })
        }
    }
} 