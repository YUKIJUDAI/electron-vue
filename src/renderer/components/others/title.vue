<template>
    <div class="title">
        <div class="header clearfix" style="-webkit-app-region: drag">
            <router-link class="msg" tag="div" to="/main" style="-webkit-app-region: no-drag">
                <img :src="serviceInfo.logo_white" class="logo" />
                <span class="header-title">{{serviceInfo.name}}<i>v{{version_num}}</i></span>
            </router-link>
            <ul class="clearfix right-button" style="-webkit-app-region: no-drag">
                <li class="min" @click="toMainFn('min')"><i class="icon-min"></i></li>
                <li class="max" @click="toMainFn('max')"><i class="icon-max"></i></li>
                <li class="close" @click="toMainFn('close')"><i class="icon-close"></i></li>
            </ul>
            <ul class="clearfix right-ul" style="-webkit-app-region: no-drag">
                <li class="login" @click="goLogin" v-if="!isLogin"><i class="icon-login"></i>登录</li>
                <li class="registered" @click="goRegistered" v-if="!isLogin"><i class="icon-registered"></i>注册</li>
                <router-link tag="li" to="/geren/personCenter" class="user" v-if="isLogin">{{userPhone}}</router-link>
                <router-link v-if="isLogin" tag="li" to="/tongzhi/announcement" class="message">
                    <img src="~@/assets/icon/notification.png" class="notification" @click="unreadMessage = false">
                    <i class="point" v-show="unreadMessage"></i>
                </router-link>
                <li class="exit" @click="exit" v-if="isLogin">退出</li>
            </ul>
        </div>
        <el-dialog title="欢迎登录" :visible.sync="loginFlag" width="558px" :close-on-click-modal="false">
            <div class="login-dialog">
                <form class="form">
                    <div class="form-input form-input-first">
                        <i class="user"></i>
                        <input type="text" placeholder="请输入用户名" v-model="loginForm.phone">
                    </div>
                    <div class="form-input">
                        <i class="pwd"></i>
                        <input type="password" placeholder="请输入密码" v-model="loginForm.password">
                    </div>
                    <div class="clearfix form-margin">
                        <div class="form-input form-input-code">
                            <i class="code"></i>
                            <input type="text" placeholder="请输入验证码" v-model="loginForm.verify">
                        </div>
                        <div class="code-img">
                            <img :src="baseUrl + '/index/getNoTokenVerify?key=' + key" @click="getKey">
                        </div>
                    </div>
                </form>
                <div class="other clearfix">
                    <span class="forget-pwd" @click="goForget">忘记密码?</span>
                    <span class="registered" @click="goRegistered">免费注册</span>
                </div>
                <div class="submit" @click="login">登录</div>
            </div>
        </el-dialog>
        <el-dialog title="免费注册" :visible.sync="registeredFlag" width="721px" :close-on-click-modal="false">
            <div class="login-dialog">
                <form class="form">
                    <div class="form-input form-input-first">
                        <i class="phone"></i>
                        <input type="text" placeholder="请输入11位注册手机号" v-model="registeredForm.phone">
                    </div>
                    <div class="form-input">
                        <i class="pwd"></i>
                        <input type="password" placeholder="登录密码由6-20位字母和数字组成" v-model="registeredForm.password">
                    </div>
                    <div class="form-input">
                        <i class="invite_code"></i>
                        <input type="text" placeholder="请输入邀请码（选填）" v-model="registeredForm.invite_code">
                    </div>
                    <div class="clearfix form-margin">
                        <div class="form-input form-input-code">
                            <i class="code"></i>
                            <input type="text" placeholder="请输入验证码" v-model="registeredForm.verify">
                        </div>
                        <div class="code-img">
                            <img :src="baseUrl + '/index/getNoTokenVerify?key=' + key" @click="getKey">
                        </div>
                    </div>
                    <div class="clearfix form-margin">
                        <div class="form-input form-input-code">
                            <i class="safe"></i>
                            <input type="text" placeholder="请输入手机验证码" v-model="registeredForm.code">
                        </div>
                        <div class="code-safe" v-if="phoneCodeFlag">{{countdown}}</div>
                        <div class="code-safe" @click="getPhoneCode(1)" v-else>发送验证码</div>
                    </div>
                </form>
                <div class="other clearfix">
                    <span class="registered" @click="goLogin">已有账号？点击登录</span>
                </div>
                <div class="submit" @click="registered">注册</div>
                <div class="protocol clearfix">
                    <input type="checkbox" class="protocol-checkbox" v-model="protocolFlag" />
                    <p>我已阅读并同意接受<span>《服务协议》</span></p>
                </div>
            </div>
        </el-dialog>
        <el-dialog title="新人礼包" :visible.sync="customerServiceFlag" width="558px">
            <div class="customerService">
                <p>恭喜您成功注册，请联系客服领取新人专属会员大礼包</p>
                <img :src="serviceInfo.kefu_qr_code">
            </div>
        </el-dialog>
        <el-dialog title="功能维护中" :visible.sync="upholeFlag" width="400px">
            <div class="uphole">
                <img src="~@/assets/img/uphold.png" alt="">
                <p>该功能维护中，敬请期待...</p>
            </div>
        </el-dialog>
        <el-dialog title="忘记密码" :visible.sync="forgetFlag" width="721px">
            <password v-model="forgetFlag" @goLogin="goLogin" :type="2"></password>
        </el-dialog>
        <el-dialog title="版本更新" :visible.sync="updateFlag" width="558px" class="update" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
            <div class="update-version">
                升级版本：v{{versionData.version_num}}
                <span class="must" v-show="versionData.is_force === 1">强制升级</span>
                <span class="unmust" v-show="versionData.is_force === 0">推荐升级</span>
            </div>
            <div class="update-con" v-html="versionData.remark"></div>
            <div class="update-btn">
                <el-button class="to-update" type="primary" @click="download">立即下载</el-button>
                <el-button class="cancel-update" v-if="versionData.is_force === 1" @click="toMainFn('close')">暂不下载</el-button>
                <el-button class="cancel-update" v-if="versionData.is_force === 0" @click="updateFlag = false">以后再说</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

import { openAd, openUrl, wd } from "@/util/electronFun";
import { fromEvent } from "rxjs";
import { isEmpty, getPhoneCode, isOnline } from "@/util/util";
import password from "@/components/others/password";
import config from "@/config/config";
import factory from "@/util/factory";

export default {
    components: { password },
    props: ["serviceInfo"],
    data() {
        return {
            websock: null,
            unreadMessage: false,

            baseUrl: config.baseUrl,
            // 登录表格
            loginForm: {},
            // 注册表格
            registeredForm: {},
            // 更新信息
            versionData: {},
            version_num: config.version_num,

            upholeFlag: false,
            loginFlag: false,
            registeredFlag: false,
            customerServiceFlag: false,
            forgetFlag: false,
            // 更新弹窗
            updateFlag: false,
            phoneCodeFlag: false,
            // 协议
            protocolFlag: true,
            // 提交flag
            submitFlag: false,
            // 倒计时
            countdown: 60,
            key: ""
        }
    },
    computed: {
        isLogin() {
            return !isEmpty(this.$store.state.userInfo.token);
        },
        userPhone() {
            return this.$store.state.userInfo.user_phone;
        }
    },
    mounted() {
        // 判断在线离线状态
        isOnline();
        // 获取更新
        // ipcRenderer.send("checkForUpdate");

        this.openSocket();
        this.getKey();
        this.getAppVersion();
    },
    methods: {
        // 下载
        download() {
            openUrl(this.versionData.file);
        },
        // 打开socket
        openSocket() {
            if (!this.isLogin) return;
            this.websock = new WebSocket(config.wsUrl);
            this.websock.onopen = () => {
                this.websock.send(this.$store.state.userInfo.user_id);
            }
            this.websock.onerror = () => {
                this.openSocket();
            };
            this.websock.onmessage = (e) => {
                const redata = JSON.parse(e.data);
                if (redata.type === 1 || redata.type === 3) {
                    this.unreadMessage = true;
                } else if (redata.type == 2) {
                    openAd(redata.ads_id);
                }
            };
        },
        // 关闭socket
        closeSocket() {
            this.websock && this.websock.close();
        },
        // 随机key
        getKey() {
            this.key = new Date().getTime() + "" + (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);
        },
        // 获取版本信息
        async getAppVersion() {
            var res = await this.$fetch.post("/index/getAppVersion", { version_num: config.version_num });
            if (0 === res.code) {
                this.updateFlag = true;
                this.versionData = res.data;
            } else if (7000 === res.code) {
                this.updateFlag = false;
            }
        },
        // 维护页面
        goUphold() {
            this.upholeFlag = true;
        },
        // 获取短信
        getPhoneCode(type) {
            if (!this.registeredForm.phone) {
                this.$message.error("请先输入手机号");
                return;
            } else if (!this.registeredForm.verify) {
                this.$message.error("请先填写图形验证码");
                return;
            }
            getPhoneCode(type, this.registeredForm.phone, this.registeredForm.verify, this);
        },
        // 去注册
        goRegistered() {
            this.loginFlag = false;
            this.$nextTick(() => {
                this.registeredForm = {};
                this.getKey();
                this.registeredFlag = true;
            });
        },
        // 去登录
        goLogin() {
            this.registeredFlag && (this.registeredFlag = false);
            this.forgetFlag && (this.forgetFlag = false);
            this.$nextTick(() => {
                this.loginForm = {};
                this.getKey();
                this.loginFlag = true;
            });
        },
        // 忘记密码
        goForget() {
            this.loginFlag = false;
            this.$nextTick(() => {
                this.forgetForm = {};
                this.getKey();
                this.forgetFlag = true;
            });
        },
        // 登录
        login() {
            if (this.submitFlag) return;
            this.submitFlag = true;
            this.$fetch.post("/index/login", Object.assign(this.loginForm, { verify_key: this.key })).then(res => {
                this.submitFlag = false;
                if (0 === res.code) {
                    this.$message.success(res.msg);
                    this.$store.dispatch("set_user_info", res.data);
                    this.loginFlag = false;
                    this.openSocket();
                } else {
                    this.getKey();
                    this.$message.error(res.msg);
                }
            });
        },
        // 注册
        registered() {
            if (this.submitFlag) return;
            // 勾选协议
            if (!this.protocolFlag) {
                this.$message("请先同意协议");
                return;
            }
            this.submitFlag = true;
            this.$fetch.post("/index/register", Object.assign(this.registeredForm, { verify_key: this.key })).then(res => {
                this.submitFlag = false;
                if (0 === res.code) {
                    this.$message.success(res.msg);
                    this.$store.dispatch("set_user_info", res.data);
                    this.registeredFlag = false;
                    this.customerServiceFlag = true;
                    this.openSocket();
                } else {
                    this.getKey();
                    this.$message.error(res.msg);
                }
            });
        },
        // 退出
        exit() {
            this.$store.dispatch("set_user_info", {});
            this.$router.replace("/");
            this.websock.close();
        },
        // 最大化 最小化 关闭
        toMainFn(type) {
            wd(type);
        }
    },
    watch: {
        isLogin(val) {
            val ? this.openSocket() : this.closeSocket();
        }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");
.header {
    width: 100%;
    height: 60px;
    background: @color;
    box-shadow: 4px 0px 19px 1px rgba(0, 32, 95, 0.15);
    .fix;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    .msg {
        .fl;
        margin-left: 1rem;
        margin-top: 15px;
        .l-h(30px);
        cursor: pointer;
        .logo {
            .wh(30px);
            .fl;
        }
        .header-title {
            .fl;
            font-size: 20px;
            color: #fff;
            margin-left: 15px;
            i {
                padding-left: 5px;
                font-size: 14px;
                font-style: normal;
            }
        }
    }
    .right-ul {
        .fr;
        font-size: 14px;
        color: #fefefe;
        padding-right: 30px;
        .message {
            .rel;
        }
        .point {
            .abs;
            top: 4px;
            right: -4px;
            .wh(8px);
            border-radius: 5px;
            background: red;
        }
        li {
            margin-top: 15px;
            cursor: pointer;
            .l-h(30px);
            .fl;
            .db;
        }
        .login,
        .registered {
            .tc;
            .bg-c(#f3d024);
            color: #9d5e1f;
            width: 89px;
            background: linear-gradient(
                0deg,
                rgba(255, 233, 0, 1),
                rgba(255, 253, 142, 1)
            );
            border-radius: 15px;
        }
        .login,
        .user {
            margin-right: 10px;
        }
        .icon-login {
            .wh(17px);
            .dib;
            margin-right: 3px;
            vertical-align: -4px;
            background: url("~@/assets/icon/login.png") no-repeat;
        }
        .icon-registered {
            .wh(17px);
            .dib;
            margin-right: 3px;
            vertical-align: -4px;
            background: url("~@/assets/icon/registered.png") no-repeat;
        }
        .exit {
            margin-left: 15px;
        }
        .notification {
            width: 21px;
            height: 16px;
            margin-top: 7px;
        }
    }
    .right-button {
        .fr;
        margin-right: 15px;
        li {
            margin-top: 15px;
            margin-right: 7px;
            cursor: pointer;
            .l-h(30px);
            .fl;
            .db;
        }
        .icon-min {
            .wh(17px);
            .dib;
            margin-right: 3px;
            vertical-align: -10px;
            background: url("~@/assets/icon/min.png") no-repeat;
        }
        .icon-max {
            .wh(17px);
            .dib;
            margin-right: 3px;
            vertical-align: -6px;
            background: url("~@/assets/icon/max.png") no-repeat;
        }
        .icon-close {
            .wh(17px);
            .dib;
            margin-right: 3px;
            vertical-align: -4px;
            background: url("~@/assets/icon/close.png") no-repeat;
        }
    }
}
.form {
    .form-input {
        width: 380px;
        margin: 0 auto;
        margin-top: 20px;
        .l-h(40px);
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(221, 221, 221, 1);
        border-radius: 3px;
        .user {
            .fl;
            margin-top: 10px;
            margin-left: 20px;
            width: 17px;
            height: 21px;
            .bg("~@/assets/icon/user.png");
        }
        .pwd {
            .fl;
            margin-top: 10px;
            margin-left: 20px;
            width: 18px;
            height: 21px;
            .bg("~@/assets/icon/pwd.png");
        }
        .invite_code {
            .fl;
            margin-top: 10px;
            margin-left: 20px;
            width: 18px;
            height: 18px;
            .bg("~@/assets/icon/invite_code.png");
        }
        .code {
            .fl;
            margin-top: 10px;
            margin-left: 20px;
            width: 16px;
            height: 19px;
            .bg("~@/assets/icon/code.png");
        }
        .phone {
            .fl;
            margin-top: 9px;
            margin-left: 18px;
            width: 16px;
            height: 24px;
            .bg("~@/assets/icon/phone.png");
        }
        .safe {
            .fl;
            margin-top: 9px;
            margin-left: 17px;
            width: 18px;
            height: 23px;
            .bg("~@/assets/icon/safe.png");
        }
        input {
            .fl;
            .l-h(30px);
            width: 280px;
            margin-top: 6px;
            margin-left: 20px;
            border: 0;
            font-size: 14px;
            color: #999;
            &:focus {
                outline: 0;
            }
        }
    }
    .form-input-first {
        margin-top: 0px;
    }
    .form-margin {
        font-size: 0;
        margin: 0 auto;
        width: 380px;
    }
    .form-input-code {
        .fl;
        width: 238px;
        input {
            width: 138px;
        }
    }
    .code-img {
        .fl;
        width: 118px;
        margin-left: 20px;
        margin-top: 20px;
        height: 40px;
        border-radius: 3px;
        border: 1px solid #ddd;
        cursor: pointer;
        overflow: hidden;
        img {
            width: 100%;
            margin-top: 10px;
        }
    }
    .code-safe {
        .fl;
        width: 118px;
        margin-left: 20px;
        margin-top: 20px;
        .l-h(42px);
        font-size: 14px;
        .tc;
        color: #fff;
        background: @color;
        cursor: pointer;
        border-radius: 2px;
    }
}
.other {
    width: 380px;
    margin: 0 auto;
    margin-top: 14px;
    font-size: 14px;
    color: #777;
    cursor: pointer;
    .forget-pwd {
        .fl;
    }
    .registered {
        .fr;
    }
}
.submit {
    width: 382px;
    background: @color;
    .l-h(48px);
    margin: 0 auto;
    margin-top: 20px;
    .tc;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    border-radius: 2px;
}
.protocol {
    width: 380px;
    margin: 0 auto;
    margin-top: 30px;
    input {
        .fl;
        .wh(15px);
        vertical-align: middle;
    }
    p {
        .fl;
        color: #999;
        font-size: 12px;
        margin-left: 10px;
        span {
            color: #459ff3;
            cursor: pointer;
        }
    }
}
.update {
    .update-version {
        padding: 0 30px;
        font-size: 20px;
        color: #333;
        .l-h(30px);
    }
    .update-con {
        padding: 0 30px;
        font-size: 16px;
        margin-top: 20px;
        color: #666;
    }
    .update-btn {
        .tc;
        padding: 0 30px;
        margin-top: 40px;
    }
    .must {
        .dib;
        margin-left: 20px;
        width: 80px;
        .l-h(26px);
        font-size: 12px;
        background: red;
        color: #fff;
        .tc;
        border-radius: 4px;
        vertical-align: 3px;
    }
    .unmust {
        .dib;
        margin-left: 20px;
        width: 80px;
        .l-h(26px);
        font-size: 12px;
        background: @color;
        color: #fff;
        .tc;
        border-radius: 4px;
        vertical-align: 3px;
    }
}
.uphole {
    display: flex;
    img {
        .db;
        padding-left: 15px;
    }
    p {
        font-size: 16px;
        color: #666;
        margin-top: 19px;
        margin-left: 26px;
    }
}
.customerService {
    .tc;
    p {
        font-size: 18px;
        color: #333;
    }
    img {
        margin-top: 20px;
        .wh(200px);
    }
}
</style>
<style lang="less">
@import url("~@/assets/less/commom.less");
.el-dialog {
    border-radius: 4px;
}
.el-dialog__header {
    background-color: @color;
    text-align: center;
    color: #fff;
    padding: 14px 20px !important;
    border-radius: 4px 4px 0 0;
}
.el-dialog__title {
    color: #fff !important;
    font-size: 20px !important;
}
.el-dialog__headerbtn .el-dialog__close {
    color: #fff !important;
}
.el-dialog__headerbtn:focus .el-dialog__close,
.el-dialog__headerbtn:hover .el-dialog__close {
    color: #fff !important;
}
.el-dialog__body {
    padding: 50px 30px !important;
}
</style>