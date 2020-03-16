<template>
    <div class="main">
        <heisou-title ref="heisouTitle"></heisou-title>
        <div class="body clearfix">
            <div class="main-left">
                <div class="main-left-1">
                    <img src="~@/assets/img/level-0.png" class="identity-tag" v-show="viplevel === 0">
                    <img src="~@/assets/img/level-1.png" class="identity-tag" v-show="viplevel === 1">
                    <img src="~@/assets/img/admin.png" class="avatar">
                    <router-link to="/geren/personCenter" tag="div" class="main-login" v-if="isLogin">{{userPhone}}</router-link>
                    <div class="main-login" @click="goLogin" v-else>请登录</div>
                </div>
                <div class="main-left-ul" v-if="isLogin">
                    <ul>
                        <li>积分余额：<span>3000</span></li>
                        <!-- <li>担保资金：<span>3000</span></li> -->
                    </ul>
                </div>
                <div class="main-left-2 clearfix">
                    <div class="left-2-left" v-if="isLogin">充值</div>
                    <div class="left-2-left" @click="goRegistered" v-else>立即注册</div>
                    <div class="left-2-right">联系客服</div>
                </div>
                <div class="main-left-3">
                    <ul>
                        <li class="clearfix" v-for="(item,i) in menuInfo" :key="i" :class="{active:$route.path === item.route}" @click="open(item.route)">
                            <i :class="['iconfont',item.iconclass]"></i>
                            <span>{{item.function_name}}</span>
                        </li>
                        <router-link to="/geren/personCenter" class="clearfix" :class="{active:$route.path === '/geren/personCenter'}" tag="li">
                            <i class="iconfont icon-tubiao"></i>
                            <span>个人中心</span>
                        </router-link>
                    </ul>
                </div>
            </div>
            <div class="main-right">
                <router-view @goLogin="goLogin" />
            </div>
        </div>
    </div>
</template>

<script>
import heisouTitle from "@/components/others/title";
import { isEmpty } from "@/util/util";
const { ipcRenderer, remote } = require("electron");
import factory from "@/util/factory";

export default {
    components: { heisouTitle },
    computed: {
        isLogin() {
            return !isEmpty(this.$store.state.userInfo.token);
        },
        userPhone() {
            return this.$store.state.userInfo.user_phone;
        },
        viplevel() {
            return this.$store.state.userInfo.vip_level;
        },
        menuInfo() {
            return this.$store.state.menuInfo || [];
        }
    },
    mounted() {
        // 获取xhr信息后处理
        ipcRenderer.on('send-xhr-data', (event, type, params, data) => {
            if (factory.obj[type]) {
                typeof factory.obj[type].callback === "function" && factory.obj[type].callback(params, data);
            }
        });
        // 页面跳转跳转
        ipcRenderer.on('router-to', (event, router) => {
            this.$router.push(router);
        });
    },
    methods: {
        // 打开
        open(url) {
            if (!this.isLogin) {
                this.$refs.heisouTitle.goLogin();
            } else {
                this.$router.push(url);
            }
        },
        goLogin() {
            this.$refs.heisouTitle.goLogin()
        },
        goRegistered() {
            this.$refs.heisouTitle.goRegistered()
        }
    }
}
</script>

<style scoped lang="less">
@import url("~@/assets/less/commom.less");
.main {
    width: 100vw;
    overflow: hidden;
    .body {
        margin-top: 60px;
        height: calc(~"100vh - 60px - 18px");
        overflow-y: auto;
        .bg-c(#f5f5f5);
        padding-top: 18px;
        .main-left {
            width: 175px;
            height: 87vh;
            margin-left: 20px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(238, 238, 238, 1);
            box-shadow: -4px 0px 11px 1px rgba(0, 32, 95, 0.1);
            .fl;
            .main-left-1 {
                .rel;
                height: 160px;
                .identity-tag {
                    .db;
                    .abs;
                    top: 0;
                    left: 0;
                }
                .avatar {
                    .bc;
                    .db;
                    padding-top: 40px;
                    .wh(82px);
                }
                .main-login {
                    .abs;
                    top: 110px;
                    left: 0;
                    right: 0;
                    .bc;
                    .tc;
                    font-size: 12px;
                    color: #fff;
                    width: 84px;
                    .l-h(22px);
                    background: rgba(66, 187, 223, 1);
                    border-radius: 11px;
                    cursor: pointer;
                }
            }
            .main-left-ul {
                padding: 0 33px 20px 33px;
                font-size: 12px;
                color: #333;
                span {
                    color: #ff6801;
                }
            }
            .main-left-2 {
                .left-2-left {
                    .fl;
                    background: rgba(255, 105, 2, 1);
                    .l-h(36px);
                    color: #fff;
                    font-size: 14px;
                    .tc;
                    width: 49%;
                    cursor: pointer;
                }
                .left-2-right {
                    .fl;
                    .l-h(34px);
                    font-size: 14px;
                    .tc;
                    border: 1px solid rgba(255, 105, 2, 1);
                    width: 49%;
                    cursor: pointer;
                }
            }
            .main-left-3 {
                margin-top: 10px;
                li {
                    .l-h(34px);
                    background: #fff;
                    cursor: pointer;
                    color: #666;
                    &:hover {
                        background: rgba(241, 245, 251, 1);
                    }
                    i {
                        font-size: 18px;
                        margin-top: 13px;
                        margin-left: 33px;
                        vertical-align: -2px;
                    }
                    span {
                        font-size: 12px;
                        margin-left: 10px;
                        color: #666666;
                    }
                }
                .active {
                    background: rgba(241, 245, 251, 1);
                    i {
                        color: #ff6801;
                    }
                    span {
                        color: #ff6801;
                    }
                }
            }
        }
        .main-right {
            margin-left: 208px;
            margin-right: 20px;
            margin-bottom: 20px;
            background: rgba(255, 255, 255, 1);
            box-shadow: -4px 0px 11px 1px rgba(0, 32, 95, 0.1);
        }
    }
}
</style>
