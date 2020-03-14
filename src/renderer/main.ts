import Vue from "vue";
import echarts from "echarts";
import ElementUI from "element-ui";
import Electron from "vue-electron";
const { ipcRenderer } = require("electron");

import http from "@/util/http";
import fetch from "@/util/fetch";
import "@/assets/theme/index.css";
import "@/assets/iconfont/iconfont.css";

import App from "./App.vue";
import router from "./router";
import store from "./store";

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));

Vue.use(Electron);
Vue.use(ElementUI, { size: "small", zIndex: 3000 });

Vue.prototype.$echarts = echarts;
Vue.prototype.$http = http;
Vue.prototype.$fetch = fetch;
Vue.prototype.$log = function(txt) {
    ipcRenderer.send("log", txt);
};

Vue.config.productionTip = false;
Vue.config.errorHandler = function(err, vm, info) {
    ipcRenderer.send("log", err);
};

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: "<App/>"
}).$mount("#app");
