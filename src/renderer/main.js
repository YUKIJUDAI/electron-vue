import Vue from 'vue';
import http from '@/util/http';
import ElementUI from 'element-ui';
import '@/assets/theme/index.css';
import '@/assets/iconfont/iconfont.css';

import App from './App';
import router from './router';
import store from './store';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = http;
Vue.config.productionTip = false;

Vue.use(ElementUI, { size: 'small', zIndex: 3000 });

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: '<App/>'
}).$mount('#app')
