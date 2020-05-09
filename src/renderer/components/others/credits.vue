<template>
    <el-dialog :visible.sync="value" title="积分充值" width="690px" :before-close="handleClose">
        <div class="recharge" v-if="paying">
            <p class="p1">积分不可提现。1人民币等于{{orderMsg.value}}积分。</p>
            <p class="p2">充值账号：<span>{{userPhone}}</span></p>
            <p class="p3">充值金额<input type="number" placeholder="请输入不小于10的整数" v-model="num" maxlength="9"></p>
            <p class="p4">充值总额<span>{{num}}元</span> （充值￥{{num}}元，获得{{num*orderMsg.value}}积分)</p>
            <div class="pay-way">
                <p>支付方式：</p>
                <div @click="pay_type = 1" class="pay-way-o" :class="{active:pay_type === 1}">支付宝</div>
                <!-- <div @click="pay_type= 2" class="pay-way-o" :class="{active:pay_type === 2}">微信支付</div> -->

                <div class="pay" @click="paying = false">开通</div>
            </div>
        </div>
        <pay v-else :pay_type="pay_type" :num="num" :serve_id="orderMsg.id"></pay>
    </el-dialog>
</template>

<script>
import pay from "@/components/others/pay";

export default {
    props: ["value"],
    components: { pay },
    data() {
        return {
            dialogVisible: false,
            paying: true,
            pay_type: 1,
            orderMsg: {},
            num: 10
        }
    },
    computed: {
        userPhone() {
            return this.$store.state.userInfo.user_phone;
        }
    },
    created() {
        this.getGoldPrice();
    },
    methods: {
        async getGoldPrice() {
            var res = await this.$fetch.post("/price/getGoldPrice");
            0 == res.code && (this.orderMsg = res.data);
        },
        handleClose() {
            this.$emit("input", false);
            this.paying = true;
        }
    },
    watch: {
        num(val, oldval) {
            if (val !== oldval) this.num = Math.abs(~~val);
        }
    }

}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");

.recharge {
    padding: 0 30px;
    .p1 {
        font-size: 14px;
        color: #333;
        margin-top: 20px;
        font-weight: bold;
    }
    .p2 {
        font-size: 14px;
        color: #333;
        margin-top: 30px;
        font-weight: bold;
        span {
            color: var(--themeColor);
        }
    }
    .p3 {
        margin-top: 28px;
        font-size: 12px;
        color: #999;
        .l-h(40px);
        input {
            width: 312px;
            margin-left: 24px;
            height: 40px;
            padding: 0 12px;
            border: 1px solid rgba(234, 234, 234, 1);
            outline: none;
        }
    }
    .p4 {
        margin-top: 28px;
        font-size: 12px;
        color: #999;
        .l-h(40px);
        span {
            font-size: 16px;
            color: var(--themeColor);
        }
    }
    .pay-way {
        margin-top: 50px;
        font-size: 14px;
        color: #333;
        .pay-way-o {
            .tc;
            margin-top: 14px;
            width: 120px;
            .l-h(36px);
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(215, 215, 215, 1);
            .fl;
            margin-left: 36px;
            cursor: pointer;
            .rel;
            &:first-of-type {
                margin-left: 0;
            }
        }
        .active {
            border: 1px solid var(--themeColor);
            &:after {
                .abs;
                top: 0;
                right: 0;
                .wh(24px);
                .db;
                background: url("~@/assets/icon/checked-0.png") no-repeat;
                content: close-quote;
            }
        }
    }
    .pay {
        width: 260px;
        .l-h(42px);
        margin: 0 auto;
        margin-top: 80px;
        background: var(--themeColor);
        .tc;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
    }
    .protocol {
        margin-top: 10px;
        color: #999;
        font-size: 12px;
        .tc;
    }
}
</style>