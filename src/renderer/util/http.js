const axios = require("axios");
const qs = require("qs");
const { remote } = require('electron');

const { baseUrl } = require("@/config/config");
import store from "@/store";

// 创建新http

const http = axios.create({
    timeout: 10000,
    baseURL: baseUrl,
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
});


// 请求发送前数据处理
http.interceptors.request.use(
    config => {
        // 添加token
        const token = store.state.userInfo.token;
        token && (config.headers.token = token);

        // 添加tbInfo
        const tbInfo = remote.getGlobal("tbInfo");

        if (config.headers["Content-Type"] === "application/x-www-form-urlencoded") {
            config.data.sys = config.data.hasOwnProperty("sys") ? JSON.stringify(Object.assign({ ...tbInfo }, JSON.parse(config.data.sys))) : JSON.stringify({ ...tbInfo });
            config.data = qs.stringify(config.data);
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

// 请求发送后数据处理
http.interceptors.response.use(
    res => {
        return res.data;
    },
    error => {
        return Promise.reject(error);
    }
);

export default http;
