<template>
    <div class="main">
        <heisou-title ref="heisouTitle" :serviceInfo="serviceInfo"></heisou-title>
        <div class="body clearfix">
            <div class="main-left">
                <div class="main-left-1">
                    <img src="~@/assets/img/level-0.png" class="identity-tag" v-show="userInfo.vip_level === 0">
                    <img src="~@/assets/img/level-1.png" class="identity-tag" v-show="userInfo.vip_level === 1">
                    <img src="~@/assets/img/level-2.png" class="identity-tag" v-show="userInfo.vip_level === 2">
                    <img src="~@/assets/img/admin.png" class="avatar">
                    <router-link to="/geren/personCenter" tag="div" class="main-login" v-if="isLogin">{{userInfo.user_phone}}</router-link>
                    <div class="main-login" @click="goLogin" v-else>请登录</div>
                </div>
                <div class="main-left-ul" v-if="isLogin">
                    <ul>
                        <li>会员状态：<span>{{["游客","普通会员","超级会员"][userInfo.vip_level]}}</span>
                            <router-link to="/geren/vip" tag="span">{{["开通","升级","续费"][userInfo.vip_level]}}</router-link>
                        </li>
                        <li>积分余额：<span>{{userInfo.gold}}</span>
                            <router-link to="/geren/goldCoinDetails" tag="span">充值</router-link>
                        </li>
                        <li>担保资金：<span>0</span></li>
                    </ul>
                </div>
                <div class="main-left-2 clearfix">
                    <el-popover placement="top" trigger="hover" :offset="44">
                        <div class="_hover">
                            <p>{{bossInfo.boss_name}}</p>
                            <ul>
                                <!-- <li>
                                    <i class="iconfont icon-shouji1"></i>
                                    手机：<span>{{bossInfo.boss_phone}}</span>
                                </li> -->
                                <li>
                                    <i class="iconfont icon-QQ"></i>
                                    Q Q：<span>{{bossInfo.boss_qq}}</span>
                                    <span @click="openQQ(bossInfo.boss_qq)">立即咨询</span>
                                </li>
                                <li>
                                    <i class="iconfont icon-weixin"></i>
                                    微信：<span>{{bossInfo.boss_wechat}}</span>
                                </li>
                            </ul>
                            <img :src="bossInfo.boss_qr_code">
                        </div>
                        <div class="left-2-left" slot="reference">客户经理</div>
                    </el-popover>
                    <el-popover placement="top" trigger="hover" :offset="-43">
                        <div class="_hover">
                            <p>{{serviceInfo.kefu_name}}</p>
                            <ul>
                                <!-- <li>
                                    <i class="iconfont icon-shouji1"></i>
                                    手机：<span>{{serviceInfo.kefu_phone}}</span>
                                </li> -->
                                <li>
                                    <i class="iconfont icon-QQ"></i>
                                    Q Q：<span>{{serviceInfo.kefu_qq}}</span>
                                    <span @click="openQQ(serviceInfo.kefu_qq)">立即咨询</span>
                                </li>
                                <li>
                                    <i class="iconfont icon-weixin"></i>
                                    微信：<span>{{serviceInfo.kefu_wechat}}</span>
                                </li>
                            </ul>
                            <img :src="serviceInfo.kefu_qr_code">
                            <div class="getvip">
                                【
                                <p>有问题？扫码加微信</br>还可以<span>领取7天VIP</span></p>
                                】
                            </div>
                        </div>
                        <div class="left-2-right" slot="reference">售后经理</div>
                    </el-popover>
                </div>
                <div class="main-left-3">
                    <ul>
                        <router-link tag="li" class="clearfix" to="/" :class="{active:$route.path === '/'}">
                            <i class="iconfont icon-shouye"></i>
                            <span>首页</span>
                        </router-link>
                        <li class="clearfix" v-for="(item,i) in menuInfo" :key="i" :class="{active:$route.path.includes(item.route) && item.route !==''}" @click="open(item.route,item.is_uphold)">
                            <img :src="item.icon_y" v-if="$route.path.includes(item.route) && item.route !==''">
                            <img :src="item.icon_h" v-else>
                            <span>{{item.copy_title}}</span>
                        </li>
                        <li class="clearfix" :class="{active:$route.path.includes('geren')}" @click="open('geren/personCenter',false)">
                            <i class="iconfont icon-shouye"></i>
                            <span>个人中心</span>
                        </li>
                        <!-- <router-link tag="li" class="clearfix" to="/vue-test">
                            <i class="iconfont icon-shouye"></i>
                            <span>测试</span>
                        </router-link> -->
                    </ul>
                    <!-- <div class="page" @click="next">
                        <div class="arrow arrow-1"></div>
                        <div class="arrow arrow-2"></div>
                    </div> -->
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
import { sendXhrData, message, routerTo, loadURL, openUrl } from "@/util/electronFun";

export default {
    components: { heisouTitle },
    data() {
        return {
            bossInfo: {}
        }
    },
    computed: {
        isLogin() {
            return !isEmpty(this.userInfo.token);
        },
        userInfo() {
            return this.$store.state.userInfo;
        },
        menuInfo() {
            return this.$store.state.menuInfo.filter(item => item.is_nav === 1);
        },
        serviceInfo() {
            return this.$store.state.serviceInfo;
        }
    },
    mounted() {
        // 获取xhr信息后处理
        sendXhrData();
        // 输出更新信息
        message();
        // 页面跳转跳转
        routerTo();
        // 页面载入
        loadURL();

        this.getUserInfo();
        this.getServiceCode();
        this.getBossCode();
    },
    methods: {
        async getServiceCode() {
            var res = await this.$fetch.post("/index/getServiceCode");
            0 === res.code &&
                (this.$store.dispatch("set_service_info", res.data), document.body.style.setProperty('--themeColor', res.data.tool_main_color));
        },
        async getBossCode() {
            var res = await this.$fetch.post("/index/getBossCode");
            0 === res.code && (this.bossInfo = res.data);
        },
        async getUserInfo() {
            if (!this.isLogin) {
                return;
            }
            var res = await this.$fetch.post("/user/getUserInfo");
            0 === res.code && this.$store.dispatch("set_user_info", res.data);
        },
        openQQ(qq) {
            var url = "http://wpa.qq.com/msgrd?v=3&uin=" + qq + "&menu=yes";
            openUrl(url);
        },
        // 打开
        open(url, is_uphold) {
            if (!this.isLogin) {
                this.$refs.heisouTitle.goLogin();
                return;
            }
            if (Boolean(is_uphold)) {
                this.$refs.heisouTitle.goUphold();
            } else {
                this.$router.push("/" + url);
            }
        },
        goLogin() {
            this.$refs.heisouTitle.goLogin()
        },
        goRegistered() {
            this.$refs.heisouTitle.goRegistered()
        },
        next() {
            this.page < this.menuInfo.length - 1 ? this.page++ : this.page = 0;
        }
    },
    watch: {
        isLogin(val) {
            this.getUserInfo();
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
                padding: 0 10px 10px 10px;
                font-size: 12px;
                color: #333;
                span {
                    color: var(--themeColor);
                    &:nth-child(2) {
                        padding-left: 5px;
                        cursor: pointer;
                        text-decoration: underline;
                    }
                }
                li {
                    height: 24px;
                }
            }
            .main-left-2 {
                .left-2-left {
                    .fl;
                    background: var(--themeColor);
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
                    color: var(--themeColor);
                    font-size: 14px;
                    .tc;
                    border: 1px solid var(--themeColor);
                    width: 49%;
                    cursor: pointer;
                }
            }
            .main-left-3 {
                margin-top: 10px;
                li {
                    height: 32px;
                    background: #fff;
                    cursor: pointer;
                    color: #666;
                    &:hover {
                        background: rgba(241, 245, 251, 1);
                    }
                    i,
                    img {
                        display: inline-block;
                        font-size: 18px;
                        margin-top: 8px;
                        margin-left: 33px;
                        vertical-align: -2px;
                    }
                    img {
                        vertical-align: -4px;
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
                        color: var(--themeColor);
                    }
                    span {
                        color: var(--themeColor);
                    }
                }
            }
        }
        .main-right {
            padding-top: 15px;
            min-height: calc(~"87vh - 15px");
            margin-left: 208px;
            margin-right: 20px;
            margin-bottom: 20px;
            background: rgba(255, 255, 255, 1);
            box-shadow: -4px 0px 11px 1px rgba(0, 32, 95, 0.1);
        }
    }
    .page {
        margin-top: 10px;
        height: 40px;
        position: relative;
        cursor: pointer;
        .arrow {
            position: absolute;
            left: 40%;
            top: 30%;
        }

        .arrow-1 {
            -webkit-animation: arrow-movement 2s ease-in-out infinite;
            animation: arrow-movement 2s ease-in-out infinite;
        }

        .arrow-2 {
            -webkit-animation: arrow-movement 2s 1s ease-in-out infinite;
            animation: arrow-movement 2s 1s ease-in-out infinite;
        }

        .arrow:before,
        .arrow:after {
            background: #ccc;
            content: "";
            display: block;
            height: 3px;
            position: absolute;
            top: 0;
            left: 0;
            width: 10px;
        }

        .arrow:before {
            -webkit-transform: rotate(45deg) translateX(-10%);
            transform: rotate(45deg) translateX(-10%);
            -webkit-transform-origin: top left;
            transform-origin: top left;
        }

        .arrow:after {
            -webkit-transform: rotate(-45deg) translateX(10%);
            transform: rotate(-45deg) translateX(10%);
            -webkit-transform-origin: top right;
            transform-origin: top right;
        }

        @-webkit-keyframes arrow-movement {
            0% {
                opacity: 0;
                top: 0%;
            }
            70% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }

        @keyframes arrow-movement {
            0% {
                opacity: 0;
                top: 0%;
            }
            70% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }
    }
}
</style>
<style lang="less">
@import url("~@/assets/less/commom.less");
.main-container {
    .main-container-navigation {
        margin: 0 20px;
        border-bottom: 1px solid #d5d5d5;
        height: 45px;
    }
    .main-container-navigation-ul {
        .fl;
        li {
            .fl;
            padding-top: 12px;
            padding-bottom: 10px;
            width: 105px;
            .tc;
            cursor: pointer;
            div {
                font-size: 16px;
                border-right: 1px solid #d5d5d5;
            }
        }
        .active {
            border-bottom: 3px solid var(--themeColor);
            div {
                color: var(--themeColor);
            }
        }
    }
    .main-container-navigation-right {
        .fr;
        margin-top: 12px;
        color: var(--themeColor);
        cursor: pointer;
    }
    .main-container-view {
        padding: 20px;
        padding-top: 0;
        margin-top: 15px;
        overflow: hidden;
    }
}
.el-popper[x-placement^="bottom"] {
    margin-top: 0;
}
.el-button--primary {
    background-color: var(--themeColor) !important;
    border-color: var(--themeColor) !important;
}
.el-button--primary.is-plain {
    color: var(--themeColor) !important;
    background: rgb(255, 240, 230) !important;
    border-color: rgb(255, 195, 153) !important;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: var(--themeColor) !important;
}
.el-button--text {
    color: var(--themeColor) !important;
}
._hover {
    margin: -12px;
    padding: 12px;
    width: 170px;
    font-size: 12px;
    background: #fff;
    i {
        vertical-align: -1px;
    }
    p {
        font-size: 14px;
        color: #333;
    }
    .red {
        .tc;
        font-size: 14px;
        color: red;
    }
    ul {
        margin-top: 12px;
        li {
            height: 16px;
            line-height: 16px;
            margin-bottom: 7px;
            color: #999;
        }
        span {
            color: #333;
            &:nth-child(3) {
                cursor: pointer;
                color: var(--themeColor);
                font-size: 11px;
                text-decoration: underline;
            }
        }
    }
    img {
        margin: 15px auto;
        width: 84px;
        height: 84px;
        display: block;
    }
    .getvip {
        display: flex;
        justify-content:center;
        p {
            font-size: 12px;
            color: #666;
            padding: 0 5px;
            margin-top: -10px;
        }
        span {
            color: var(--themeColor);
        }
    }
}
.headStyle {
    color: var(--themeColor);
    background-color: rgba(255, 105, 2, 0.08) !important;
}
.headStyle2 {
    background-color: var(--themeColor) !important;
    border-color: var(--themeColor);
    color: #fff;
}
</style>
