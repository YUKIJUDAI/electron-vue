<template>
    <div class="main">
        <div class="header clearfix">
            <div class="msg">
                <img src="" class="logo">
                <span class="title">黑搜开发器</span>
            </div>
            <ul class="clearfix right-ul">
                <li class="login" @click="loginFlag = true" v-if="!isLogin"><i class="icon-login"></i>登录</li>
                <li class="registered" @click="registeredFlag = true" v-if="!isLogin"><i class="icon-registered"></i>注册</li>
                <li class="user" v-if="isLogin">{{userPhone}}</li>
                <li class="exit" @click="exit" v-if="isLogin">退出</li>
            </ul>
        </div>
        <div class="body clearfix">
            <div class="main-left">
                <div class="main-left-1">
                    <img src="~@/assets/img/level-1.png" class="identity-tag">
                    <img src="~@/assets/img/admin.png" class="avatar">
                    <div class="main-login" v-if="isLogin">{{userPhone}}</div>
                    <div class="main-login" @click="loginFlag = true" v-else>请登录</div>
                </div>
                <div class="main-left-2 clearfix">
                    <div class="left-2-left" v-if="isLogin">充值</div>
                    <div class="left-2-left" @click="registeredFlag = true" v-else>立即注册</div>
                    <div class="left-2-right">联系客服</div>
                </div>
                <div class="main-left-3">
                    <ul>
                        <li class="clearfix active">
                            <i class="icon-left-li-1"></i>
                            <span>极速黑搜</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="main-right">
                <router-view />
            </div>
        </div>
        <el-dialog title="欢迎登录黑搜开发器" :visible.sync="loginFlag" width="558px">
            <div class="login-dialog">
                <form class="form">
                    <div class="form-input">
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
                            <input type="text" placeholder="请输入图形验证码">
                        </div>
                        <div class="code-img">
                            <img src="" alt="">
                        </div>
                    </div>
                </form>
                <div class="other clearfix">
                    <span class="forget-pwd" @click="">忘记密码</span>
                    <span class="registered" @click="goRegistered">免费注册</span>
                </div>
                <div class="submit" @click="login">登录</div>
            </div>
        </el-dialog>
        <el-dialog title="欢迎注册黑搜开发器" :visible.sync="registeredFlag" width="721px">
            <form class="form">
                <div class="form-input">
                    <i class="phone"></i>
                    <input type="text" placeholder="请输入11位注册手机号" v-model="registeredForm.phone">
                </div>
                <div class="form-input">
                    <i class="pwd"></i>
                    <input type="password" placeholder="登录密码由6-20位字母和数字组成" v-model="registeredForm.password">
                </div>
                <div class="clearfix form-margin">
                    <div class="form-input form-input-code">
                        <i class="code"></i>
                        <input type="text" placeholder="请输入图形验证码">
                    </div>
                    <div class="code-img">
                        <img src="" alt="">
                    </div>
                </div>
                <div class="clearfix form-margin">
                    <div class="form-input form-input-code">
                        <i class="safe"></i>
                        <input type="text" placeholder="请输入手机验证码" v-model="registeredForm.code">
                    </div>
                    <div class="code-safe" v-if="phoneCodeFlag">{{countdown}}</div>
                    <div class="code-safe" @click="getPhoneCode" v-else>发送验证码</div>
                </div>
            </form>
            <div class="other clearfix">
                <span class="registered" @click="goLogin">去登录</span>
            </div>
            <div class="submit" @click="registered">立即注册</div>
            <div class="protocol clearfix">
                <input type="checkbox" class="protocol-checkbox" v-model="protocolFlag" />
                <p>我已仔细阅读并同意接受<span>《黑搜开发器服务协议》</span></p>
            </div>
        </el-dialog>
    </div>
</template>

<script>
const { ipcRenderer } = require("electron");
import { fromEvent } from "rxjs";
import { isEmpty, getPhoneCode, isOnline } from "@/util/util";

export default {
    data() {
        return {
            // 登录表格
            loginForm: {},
            // 注册表格
            registeredForm: {},

            loginFlag: false,
            registeredFlag: false,
            phoneCodeFlag: false,
            // 协议
            protocolFlag: true,
            // 提交flag
            submitFlag: false,
            // 倒计时
            countdown: 60
        }
    },
    computed: {
        isLogin() {
            return !isEmpty(this.$store.state.userInfo.token);
        },
        userPhone() {
            return this.$store.state.userInfo.phone;
        }
    },
    mounted() {
        // 判断在线离线状态
        isOnline();

        // 获取更新
        ipcRenderer.send("checkForUpdate");
        // 输出更新信息
        ipcRenderer.on("message", (event, text) => {
            console.log(text);
        });
        // 更新
        ipcRenderer.on("isUpdateNow", () => {
            ipcRenderer.send("isUpdateNow");
        });
    },
    methods: {
        // 获取短信
        getPhoneCode() {
            if (this.phoneCodeFlag) return;
            getPhoneCode(1, this.registeredForm.phone, this);
        },
        // 去注册
        goRegistered() {
            this.loginFlag = false;
            this.$nextTick(() => {
                this.registeredFlag = true;
            });
        },
        // 去登录
        goLogin() {
            this.registeredFlag = false;
            this.$nextTick(() => {
                this.loginFlag = true;
            });
        },
        // 登录
        login() {
            if (this.submitFlag) return;
            this.submitFlag = true;
            this.$http.post("/index/login", this.loginForm).then(res => {
                this.submitFlag = false;
                if (0 === res.code) {
                    this.$store.dispatch("set_user_info", { token: res.data.token, phone: this.loginForm.phone });
                    this.$message.success(res.msg);
                    this.loginFlag = false;
                } else {
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
            this.$http.post("/index/register", this.registeredForm).then(res => {
                this.submitFlag = false;
                if (0 === res.code) {
                    this.$message.success(res.msg);
                    this.registeredFlag = false;
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        // 退出
        exit() {
            this.$store.dispatch("set_user_info", { token: "", phone: "" });
        }
    }
}
</script>

<style scoped lang="less">
@import url("~@/assets/less/commom.less");
.main {
    min-width: 1024px;
    width: 100vw;
    overflow: hidden;
    .header {
        width: 100%;
        height: 60px;
        background: #ff6801;
        box-shadow: 4px 0px 19px 1px rgba(0, 32, 95, 0.15);
        .msg {
            .fl;
            margin-left: 1rem;
            margin-top: 15px;
            .l-h(30px);
            .logo {
                .wh(30px);
                .fl;
            }
            .title {
                .fl;
                font-size: 20px;
                color: #fff;
                margin-left: 15px;
            }
        }
        .right-ul {
            .fr;
            font-size: 14px;
            color: #fefefe;
            padding-right: 30px;
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
                margin-right: 15px;
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
        }
    }
    .body {
        height: calc(~"100vh - 60px - 18px");
        overflow-y: scroll;
        .bg-c(#f5f5f5);
        padding-top: 18px;
        .main-left {
            width: 175px;
            height: 95%;
            margin-left: 20px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(238, 238, 238, 1);
            box-shadow: -4px 0px 11px 1px rgba(0, 32, 95, 0.1);
            .fl;
            .main-left-1 {
                .rel;
                padding-bottom: 50px;
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
                    .icon-left-li-1 {
                        .fl;
                        .db;
                        .wh(19px);
                        margin-top: 13px;
                        margin-left: 27px;
                    }
                    span {
                        .fl;
                        font-size: 15px;
                        margin-left: 16px;
                        color: #6660;
                    }
                }
                .active {
                    background: rgba(241, 245, 251, 1);
                    .icon-left-li-1 {
                        background: url("~@/assets/icon/icon-left-li-1-active.png")
                            no-repeat;
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
            min-height: 95%;
            background: rgba(255, 255, 255, 1);
            box-shadow: -4px 0px 11px 1px rgba(0, 32, 95, 0.1);
        }
    }
    .form {
        .form-input {
            width: 380px;
            margin: 0 auto;
            margin-top: 29px;
            .l-h(46px);
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(221, 221, 221, 1);
            border-radius: 3px;
            .user {
                .fl;
                margin-top: 13px;
                margin-left: 20px;
                width: 17px;
                height: 21px;
                .bg("~@/assets/icon/user.png");
            }
            .pwd {
                .fl;
                margin-top: 13px;
                margin-left: 20px;
                width: 18px;
                height: 21px;
                .bg("~@/assets/icon/pwd.png");
            }
            .code {
                .fl;
                margin-top: 13px;
                margin-left: 20px;
                width: 18px;
                height: 21px;
                .bg("~@/assets/icon/code.png");
            }
            .phone {
                .fl;
                margin-top: 11px;
                margin-left: 18px;
                width: 16px;
                height: 24px;
                .bg("~@/assets/icon/phone.png");
            }
            .safe {
                .fl;
                margin-top: 11px;
                margin-left: 17px;
                width: 18px;
                height: 23px;
                .bg("~@/assets/icon/safe.png");
            }
            input {
                .fl;
                .l-h(30px);
                width: 280px;
                margin-top: 9px;
                margin-left: 25px;
                border: 0;
                font-size: 16px;
                color: #999;
                &:focus {
                    outline: 0;
                }
            }
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
            margin-top: 29px;
            height: 48px;
            border-radius: 3px;
            cursor: pointer;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .code-safe {
            .fl;
            width: 118px;
            margin-left: 20px;
            margin-top: 29px;
            .l-h(46px);
            font-size: 16px;
            .tc;
            color: #fff;
            background: rgba(255, 104, 1, 1);
            cursor: pointer;
        }
    }
    .other {
        width: 380px;
        margin: 0 auto;
        margin-top: 14px;
        font-size: 14px;
        color: #ff6801;
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
        background: rgba(255, 104, 1, 1);
        .l-h(48px);
        margin: 0 auto;
        margin-top: 35px;
        .tc;
        color: #fff;
        font-size: 19px;
        cursor: pointer;
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
}
</style>
<style lang="less">
.el-dialog__header {
    background-color: #ff6801;
    padding: 0 0 10px 0;
    text-align: center;
    color: #fff;
}
.el-dialog__title {
    color: #fff;
}
.el-dialog__headerbtn .el-dialog__close {
    color: #fff;
}
</style>