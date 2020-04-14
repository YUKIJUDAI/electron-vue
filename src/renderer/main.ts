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
import { registerMicroApps, start } from "qiankun";

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));

Vue.use(Electron);
Vue.use(ElementUI, { size: "small", zIndex: 3000 });

Vue.prototype.$echarts = echarts;
Vue.prototype.$http = http;
Vue.prototype.$fetch = fetch;

Vue.config.productionTip = false;

const errorHandler = error => {
    ipcRenderer.send("log", error.toString());
};

Vue.prototype.$log = errorHandler;
Vue.config.errorHandler = errorHandler;

var app = null;

function genActiveRule(routerPrefix) {
    return location => location.pathname.startsWith(routerPrefix);
}

function render(appContent?) {
    if (!app) {
        app = new Vue({
            el: "#app",
            router,
            store,
            data() {
                return {
                    content: appContent.appContent
                };
            },
            render(h) {
                return h(App, {
                    props: {
                        content: this.content
                    }
                });
            }
        });
    } else {
        app.content = appContent.appContent;
    }
}

render({});

registerMicroApps([
    {
        name: "vue-test",
        entry: "//localhost:3000",
        render,
        activeRule: genActiveRule("/vue-test")
    }
]);
