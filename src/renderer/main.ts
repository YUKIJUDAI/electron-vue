import Vue from "vue";
import echarts from "echarts";
import ElementUI from "element-ui";
import Electron from "vue-electron";
import { Subject } from "rxjs";
import { registerMicroApps, start } from "qiankun";

import http from "@/util/http";
import fetch from "@/util/fetch";
import * as electronFun from "@/util/electronFun";
import "@/assets/theme/index.css";
import "@/assets/iconfont/iconfont.css";

import App from "./App.vue";
import router from "./router";
import store from "./store";

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));

Vue.use(Electron);
Vue.use(ElementUI, { size: "small", zIndex: 3000 });

const errorHandler = (error) => {
    electronFun.log(error.toString());
};

Vue.prototype.$echarts = echarts;
Vue.prototype.$http = http;
Vue.prototype.$fetch = fetch;
Vue.prototype.$log = errorHandler;

Vue.config.productionTip = false;
Vue.config.errorHandler = errorHandler;

Vue.filter("hasHttp", function(value) {
    return value && value.includes("http") ? value : "https:" + value;
});

var subject = new Subject();

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: "<App/>",
}).$mount("#app");

registerMicroApps([
    {
        name: "vue app",
        entry: "//localhost:3000",
        container: "#myApp",
        activeRule: "/#/vue-test",
        props: { electronFun, data: store.state, subject },
    },
]);

start();
