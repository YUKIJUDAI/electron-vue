const config = require("@@/package.json");

export default {
    baseUrl: "",
    heisouBaseUrl: "",
    qnUrl: "",
    wsUrl: "",
    proxyid: config.build.publish[0].url.split("/")[config.build.publish[0].url.split("/").length - 1],
    version_num: config.version,
};
