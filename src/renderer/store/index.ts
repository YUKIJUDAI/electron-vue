import Vue from "vue";
import Vuex from "vuex";
const { remote } = require("electron");

import { createPersistedState } from "vuex-electron";

Vue.use(Vuex);

const state = {
    userInfo: { user_phone: "", token: "", user_id: "", vip_level: 0 }, // 用户信息
    taobaoInfo: {}, // 淘宝信息
    menuInfo: [] // 菜单信息
};

const mutations = {
    SET_USER_INFO(state, obj) {
        state.userInfo = Object.assign(obj, state.userInfo);
    },
    SET_MENU_INFO(state, arr) {
        state.menuInfo = arr;
    }
};

const actions = {
    set_user_info({ commit }, obj) {
        commit("SET_USER_INFO", obj);
    },
    set_menu_info({ commit }, arr) {
        commit("SET_MENU_INFO", arr);
    }
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    plugins: [createPersistedState()],
    strict: process.env.NODE_ENV !== "production"
});
