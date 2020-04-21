<template>
    <div class="recharge">
        <p class="p1">积分不可提现。1人民币等于{{data.value}}积分。</p>
        <p class="p2">充值账号：<span>{{userPhone}}</span></p>
        <p class="p3">充值金额<input type="number" placeholder="请输入不小于10的整数" v-model="value" maxlength="9"></p>
        <p class="p4">充值总额<span>{{value}}元</span> （充值￥{{value}}元，获得{{value*data.value}}积分)</p>
        <div class="pay-way">
            <p>支付方式：</p>
            <div @click="pay_type = 1" class="pay-way-o" :class="{active:pay_type === 1}">支付宝</div>
            <!-- <div @click="pay_type= 2" class="pay-way-o" :class="{active:pay_type === 2}">微信支付</div> -->

            <div class="pay" @click="toPay()">开通</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pay_type: 1,
            data: {},
            value: 10
        }
    },
    computed: {
        userPhone() {
            return this.$store.state.userInfo.user_phone;
        },
    },
    mounted() {
        this.getGoldPrice();
    },
    methods: {
        async getGoldPrice() {
            var res = await this.$fetch.post("/price/getGoldPrice");
            0 === res.code && (this.data = res.data);
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
            color: @color;
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
            color: @color;
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
            border: 1px solid @color;
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
        background: @color;
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