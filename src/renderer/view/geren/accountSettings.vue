<template>
    <div class="accountSettings">
        <div class="title">基本信息</div>
        <el-form label-width="120px" class="form" label-position="left">
            <el-form-item label="登录账号">
                <p>{{userInfo.username}}</p>
            </el-form-item>
            <el-form-item label="绑定手机">
                <p>{{userInfo.username}}</p>
            </el-form-item>
            <el-form-item label="邀请链接">
                <p>{{userInfo.invite_url}}<span class="copy" @click="copy(userInfo.invite_url)">复制</span></p>
            </el-form-item>
            <el-form-item label="最近登录时间">
                <p>{{userInfo.last_login_time}}</p>
            </el-form-item>
        </el-form>
        <div class="title">密码设置</div>
        <div class="pwd">
            <ul class="clearfix">
                <li class="li-1">登录密码<img src="~@/assets/icon/checked-1.png"></li>
                <li class="li-2">
                    <p>使账号更安全，建议您定期更换密码，</br>且设置一个包含数字和字母，并长度超过6位以上的密码。</p>
                </li>
                <li class="li-3">
                    <el-button plain class="li-3-btn" @click="forgetFlag = true">修改</el-button>
                </li>
            </ul>
            <ul class="clearfix">
                <li class="li-1">支付密码<img src="~@/assets/icon/checked-1.png"></li>
                <li class="li-2">
                    <p>使账号更安全，建议您定期更换支付密码，</br>且设置一个包含数字和字母，并长度超过6位以上的密码。</p>
                </li>
                <li class="li-3">
                    <el-button plain class="li-3-btn" @click="payFlag = true">修改</el-button>
                </li>
            </ul>
        </div>
        <el-dialog title="修改密码" :visible.sync="forgetFlag" width="721px">
            <password v-model="forgetFlag" :type="3" :phone="userInfo.username"></password>
        </el-dialog>
        <el-dialog title="支付密码" :visible.sync="payFlag" width="721px">
            <password v-model="payFlag" :type="4" :phone="userInfo.username"></password>
        </el-dialog>
    </div>
</template>

<script>
import password from "@/components/others/password";
import copy from "clipboard-copy";

export default {
    components: { password },
    data() {
        return {
            forgetFlag: false,
            payFlag: false,
            userInfo: {}
        }
    },
    computed: {
        userPhone() {
            return this.$store.state.userInfo.user_phone;
        }
    },
    created() {
        this.getUserInfo();
    },
    methods: {
        async getUserInfo() {
            var res = await this.$fetch.post("/user/getUserInfo");
            0 === res.code && (this.userInfo = res.data);
        },
        copy(val) {
            copy(val);
            this.$message("复制成功");
        },
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");

.accountSettings {
    .title {
        margin-top: 25px;
        font-size: 18px;
        color: #333;
    }
    .form {
        margin-top: 15px;
        overflow: hidden;
        .copy {
            background: rgba(255, 0, 48, 1);
            color: #fff;
            padding: 2px 15px;
            margin-left: 20px;
            cursor: pointer;
        }
    }
    .pwd {
        ul {
            margin-top: 20px;
            overflow: hidden;
        }
        li {
            float: left;
        }
        .li-1 {
            .l-h(40px);
            font-size: 14px;
            img {
                vertical-align: -5px;
                margin-left: 10px;
            }
        }
        .li-2 {
            font-size: 14px;
            color: #666;
            margin-left: 20px;
        }
        .li-3-btn {
            width: 80px;
            height: 32px;
            margin-left: 30px;
            font-size: 15px;
        }
    }
}
</style>
<style lang="less">
.accountSettings {
    .el-form-item {
        margin-bottom: 5px;
    }
    .el-form-item__label {
        color: #999;
    }
    .el-form-item__content {
        color: #333;
    }
}
</style>