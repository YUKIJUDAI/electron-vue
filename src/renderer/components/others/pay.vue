<template>
    <div class="pay">
        <p class="pay-msg" v-show="payState === 0">
            <i class="alipay" v-show="pay_type === 1"></i>
            <i class="wx" v-show="pay_type === 2"></i>
            支付宝扫码，支付<span>{{payMsg.amount/100}}</span>元
        </p>
        <div class="pay-code" v-show="payState === 0">
            <img :src="payMsg.url">
            <div class="mask" v-show="timeout" @click="getMsg">
                <img src="~@/assets/icon/reload.png">
                <p>已超时</p>
                <p>点击刷新二维码</p>
            </div>
        </div>
        <p class="p1" v-show="payState === 0">请在 <span>{{seconds}}</span> 秒内完成支付</p>
        <p class="p2" v-show="payState === 0">请勿重复支付，一律不到账</p>
        <p class="p3" v-show="payState === 0">订单号:{{payMsg.order_no}}</p>
        <div class="pay-result" v-show="payState === 1">
            <img src="~@/assets/icon/pay-success.png">
            <p>支付成功</p>
        </div>
        <div class="tip">
            <p>
                <img src="~@/assets/icon/vip-2.png">
                支付提示
            </p>
            <ul>
                <li>1、请勿在备注中填写任何关于刷单、刷销量、领商品之类的备注</li>
                <li>2、充值成功后不支持退款；</li>
                <li>3、任何充值疑问请<span>联系客服</span></li>
            </ul>
        </div>

    </div>
</template>

<script>
import { interval, fromPromise } from "rxjs";
import { mergeMap, take, filter, tap } from "rxjs/operators"

export default {
    props: ["pay_type", "serve_id"],
    data() {
        return {
            payMsg: {},
            seconds: 300,
            payState: 1, // 0进行中 1 成功 2失败 ,
            timeout: false,
        }
    },
    mounted() {
        this.getMsg();
    },
    methods: {
        getMsg() {
            this.$fetch.post("/pay/createOrder", { type: this.pay_type, user_id: this.$store.state.userInfo.user_id, serve_id: this.serve_id }).then(res => {
                if (0 === res.code) {
                    this.payMsg = res.data;
                    this.getResult();
                }
            });
        },
        getResult() {
            this.seconds = 300;
            this.timeout = false;
            var o = interval(1000).pipe(
                take(300),
                tap((i) => { i === 299 && (this.timeout = true); this.seconds--; }),
                filter(() => this.seconds % 12 === 0),
                mergeMap(() => {
                    return new Promise((resolve, reject) => {
                        this.$fetch.post("pay/getOrderStatus", { order_no: this.payMsg.order_no }).then((res) => {
                            resolve(res);
                        });
                    })
                })
            ).subscribe((res) => {
                if (0 === res.code) {
                    this.payState = 1;
                    this.$store.dispatch("set_user_info", { vip_level: 1 });
                    o.unSubscribe();
                } else {
                    this.payState = 0;
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");

.pay {
    padding: 0 20px;
    .pay-msg {
        font-size: 14px;
        .tc;
        color: #333;
        font-weight: bold;
        .alipay {
            .dib;
            background: url("~@/assets/icon/alipay.png") no-repeat;
            .wh(20px);
            vertical-align: -4px;
        }
        .wx {
            .dib;
            background: url("~@/assets/icon/wx.png") no-repeat;
            .wh(20px);
            vertical-align: -4px;
        }
        span {
            font-size: 20px;
        }
    }
    .pay-code {
        .wh(140px);
        padding: 10px;
        border: 1px solid rgba(215, 215, 215, 1);
        margin: 0 auto;
        margin-top: 18px;
        .rel;
        img {
            width: 100%;
        }
        .mask {
            .abs;
            top: 0;
            right: 0;
            .wh(160px);
            background: rgba(0, 0, 0, 1);
            opacity: 0.75;
            .tc;
            img {
                .wh(26px);
                margin-top: 50px;
                cursor: pointer;
            }
            p {
                cursor: pointer;
                color: #fff;
                font-size: 14px;
                margin-top: 10px;
            }
        }
    }
    .pay-result {
        .tc;
        margin-top: 50px;
        p {
            .l-h(60px);
        }
    }
    .p1 {
        .tc;
        font-size: 14px;
        margin-top: 8px;
        color: #333;
        span {
            font-size: 18px;
        }
    }
    .p2 {
        .tc;
        margin-top: 6px;
        font-size: 14px;
        font-weight: bold;
        color: rgba(255, 0, 0, 1);
    }
    .p3 {
        .tc;
        margin-top: 10px;
        font-size: 14px;
        font-weight: bold;
        color: #999;
    }
    .tip {
        img {
            vertical-align: -5px;
            margin-right: 10px;
        }
        p {
            font-size: 14px;
            color: #333;
            margin-bottom: 10px;
        }
        ul {
            li {
                font-size: 12px;
                color: #999;
                padding-bottom: 8px;
                span {
                    color: #ff6801;
                }
            }
        }
    }
}
</style>