const { remote, ipcRenderer } = require('electron');
const qs = require("qs");
const { from, interval, timer, concat } = require("rxjs");
const { filter, take, tap, delay, last, mergeMap, catchError } = require("rxjs/operators");
const moment = require('moment');

// 生意参谋dom信息方法配置
const DomFactory = function () {

    if (!this instanceof DomFactory) return new DomFactory();

    const $ = function (dom) {
        return document.querySelector(dom);
    }

    const $$ = function (dom) {
        return document.querySelectorAll(dom);
    }

    // 登录页面
    const loginPage = {
        userInput: () => [$$("input[name='TPL_username']")[0], $$("input[name='fm-login-id']")[0]],
        pwdInput: () => [$$("input[name='TPL_password']")[0], $$("input[name='fm-login-password']")[0]],
        submitBtn: () => [$(".J_Submit"), $(".fm-submit")],
        readyFlag1: () => $$(".J_Submit"),
        readyFlag2: () => $$(".fm-submit"),
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
        analysisInput: () => $$(".ant-input")[1],
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
        // 关闭弹窗
        closeBtn: () => $(".ant-modal-close-x")
    }
    // 竞品配置页面
    const configurationPage = {
        // 竞品配置
        configuration: () => $$('.level-leaf')[11],
        // 竞品配置按钮
        configurationBtn: () => $$('.level-leaf')[11].querySelector('a'),
        // 竞争商品
        goodsBtn: () => $$(".oui-tab-switch-item")[1],
        // 查询竞品
        search: () => $(".alife-dt-card-sycm-common-select"),
        // 加号
        addBtn: () => $(".alife-dt-card-sycm-common-select").querySelector("span"),
        // 弹框
        popup: () => $(".ant-dropdown"),
        // 输入框
        input: () => $$(".ant-input")[1],
        // 删除
        del: () => $$(".ant-input-suffix")[1],
        // 删除按钮
        delIcon: () => $$(".ant-input-suffix")[1].querySelector("i"),
        // 数据列表
        getingData: () => $(".oui-typeahead-dropdown-item")
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
        loginPage,
        mainPage,
        monitorPage,
        analysisPage,
        configurationPage,
        isCompetitionPage,
        isMonitorPage,
        isAnalysis,
        isConfigurationPage
    }

}

const { loginPage, mainPage, monitorPage, analysisPage, configurationPage, isCompetitionPage, isMonitorPage, isAnalysis, isConfigurationPage } = new DomFactory();

// dom-ready
ipcRenderer.on("dom-ready", (event) => {
     
    try {
        loginPage.submitBtn()[0].addEventListener("click", () => {
            remote.getGlobal("tbInfo").tb_password = loginPage.pwdInput()[0].value;
        });
    } catch (error) {
        loginPage.submitBtn()[1].addEventListener("click", () => {
            remote.getGlobal("tbInfo").tb_password = loginPage.pwdInput()[1].value;
        });
    }
});

// 自动登录
ipcRenderer.on("autoLogin", (event, account, pwd) => {
    window.abc="abc";
    interval(100)
        .pipe(
            filter(() => loginPage.readyFlag1().length > 0 || loginPage.readyFlag2().length > 0),
            take(1),
            delay(Math.floor(Math.random() * (7000 - 3000)) + 3000),
            tap(() => {
                try {
                    SetValue(loginPage.userInput()[0], account);
                } catch (error) {
                    SetValue(loginPage.userInput()[1], account);
                }
            }),
            delay(Math.floor(Math.random() * (5000 - 2000)) + 2000),
            tap(() => {
                try {
                    SetValue(loginPage.pwdInput()[0], pwd);
                } catch (error) {
                    SetValue(loginPage.pwdInput()[1], pwd);
                }
            }),
            delay(Math.floor(Math.random() * (3000 - 1000)) + 1000),
            tap(() => {
                try {
                    loginPage.submitBtn()[0].click();
                } catch (error) {
                    loginPage.submitBtn()[1].click();
                }
            }),
            catchError(err => {
                ipcRenderer.send("log", "自动登录->" + err.toString());
            })
        )
        .subscribe()
});

// 登录成功后
ipcRenderer.on('login-success', (event) => {
    //点击竞争
    interval(1000)
        .pipe(
            filter(() => mainPage.navigationBar().length > 0),
            take(1),
            delay(10000),
            // 点击竞争
            tap(() => { !isCompetitionPage() && mainPage.competitionBtn().click() }),
            delay(3000),
            // 点击监控商品
            tap(() => { !isMonitorPage() && monitorPage.monitorBtn().click() }),
            delay(3000),
            tap(() => monitorPage.paginationSel().click()),
            delay(3000),
            // 点击分页参数
            tap(() => { monitorPage.paginationSize().click() }),
            catchError(err => {
                ipcRenderer.send("log", "登录成功后->" + err.toString());
            })
        )
        .subscribe();
});

// 添加竞品
ipcRenderer.on("add-monitor", (event, data) => {

    data.id = data.id.split(",");

    timer(0, 10000)
        .pipe(
            take(data.id.length),
            tap(() => {
                // 去除缓存
                for (var i = 0; i < localStorage.length; i++) {
                    var key = localStorage.key(i);
                    if (key.includes("getCoreIndexes") || key.includes("getCoreTrend")) {
                        localStorage.removeItem(key);
                    }
                }
            }),
            mergeMap((item) => {
                return interval(1000)
                    .pipe(
                        filter(() => configurationPage.configuration()),
                        tap(() => {
                            // 如果不在竞争配置
                            !isConfigurationPage() && configurationPage.configurationBtn().click()
                        }),
                        filter(() => configurationPage.goodsBtn()),
                        tap(() => {
                            // 如果不在竞争商品页
                            !hasClass(configurationPage.goodsBtn(), "oui-tab-switch-item-active") && configurationPage.goodsBtn().click()
                        }),
                        filter(() => configurationPage.search() && configurationPage.addBtn()),
                        tap(() => {
                            // 如果没有弹框被隐藏
                            if (!configurationPage.popup() || hasClass(configurationPage.popup(), ".ant-dropdown-hidden")) {
                                configurationPage.addBtn().click();
                            }
                        }),
                        filter(() => configurationPage.del()),
                        take(1),
                        tap(() => {
                            setLog({ flag: 1, msg: `正在获取竞品${data.id[item]}的数据` });
                            configurationPage.delIcon().click()
                        }),
                        delay(1000),
                        tap(() => {
                            configurationPage.input().focus()
                        }),
                        delay(500),
                        tap(() => {
                            SetValue(configurationPage.input(), data.id[item]);
                        }),
                        delay(1000),
                        tap(() => {
                            !configurationPage.getingData() && setLog({ flag: (data.id.length === (item + 1) ? 2 : 1), msg: `竞品${data.id[item]}不存在` })
                        }),
                        filter(() => configurationPage.getingData()),
                        tap(() => {
                            configurationPage.getingData().click();
                            setLog({ "flag": (data.id.length === (item + 1) ? 0 : 1), "msg": `获取竞品${data.id[item]}成功` })
                        }),
                        catchError(err => {
                            setLog({ flag: 2, msg: "竞品获取失败，请重试" });
                            ipcRenderer.send("log", "添加竞品" + err.toString());
                        })
                    )
            })
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
            tap(() => {
                // 去除缓存
                for (var i = 0; i < localStorage.length; i++) {
                    var key = localStorage.key(i);
                    if (key.includes("getKeywords") || key.includes("getFlowSource") || key.includes("getSourceTrend")) {
                        localStorage.removeItem(key);
                    }
                }
            }),
            delay(1000),
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
                document.querySelector("html").scrollTop = "2000";
            }),
            delay(1000),
            // 点击下拉
            tap(() => {
                analysisPage.storeSourceSel().click();
            }),
            delay(1000),
            // 点击无线端
            tap(() => {
                setLog({ flag: 1, msg: "成交关键词信息获取成功" });
                analysisPage.storeSourceWireless().click();
                setLog({ flag: 1, msg: "正在获取流量数据，数据量较大，请稍后。。。" });
            }),
            delay(1000),
            mergeMap(() => {
                var _a = analysisPage.paginationNum()
                return timer(0, 35000)
                    .pipe(
                        take(_a.length),
                        tap((i) => {
                            analysisPage.paginationNum()[i].click()
                        })
                    )
            }),
            mergeMap((j) => {
                var _a = analysisPage.paginationNum();
                var _b = analysisPage.storeSourceTd();
                return timer(0, 1000)
                    .pipe(
                        take(_b.length),
                        delay(500),
                        filter((i) => (i + 1) % 3 === 0),
                        // 点击趋势
                        tap((i) => {
                            _b[i].querySelector("a").click();
                        }),
                        last(),
                        filter(() => j === (_a.length - 1))
                    );
            }),
            delay(1000),
            tap(() => {
                analysisPage.paginationNum()[0].click();
            }),
            delay(1000),
            tap(() => {
                analysisPage.storeSourcePc().click();
            }),
            delay(1000),
            mergeMap(() => {
                var _a = analysisPage.paginationNum()
                return timer(0, 35000)
                    .pipe(
                        take(_a.length),
                        tap((i) => {
                            analysisPage.paginationNum()[i].click()
                        })
                    )
            }),
            mergeMap((j) => {
                var _a = analysisPage.paginationNum();
                var _b = analysisPage.storeSourceTd();
                return timer(0, 1000)
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
                            j === (_a.length - 1) && setLog({ flag: 0, msg: "流量数获取成功" });
                        }),
                        filter(() => j === (_a.length - 1)),
                        tap(() => {
                            analysisPage.closeBtn().click();
                        })
                    );
            }),
            catchError(err => {
                setLog({ flag: 2, msg: "竞品获取失败，请重试" });
                ipcRenderer.send("log", "自动登录->" + err.toString());
            })
        )
        .subscribe();
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
                            //其他的错误处理逻辑
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