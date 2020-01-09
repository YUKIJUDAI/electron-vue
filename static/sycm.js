const { remote, ipcRenderer } = require('electron');
const qs = require("qs");
const { from, interval, timer, concat } = require("rxjs");
const { filter, take, tap, delay, map, flatMap, last } = require("rxjs/operators");
const moment = require('moment');

// 生意参谋dom信息方法配置
const DomFactory = function () {

    const $ = function (dom) {
        return document.querySelector(dom);
    }

    const $$ = function (dom) {
        return document.querySelectorAll(dom);
    }

    // 主页面
    const mainPage = {
        // 导航栏
        navigationBar: () => $$(".menu-list"),
        // 竞争按钮
        competitionBtn: () => $$(".menu-list li")[14].querySelector("a")
    }
    // 竞品监控页面
    const monitorPage = {
        // 竞品监控按钮
        monitorBtn: () => $$(".ebase-ModernFrame__leftMenu .level-leaf")[3].querySelector("a"),
        // 分页下拉
        paginationSel: () => $(".alife-dt-card-common-table-pagination-container").querySelector(".oui-select"),
        // 选择分页100
        paginationSize: () => $$(".ant-select-dropdown li")[3]
    }
    // 竞品分析页面
    const analysisPage = {
        // 竞品分析
        analysis: () => $$(".level-leaf")[5],
        // 竞品分析按钮
        analysisBtn: () => $$(".level-leaf")[5].querySelector('a'),
        // 导航条 日
        day: () => $$(".oui-date-picker-particle-button"),
        // 导航条 日按钮
        dayBtn: () => $$(".oui-date-picker-particle-button button")[3],
        // 加号下拉
        addSel: () => $$(".alife-dt-card-sycm-common-select"),
        // 点击加号
        addBtn: () => $$(".alife-dt-card-sycm-common-select")[1].querySelector("span"),
        // 搜索输入框
        analysisInput: () => $(".ant-input"),
        // 选出的数据
        analysisList: () => $(".oui-typeahead-dropdown-item"),
        // 入店关键词下拉
        storeSearchTermSel: () => $$(".oui-select")[1],
        // 无线端按钮
        wireless: () => $$(".ant-select-dropdown li")[1],
        // 天猫按钮
        tmall: () => $$(".oui-card-switch .oui-card-switch-item")[1],
        // pc按钮
        pc: () => $$(".ant-select-dropdown li")[0],
        // 淘宝按钮
        taobao: () => $$(".oui-card-switch .oui-card-switch-item")[0],
        // 成交关键词按钮
        TransactionKeywords: () => $$(".oui-tab-switch-item")[1],
        // 入店来源下拉
        storeSourceSel: () => $$(".oui-select")[2],
        // 入店来源无线端
        storeSourceWireless: () => $$(".ant-select-dropdown")[1].querySelectorAll("li")[0],
        // 入店来源分页数
        paginationNum: () => $("#sycm-mc-flow-analysis").querySelectorAll(".ant-pagination-item"),
        // 入店来源表格数据
        storeSourceTd: () => $("#sycm-mc-flow-analysis").querySelectorAll("td"),
        // 入店来源pc端
        storeSourcePc: () => $$(".ant-select-dropdown")[1].querySelectorAll("li")[1],
    }

    // 是否在竞争页面
    function isCompetitionPage() {
        return document.querySelector(".menu-list")
            && hasClass(document.querySelector(".menu-list").querySelectorAll("li")[14], "selected");
    }
    // 是否在监控商品页面
    function isMonitorPage() {
        return hasClass(document.querySelectorAll(".level-leaf")[3], "selected");
    }
    // 是否在竞品分析页面
    function isAnalysis() {
        return hasClass(document.querySelectorAll(".level-leaf")[5], "selected");
    }
    // 是否在竞争配置页面
    function isConfigurationPage() {
        return hasClass(document.querySelectorAll(".level-leaf")[11], "selected")
    }
    return {
        mainPage,
        monitorPage,
        analysisPage,
        isCompetitionPage,
        isMonitorPage,
        isAnalysis,
        isConfigurationPage
    }

}

const { mainPage, monitorPage, analysisPage, isCompetitionPage, isMonitorPage, isAnalysis, isConfigurationPage } = new DomFactory();

// 登录成功后
ipcRenderer.on('login-success', (event) => {
    //点击竞争
    interval(1000)
        .pipe(
            filter(() => mainPage.navigationBar().length > 0),
            take(1),
            delay(3000),
            // 点击竞争
            tap(() => { !isCompetitionPage() && mainPage.competitionBtn().click() }),
            delay(3000),
            // 点击监控商品
            tap(() => { !isMonitorPage() && monitorPage.monitorBtn().click() }),
            delay(3000),
            tap(() => monitorPage.paginationSel().click()),
            delay(3000),
            // 点击分页参数
            tap(() => { monitorPage.paginationSize().click() })
        )
        .subscribe();
});

// 添加竞品详情
ipcRenderer.on('add-monitor-detail', (event, goodsname) => {
    interval(1000)
        .pipe(
            filter(() => analysisPage.analysis()),
            // 如果不在竞争分析
            tap(() => {
                !isAnalysis() && analysisPage.analysisBtn().click()
            }),
            filter(() => analysisPage.day().length > 0),
            // 点击日
            tap(() => {
                !hasClass(analysisPage.dayBtn(), "ant-btn-primary") && analysisPage.dayBtn().click()
            }),
            filter(() => analysisPage.addSel().length > 0),
            take(1),
            // 点击加号
            tap(() => {
                analysisPage.addBtn().click()
            }),
            delay(1000),
            // 聚焦输入框
            tap(() => {
                analysisPage.analysisInput().focus()
            }),
            delay(1000),
            // 输入标题获取数据
            tap(() => {
                SetValue(analysisPage.analysisInput(), goodsname);
            }),
            delay(1000),
            // 点击数据
            tap(() => {
                analysisPage.analysisList().click();
                setLog({ flag: 1, msg: "开始获取竞品数据，请稍后。。。" });
            }),
            delay(1000),
            // 点击下拉
            tap(() => {
                setLog({ flag: 1, msg: "正在获取关键指标对比，请稍后。。。" });
                analysisPage.storeSearchTermSel().click();
            }),
            delay(1000),
            // 点击无线端
            tap(() => {
                setLog({ flag: 1, msg: "关键指标对比获取成功。" });
                analysisPage.wireless().click();
                setLog({ flag: 1, msg: "正在引流关键词信息，请稍后。。。" });
            }),
            delay(1000),
            // 点击天猫
            tap(() => {
                analysisPage.tmall().click();
            }),
            delay(1000),
            // 点击pc端
            tap(() => {
                analysisPage.pc().click();
            }),
            delay(1000),
            // 点击淘宝
            tap(() => {
                analysisPage.taobao().click();
            }),
            delay(1000),
            // 点击成交关键词
            tap(() => {
                analysisPage.TransactionKeywords().click();
            }),
            delay(1000),
            // 点击无线端
            tap(() => {
                setLog({ flag: 1, msg: "引流关键词信息获取成功。" });
                analysisPage.wireless().click();
                setLog({ flag: 1, msg: "正在成交关键词信息，请稍后。。。" });
            }),
            delay(1000),
            // 点击天猫
            tap(() => {
                analysisPage.tmall().click();
            }),
            delay(1000),
            // 点击pc端
            tap(() => {
                analysisPage.pc().click();
            }),
            delay(1000),
            // 点击淘宝
            tap(() => {
                analysisPage.taobao().click();
            }),
            delay(1000),
            // 滚动到底部
            tap(() => {
                window.scroll(0, 2000);
            }),
            delay(1000),
            // 点击下拉
            tap(() => {
                try {
                    analysisPage.storeSourceSel().click();
                } catch (error) {
                    setLog({ flag: 2, msg: "获取数据失败，请重试" });
                }
            }),
            delay(1000),
            // 点击无线端
            tap(() => {
                setLog({ flag: 1, msg: "成交关键词信息获取成功" });
                analysisPage.storeSourceWireless().click();
                setLog({ flag: 1, msg: "正在获取流量数据，数据量较大，请稍后。。。" });
            }),
            delay(1000)
        )
        .subscribe(() => {
            var _a = analysisPage.paginationNum();
            let a = timer(1000, 35000)
                .pipe(
                    take(_a.length),
                    tap((i) => {
                        // 点击下一页
                        _a[i].click();
                    }),
                );

            a.subscribe(() => {
                var _b = analysisPage.storeSourceTd();
                let b = timer(0, 1000)
                    .pipe(
                        take(_b.length),
                        delay(500),
                        filter((i) => (i + 1) % 3 === 0),
                        // 点击趋势
                        tap((i) => {
                            _b[i].querySelector("a").click();
                        }),
                        last(),
                        tap(() => {
                            analysisPage.storeSourcePc().click();
                        }),
                        delay(1000)
                    );

                b.subscribe(() => {
                    var _c = analysisPage.paginationNum();
                    let c = timer(1000, 35000)
                        .pipe(
                            take(_c.length),
                            tap((i) => {
                                // 点击下一页
                                _c[i].click();
                            })
                        );

                    c.subscribe((j) => {
                        var _d = analysisPage.storeSourceTd();
                        let d = timer(0, 1000)
                            .pipe(
                                take(_d.length),
                                delay(500),
                                filter((i) => (i + 1) % 3 === 0),
                                // 点击趋势
                                tap((i) => {
                                    _d[i].querySelector("a").click();
                                }),
                                last(),
                                tap(() => {
                                    j === (_c.length - 1) && setLog({ flag: 0, msg: "流量数获取成功" });
                                }),
                                delay(1000)
                            );

                        d.subscribe();
                    })
                });
            })
        });
});

// 添加竞品
ipcRenderer.on("add-monitor", (event, data) => {

    data.id = data.id.split(",");

    interval(10000)
        .pipe(take(data.id.length))
        .subscribe((item => {
            // 点击监控商品
            interval(1000)
                .pipe(filter(() => document.querySelectorAll('.level-leaf')[11]))
                .pipe(tap(() => {
                    // 如果不在竞争配置
                    !isConfigurationPage() && document.querySelectorAll('.level-leaf')[11].querySelector('a').click()
                }))
                .pipe(filter(() => document.querySelectorAll(".oui-tab-switch-item")[1]))
                .pipe(tap(() => {
                    // 如果不在竞争商品页
                    !hasClass(document.querySelectorAll(".oui-tab-switch-item")[1], "oui-tab-switch-item-active") && document.querySelectorAll(".oui-tab-switch-item")[1].click()
                }))
                .pipe(filter(() => document.querySelector(".alife-dt-card-sycm-common-select") && document.querySelector(".alife-dt-card-sycm-common-select").querySelector("span")))
                .pipe(tap(() => {
                    // 如果没有弹框被隐藏
                    if (!document.querySelector(".ant-dropdown") || hasClass(document.querySelector(".ant-dropdown"), ".ant-dropdown-hidden")) {
                        document.querySelector(".alife-dt-card-sycm-common-select").querySelector("span").click();
                    }
                }))
                .pipe(filter(() => document.querySelectorAll(".ant-input-suffix")[1]))
                .pipe(take(1))
                .pipe(tap(() => {
                    setLog({ flag: 1, msg: `正在获取竞品${data.id[item]}的数据` });
                    document.querySelectorAll(".ant-input-suffix")[1].querySelector("i").click()
                }))
                .pipe(delay(1000))
                .pipe(tap(() => {
                    document.querySelectorAll(".ant-input")[1].focus()
                }))
                .pipe(delay(500))
                .pipe(tap(() => {
                    SetValue(document.querySelectorAll(".ant-input")[1], data.id[item]);
                }))
                .pipe(delay(1000))
                .pipe(tap(() => {
                    !document.querySelector(".oui-typeahead-dropdown-item") && setLog({ flag: (data.id.length === (item + 1) ? 2 : 1), msg: `竞品${data.id[item]}不存在` })
                }))
                .pipe(filter(() => document.querySelector(".oui-typeahead-dropdown-item")))
                .pipe(tap(() => {
                    document.querySelector(".oui-typeahead-dropdown-item").click();
                    setLog({ "flag": (data.id.length === (item + 1) ? 0 : 1), "msg": `获取竞品${data.id[item]}成功` })
                }))
                .subscribe();
        }));
});


// 是否有classname
function hasClass(ele, cls) {
    if (ele) {
        cls = cls || ''
        if (cls.replace(/\s/g, '').length == 0) return false;
        return new RegExp(' ' + cls + ' ').test(' ' + ele.className + ' ')
    }
}
// 设置日志
function setLog(obj) {
    from(remote.BrowserWindow.getAllWindows()).subscribe(j => {
        remote.BrowserWindow.fromId(j.id).webContents.send('get-log', obj);
    });
}
// 设置value值
function SetValue(node, text) {
    var event;
    delete node['value'];
    node.value = text;
    event = document.createEvent('HTMLEvents');
    event.initEvent('input', true, false);
    node.dispatchEvent(event);
}

// 通过劫持原生XMLHttpRequest实现对页面ajax请求的监听
function XhrProxy() {

    this.xhrList = [
        "getPersonalView", // 个人信息
    ];

    // 添加方法
    this.addHandler = function (handler) {
        initProxy();
        gHandlerList.push(handler);
    }
    // 去除方法
    this.removeHandler = function (handler) {
        gHandlerList = gHandlerList.filter(h => h !== handler);
    }

    let gHandlerList = [],  //截获请求的处理函数列表
        gIsInited = false;  //是否已经初始化
    let initProxy = function () {
        if (gIsInited) return;
        gIsInited = true;

        //这里先缓存一份原生的XMLHttpRequest类
        let winXMLHttpRequest = window.XMLHttpRequest;

        //用于替换原生XMLHttpRequest的类，继承自XMLHttpRequest
        let ProxyXHR = class extends winXMLHttpRequest {
            constructor() {
                super(...arguments);
                //调用原生XMLHttpRequest的addEventListener，添加对readystatechange事件的监听
                super.addEventListener('readystatechange', async () => {
                    if (this.readyState == 4 && gHandlerList.length) {
                        try {
                            //调用注册的handler
                            await gHandlerList.map(proxyHandler => proxyHandler.call(this, this));
                        }
                        catch (e) {
                            //TODO 这里可以替换为其他的错误处理逻辑
                            console.error(e);
                        }
                    }
                });
            }
        }
        //覆盖原生的XMLHttpRequest
        window.XMLHttpRequest = ProxyXHR;
    }
}
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

// 通过劫持原生fetch实现对页面ajax请求的监听
function FetchProxy() {

    this.addHandler = function (handler) {
        initProxy();
        gHandlerList.push(handler);
    }

    this.removeHandler = function (handler) {
        gHandlerList = gHandlerList.filter(h => h !== handler);
    }

    this.fetchList = [
        "trend", // 我的店铺趋势
        "overview", // 我的点铺数据
        "list", // 竞品列表
        "getCoreIndexes", // 关键指标对比
        "getCoreTrend", // 曲线图数据
        "getKeywords", // 入店关键词
        "getFlowSource", // 入店来源
        "getSourceTrend", // 入店来源趋势
        "getSingleMonitoredInfo", // 竞争商品信息
        "trend", //竞品趋势信息
        "getShopCate", // 店铺分类信息
    ]

    let gHandlerList = [],  //截获请求的处理函数列表
        gIsInited = false;  //是否已经初始化
    let initProxy = function () {
        if (gIsInited) return;
        gIsInited = true;
        var winFetch = window.fetch;
        window.fetch = function (url, opts) {
            return new Promise((resolve, reject) => {
                winFetch(url, opts).then(
                    (res) => {
                        try {
                            let params = (opts && opts.hasOwnProperty("params")) ? opts.params : qs.parse(url.split("?")[1]);
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
// 发送数据到渲染进程 fetch
let fetchProxy = new FetchProxy();
fetchProxy.addHandler(function (params, res) {
    from(fetchProxy.fetchList).pipe(filter(item => res.clone().url.includes(item))).subscribe(item => {
        // 接口成功
        res.clone().json().then(result => {
            result.content && (result = result.content);
            if (0 === result.code) {
                from(remote.BrowserWindow.getAllWindows()).subscribe(i => {
                    remote.BrowserWindow.fromId(i.id).webContents.send('send-xhr-data', item, params, result.data);
                });
            }
        });
    });
});