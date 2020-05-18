const config = require("@@/package.json");

export default {
    baseUrl: "http://mars-api.huoxingqingbao.com",
    heisouBaseUrl: "http://mars-hesso.huoxingqingbao.com",
    qnUrl: "http://file.bsearch.lethink.net/",
    wsUrl: "ws://47.99.101.142:2046/",
    proxyid: config.build.publish[0].url.split("/")[config.build.publish[0].url.split("/").length - 1],
    version_num: config.version,
};
