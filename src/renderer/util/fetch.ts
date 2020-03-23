const axios = require("axios");
const qs = require("qs");

const { baseUrl, proxyid } = require("@/config/config");
import store from "@/store";

// 创建新http - 其他

const fetch = axios.create({
    timeout: 10000,
    baseURL: baseUrl,
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
});

// 请求发送前数据处理
fetch.interceptors.request.use(
    config => {
        // 添加proxyid
        config.headers.proxyid = proxyid;

        // 添加token
        const token = store.state.userInfo.token;
        token && (config.headers.token = token);

        if (config.headers["Content-Type"] === "application/x-www-form-urlencoded") {
            if (!config.data) config.data = {};
            config.data = qs.stringify(config.data);
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

// 请求发送后数据处理
fetch.interceptors.response.use(
    res => {
        return res.data;
    },
    error => {
        return Promise.reject(error);
    }
);

export default fetch;
