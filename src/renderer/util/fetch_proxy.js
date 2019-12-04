/**
 * xhr_proxy.js
 * 通过劫持原生fetch实现对页面ajax请求的监听
 */

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

/**
 * 增加一个handler
 * 当xhr.readyState == 4时，回调handler，handler中，可以通过xhr.responseText获取请求返回内容
 */
let addHandler = function (handler) {
    initProxy();
    gHandlerList.push(handler);
}
/**
 * 移除指定的handler
 */
let removeHandler = function (handler) {
    gHandlerList = gHandlerList.filter(h => h !== handler);
}
exports.addHandler = addHandler;
exports.removeHandler = removeHandler;