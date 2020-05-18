const config = require("@@/package.json");

export default {
    uploadUrl: "http://127.0.0.1:3000/public",
    baseUrl: "http://mars-api.lethink.net",
    heisouBaseUrl: "http://mars-hesso.lethink.net",
    qnUrl: "http://file.bsearch.lethink.net/",
    wsUrl: "ws://47.99.101.142:2046/",
    proxyid: config.build.publish[0].url.split("/")[config.build.publish[0].url.split("/").length - 1],
    version_num: config.version,
};
