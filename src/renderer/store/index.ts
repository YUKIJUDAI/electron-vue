import Vue from "vue";
import Vuex from "vuex";

import { createPersistedState } from "vuex-electron";

Vue.use(Vuex);

const state = {
    serviceInfo: {}, //配置信息
    userInfo: {}, // 用户信息
    taobaoInfo: {}, // 淘宝信息
    menuInfo: [], // 菜单信息
    authorityInfo: [], //权限信息
};

const mutations = {
    SET_USER_INFO(state, obj) {
        state.userInfo = obj;
    },
    SET_MENU_INFO(state, arr) {
        state.menuInfo = arr;
    },
    SET_AUTHORITY_INFO(state, o) {
        state.authorityInfo = o;
    },
    SET_SERVICE_INFO(state, o) {
        state.serviceInfo = o;
    },
};

const actions = {
    set_user_info({ commit, state }, obj) {
        if (JSON.stringify(obj) === "{}") {
            commit("SET_USER_INFO", {});
        } else {
            commit("SET_USER_INFO", Object.assign(state.userInfo, obj));
        }
    },
    set_menu_info({ commit }, arr) {
        commit("SET_MENU_INFO", arr);
    },
    set_authority_info({ commit }, o) {
        commit("SET_AUTHORITY_INFO", o);
    },
    set_service_info({ commit }, o) {
        commit("SET_SERVICE_INFO", o);
    },
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    plugins: [createPersistedState()],
    strict: process.env.NODE_ENV !== "production",
});
