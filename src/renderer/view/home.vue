<template>
    <div class="main">
        <heisou-title ref="heisouTitle"></heisou-title>
        <div class="body clearfix">
            <div class="main-left">
                <div class="main-left-1">
                    <img src="~@/assets/img/level-1.png" class="identity-tag">
                    <img src="~@/assets/img/admin.png" class="avatar">
                    <div class="main-login" v-if="isLogin">{{userPhone}}</div>
                    <div class="main-login" @click="goLogin" v-else>请登录</div>
                </div>
                <div class="main-left-ul">
                    <ul>
                        <li>金币：<span>3000</span></li>
                    </ul>
                </div>
                <div class="main-left-2 clearfix">
                    <div class="left-2-left" v-if="isLogin">充值</div>
                    <div class="left-2-left" @click="goRegistered" v-else>立即注册</div>
                    <div class="left-2-right">联系客服</div>
                </div>
                <div class="main-left-3">
                    <ul>
                        <router-link to="/heisou/monitor" class="clearfix" tag="li" :class="{active:$route.meta.menuIndex === 0}">
                            <i class="iconfont icon-tubiao"></i>
                            <span>极速黑搜</span>
                        </router-link>
                        <router-link to="/heihao/search" class="clearfix" tag="li" :class="{active:$route.meta.menuIndex === 1}">
                            <i class="iconfont icon-sousuo1"></i>
                            <span>黑号查询</span>
                        </router-link>
                        <router-link to="/liuliang/flow" class="clearfix" tag="li" :class="{active:$route.meta.menuIndex === 2}">
                            <i class="iconfont icon-taobao"></i>
                            <span>淘宝流量</span>
                        </router-link>
                        <router-link to="/zhitongche" class="clearfix" tag="li" :class="{active:$route.meta.menuIndex === 3}">
                            <i class="iconfont icon-taobao"></i>
                            <span>直通车诊断</span>
                        </router-link>
                        <router-link to="/budan/securitySupplement" class="clearfix" tag="li" :class="{active:$route.meta.menuIndex === 4}">
                            <i class="iconfont icon-anquan"></i>
                            <span>安全补单</span>
                        </router-link>
                        <router-link to="/ganhuo/realstuffCenter" class="clearfix" tag="li" :class="{active:$route.meta.menuIndex === 5}">
                            <i class="iconfont icon-shipin"></i>
                            <span>干活分享</span>
                        </router-link>
                    </ul>
                </div>
            </div>
            <div class="main-right">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import heisouTitle from "@/components/others/title";
import { isEmpty } from "@/util/util";

export default {
    components: { heisouTitle },
    computed: {
        isLogin() {
            return !isEmpty(this.$store.state.userInfo.token);
        },
        userPhone() {
            return this.$store.state.userInfo.phone;
        }
    },
    methods: {
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
                li {
                    .l-h(46px);
                    background: #fff;
                    margin-top: 10px;
                    cursor: pointer;
                    &:hover {
                        background: rgba(241, 245, 251, 1);
                    }
                    i {
                        font-size: 18px;
                        margin-top: 13px;
                        margin-left: 27px;
                        vertical-align: -2px;
                    }
                    .icon-taobao {
                        font-size: 20px;
                    }
                    span {
                        font-size: 15px;
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
