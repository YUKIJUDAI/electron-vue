<template>
    <el-dialog :visible.sync="value" title="开通会员" width="690px" :before-close="handleClose">
        <div class="recharge-1" v-if="paying">
            <div class="account clearfix">
                <p>开通账号：<span>{{$store.state.userInfo.user_phone}}</span></p>
                <p>开通时常：<span>{{price[vip_index][checked].value}}</span></p>
                <p>到期时间：<span>{{price[vip_index][checked].vip_end_time}}</span></p>
            </div>
            <ul class="list clearfix">
                <li :class="{checked:checked === i}" v-for="(item,i) in price[vip_index]" :key="i" @click="checked = i">
                    <img src="~@/assets/icon/checked.png" class="check" v-show="checked === i">
                    <div>{{item.price}}<span>元</span></div>
                    <p>{{item.value}}</p>
                </li>
            </ul>
            <div class="pay-way clearfix">
                <p>会员类型：</p>
                <div v-if="vip_level === 0">
                    <!-- <div @click="vip_index = 0,checked = 0" class="pay-way-o" :class="{active:vip_index === 0}">普通会员</div> -->
                    <div @click="vip_index = 1,checked = 0" class="pay-way-o" :class="{active:vip_index === 1}">超级会员</div>
                </div>
                <!-- <div v-else-if="vip_level === 1">
                    <div @click="vip_index = 0,checked = 0" class="pay-way-o" :class="{active:vip_index === 0}">续费普通会员</div>
                    <div @click="vip_index = 1,checked = 0" class="pay-way-o" :class="{active:vip_index === 1}">升级超级会员</div>
                </div> -->
                <div v-else-if="vip_level === 2">
                    <div @click="vip_index = 1,checked = 0" class="pay-way-o" :class="{active:vip_index === 1}">续费超级会员</div>
                </div>
            </div>
            <div class="pay-way clearfix">
                <p>支付方式：</p>
                <div @click="pay_type = 1" class="pay-way-o" :class="{active:pay_type === 1}">支付宝</div>
                <!-- <div @click="pay_type= 2" class="pay-way-o" :class="{active:pay_type === 2}">微信支付</div> -->

                <div class="pay" @click="paying = false">开通</div>
            </div>
        </div>
        <paytel v-else :pay_type="pay_type" :serve_id="price[vip_index][checked].id"></paytel>
    </el-dialog>
</template>

<script>
import paytel from "@/components/others/pay";

export default {
    components: { paytel },
    props: ["value"],
    data() {
        return {
            vip_index: 1,
            pay_type: 1,
            price: [[], []],
            paying: true,
            checked: 0
        }
    },
    computed: {
        vip_level() {
            return this.$store.state.userInfo.vip_level;
        }
    },
    created() {
        this.$fetch.post("/price/getVipPrice").then(res => {
            0 === res.code && (this.price = [this.vip_level === 2 ? [] : res.data.price, res.data.sup_price]);
        });
    },
    methods: {
        handleClose() {
            this.$emit("input", false);
            this.paying = false;
        }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");

.recharge-1 {
    padding: 0 20px;
    .account {
        font-size: 14px;
        color: #333;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        span {
            color: var(--themeColor);
        }
    }
    .list {
        margin-top: 28px;
        li {
            width: 172px;
            height: 160px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(215, 215, 215, 1);
            margin: 0 10px;
            .fl;
            .tc;
            cursor: pointer;
            div {
                margin: 0 25px;
                padding: 25px 0;
                font-size: 48px;
                color: #333;
                border-bottom: 1px dotted #e3e3e3;
                span {
                    font-size: 14px;
                    color: #999;
                }
            }
            p {
                font-size: 18px;
                color: #333;
                margin-top: 10px;
            }
        }
        .checked {
            border: 1px solid var(--themeColor);
            .rel;
            img {
                .abs;
                top: 0;
                right: 0;
            }
        }
    }
    .pay-way {
        margin-top: 20px;
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
}
</style>