import Vue from "vue";
import echarts from "echarts";
import ElementUI from "element-ui";

import http from "@/util/http";
import "@/assets/theme/index.css";
// import '@/assets/iconfont/iconfont.css';

import App from "./App.vue";
import router from "./router";
import store from "./store";

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.prototype.$http = http;
Vue.config.productionTip = false;

Vue.use(ElementUI, { size: "small", zIndex: 3000 });
Vue.prototype.$echarts = echarts;

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: "<App/>"
}).$mount("#app");
