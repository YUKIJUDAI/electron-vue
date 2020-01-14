<template>
    <div class="accountSettings">
        <div class="title">基本信息</div>
        <el-form label-width="120px" class="form" label-position="left">
            <el-form-item label="登录账号">
                <p>{{userPhone}}</p>
            </el-form-item>
            <el-form-item label="绑定手机">
                <p>{{userPhone}}</p>
            </el-form-item>
            <el-form-item label="邀请链接">
                <p><span class="copy">复制</span></p>
            </el-form-item>
            <el-form-item label="最近登录时间">
                <p></p>
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
            <password v-model="forgetFlag" :type="3" :phone="userPhone"></password>
        </el-dialog>
        <el-dialog title="支付密码" :visible.sync="payFlag" width="721px">
            <password v-model="payFlag" :type="4" :phone="userPhone"></password>
        </el-dialog>
    </div>
</template>

<script>
import password from "@/components/others/password";

export default {
    components: { password },
    data() {
        return {
            forgetFlag: false,
            payFlag: false,
        }
    },
    computed: {
        userPhone() {
            return this.$store.state.userInfo.phone;
        }
    },
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");

.accountSettings {
    padding: 0 20px;
    .title {
        margin-top: 40px;
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