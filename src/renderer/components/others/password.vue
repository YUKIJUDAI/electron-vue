<template>
    <div class="password">
        <form class="form">
            <div class="form-input form-input-first">
                <i class="phone"></i>
                <input type="text" placeholder="请输入手机号" v-model="forgetForm.phone" :disabled="phone">
            </div>
            <div class="form-input">
                <i class="pwd"></i>
                <input type="password" placeholder="请输入新密码" v-model="forgetForm.password">
            </div>
            <div class="clearfix form-margin">
                <div class="form-input form-input-code">
                    <i class="code"></i>
                    <input type="text" placeholder="请输入验证码" v-model="forgetForm.verify">
                </div>
                <div class="code-img">
                    <img :src="baseUrl + '/index/getNoTokenVerify?key=' + key" @click="getKey">
                </div>
            </div>
            <div class="clearfix form-margin">
                <div class="form-input form-input-code">
                    <i class="safe"></i>
                    <input type="text" placeholder="请输入手机验证码" v-model="forgetForm.code">
                </div>
                <div class="code-safe" v-if="phoneCodeFlag">{{countdown}}</div>
                <div class="code-safe" @click="getPhoneCode" v-else>发送验证码</div>
            </div>
        </form>
        <div class="other clearfix">
            <span class="registered" @click="goLogin" v-if="type === 2">去登录</span>
        </div>
        <div class="submit" @click="forget">立即修改</div>
    </div>
</template>

<script>
import { getPhoneCode } from "@/util/util";
import { baseUrl } from "@/config/config";

export default {
    props: ["type", "phone"],
    data() {
        return {
            baseUrl,
            // 忘记密码表格
            forgetForm: {},
            phoneCodeFlag: false,
            // 提交flag
            submitFlag: false,
            // 倒计时
            countdown: 60,
            key: ""
        }
    },
    created() {
        if (this.phone) this.forgetForm.phone = this.phone;
        this.getKey();
    },
    methods: {
        // 随机key
        getKey() {
            this.key = new Date().getTime() + "" + (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);
        },
        // 获取短信
        getPhoneCode() {
            if (!this.forgetForm.phone) {
                this.$message.error("请先输入手机号");
                return;
            } else if (!this.forgetForm.verify) {
                this.$message.error("请先填写图形验证码");
                return;
            }
            getPhoneCode(2, this.forgetForm.phone, this.forgetForm.verify, this);
        },
        // 去登录
        goLogin() {
            this.$emit("goLogin");
        },
        // 忘记密码
        async forget() {
            if (this.submitFlag) return;
            this.submitFlag = true;
            var url = ["", "", "/index/forgetPwd", "/user/editPassword", "/user/editPayPwd"][this.type];
            var res = await this.$fetch.post(url, Object.assign(this.forgetForm, { verify_key: this.key }));
            this.submitFlag = false;
            if (0 === res.code) {
                this.$store.dispatch("set_user_info", {});
                this.$message.success(res.msg);
                this.$emit("input", false);
                this.$router.replace("/");
            } else {
                this.getKey();
                this.$message.error(res.msg);
            }
        },
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");

.password {
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
}
</style>