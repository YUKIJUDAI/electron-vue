import Vue from 'vue';
import Vuex from 'vuex';
const { remote } = require('electron');

import { createPersistedState } from 'vuex-electron';

Vue.use(Vuex)

const state = {
    userInfo: { phone: "", token: "" },
    taobaoInfo: {}
}

const mutations = {
    SET_USER_INFO(state, obj) {
        remote.getGlobal('userInfo').token = obj.token;
        remote.getGlobal('userInfo').phone = obj.phone;
        state.userInfo = obj;
    },
    SET_TAOBAO_INFO(state, obj) {

    },
    INCREMENT_MAIN_COUNTER(state) {

    }
}

const actions = {
    set_user_info({ commit }, obj) {
        console.warn("success");
        commit("SET_USER_INFO", obj);
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    plugins: [
        createPersistedState()
    ],
    strict: process.env.NODE_ENV !== 'production'
})
