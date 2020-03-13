<template>
    <div class="vip">
        <div class="left">
            <ul>
                <li class="head">功能特权</li>
                <li>急速黑搜</li>
                <li>黑号/标签查询</li>
                <li>卡首屏/魔搜</li>
                <li>流量</li>
                <li>直通车托管</li>
                <li>试用补单</li>
            </ul>
        </div>
        <div class="center">
            <ul>
                <li class="head head-vip">
                    <img src="~@/assets/img/recommend.png" class="recommend">
                    <p><i class="vip-icon"></i>高级会员</p>
                    <span @click="dialogVisible = true">开通会员</span>
                </li>
                <li>无限使用</li>
                <li>无限使用</li>
                <li>无限使用</li>
                <li>赠送5000积分</li>
                <li>1对1出计划优先</li>
                <li>体验发布</li>
            </ul>
        </div>
        <div class="right">
            <ul>
                <li class="head">普通会员</li>
                <li>免费日查询宝贝≤3个</li>
                <li>免费日查询账号≤30个</li>
                <li>不限制</li>
                <li>赠送200积分</li>
                <li>免费微调</li>
                <li>体验发布</li>
            </ul>
        </div>
        <el-dialog :visible.sync="dialogVisible" title="开通黑搜高级会员" width="690px" :before-close="handleClose">
            <div class="rechange-0" v-if="pay">
                <ul>
                    <li>开通账号：18155908820</li>
                    <li>开通套餐：{{payMsg.month}}个月黑搜会员</li>
                    <li>支付方式：<span>{{["","支付宝","微信"][+pay_type]}}</span>付款</li>
                </ul>
                <p class="pay-msg">
                    <i class="alipay" v-show="pay_type === '1'"></i>
                    <i class="wx" v-show="pay_type === '2'"></i>
                    支付宝扫码，支付<span>{{payMsg.amount/100}}</span>元
                </p>
                <div class="pay-code">
                    <img :src="payMsg.url">
                </div>
                <div class="pay-result">
                    <img src="~@/assets/icon/pay-success.png" v-show="payState === 1">
                    <img src="~@/assets/icon/pay-error.png" v-show="payState === 2">
                    <p>{{["支付后请稍等几分钟，如充值成功后无到账，请重启本软件查看","会员支付成功","会员支付失败"][payState]}}</p>
                </div>
            </div>
            <div class="recharge-1" v-else>
                <p class="account">开通账号：18155908820</p>
                <el-checkbox v-model="protocol" class="protocol">同意《服务条例》</el-checkbox>
                <ul class="list clearfix">
                    <li :class="{checked:checked === i}" v-for="(item,i) in price" :key="i" @click="checked = i">
                        <img src="~@/assets/icon/checked.png" class="check" v-show="checked === i">
                        <div>{{item.price}}<span>元</span></div>
                        <p>{{item.value}}</p>
                    </li>
                </ul>
                <p class="pay-way">
                    支付方式：
                    <el-select v-model="pay_type" placeholder="请选择" size="small">
                        <el-option label="支付宝" value="1"></el-option>
                        <el-option label="微信" value="2"></el-option>
                    </el-select>
                </p>

                <div class="pay" @click="toPay()">开通</div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { interval, fromPromise } from "rxjs";
import { mergeMap, take } from "rxjs/operators"

export default {
    data() {
        return {
            dialogVisible: false,
            protocol: true,
            pay_type: "1",
            price: [],
            pay: false,
            checked: 0,
            payMsg: {},
            payState: 0 // 0进行中 1 成功 2失败 
        }
    },
    created() {
        this.$fetch.post("/price/getVipPrice").then(res => {
            0 === res.code && (this.price = res.data.price);
        });
    },
    methods: {
        handleClose() {
            this.dialogVisible = false;
            this.pay = false;
        },
        toPay() {
            this.$fetch.post(
                "/pay/createOrder",
                { type: this.pay_type, user_id: this.$store.state.userInfo.user_id, serve_id: this.price[this.checked].id }
            ).then(res => {
                if (0 === res.code) {
                    this.payMsg = res.data;
                    this.pay = true;
                }
            });
        }
    },
    watch: {
        pay(val) {
            if (!val) {
                return;
            }
            var o = interval(12000).pipe(
                take(25),
                mergeMap((i) => {
                    return new Promise((resolve, reject) => {
                        if (i === 25) {
                            resolve({ code: 2000 })
                        } else {
                            this.$fetch.post("pay/getOrderStatus", { order_no: this.payMsg.order_no }).then((res) => {
                                resolve(res)
                            });
                        }
                    })
                })
            ).subscribe((res) => {
                if (0 === res.code) {
                    this.payState = 1;
                    o.unSubscribe();
                } else if (2000 === res.code) {
                    this.payState = 2;
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

.vip {
    padding: 40px;
    .left,
    .center,
    .right {
        .fl;
        border: 1px solid rgba(211, 209, 208, 1);
        .tc;
        li {
            .l-h(65px);
            &:nth-child(2n) {
                background: rgba(251, 249, 248, 1);
            }
        }
        .head {
            padding-top: 40px;
            font-size: 20px;
            height: 130px;
        }
        .head-vip {
            .rel;
            height: 132px;
            .recommend {
                .abs;
                top: 0;
                left: 0;
            }
            .vip-icon {
                background: url("~@/assets/icon/vip.png") no-repeat;
                .dib;
                width: 28px;
                height: 26px;
                vertical-align: -5px;
                margin-right: 10px;
            }
            p {
                color: #ff0a01;
            }
            span {
                .db;
                background: linear-gradient(
                    180deg,
                    rgba(233, 34, 10, 1),
                    rgba(250, 93, 81, 1)
                );
                border-radius: 18px;
                font-size: 18px;
                color: #fff;
                width: 134px;
                .l-h(36px);
                margin: 0 auto;
                cursor: pointer;
            }
        }
    }
    .left {
        width: 25%;
    }
    .center {
        width: 40%;
        padding-bottom: 4px;
        border: 1px solid rgba(254, 69, 62, 1);
        margin-top: -2px;
        li {
            &:nth-child(2n) {
                background: rgba(251, 249, 248, 1);
            }
        }
    }
    .right {
        width: 34%;
    }
    .rechange-0 {
        padding: 0 20px;
        ul {
            li {
                font-size: 14px;
                color: #333;
                padding-bottom: 15px;
                font-weight: bold;
                span {
                    color: #188fff;
                }
            }
        }
        .pay-msg {
            font-size: 14px;
            .tc;
            margin-top: 33px;
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
            margin-top: 22px;
            img {
                width: 100%;
            }
        }
        .pay-result {
            .tc;
            margin-top: 50px;
            p {
                .l-h(60px);
            }
        }
    }
    .recharge-1 {
        padding: 0 20px;
        .account {
            font-size: 14px;
            color: #333;
            font-weight: bold;
        }
        .protocol {
            margin-top: 10px;
            color: #999;
            font-size: 12px;
            .el-checkbox__input.is-checked + .el-checkbox__label {
                color: #999;
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
                border: 1px solid rgba(255, 104, 1, 1);
                .rel;
                img {
                    .abs;
                    top: 0;
                    right: 0;
                }
            }
        }
        .pay-way {
            margin-top: 30px;
            font-size: 14px;
            color: #333;
            span {
                color: #188fff;
            }
        }
        .pay {
            width: 260px;
            .l-h(42px);
            margin: 40px auto;
            background: rgb(255, 104, 1);
            .tc;
            font-size: 16px;
            color: #fff;
            cursor: pointer;
        }
    }
}
</style>