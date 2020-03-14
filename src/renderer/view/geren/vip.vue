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
            <paytel v-if="pay" :pay_type="pay_type" :serve_id="price[checked].id"></paytel>
            <div class="recharge-1" v-else>
                <div class="account clearfix">
                    <p>开通账号：<span>{{$store.state.userInfo.user_phone}}</span></p>
                    <p>开通时常：<span>{{price[checked].value}}</span></p>
                    <p>到期时间：<span>{{price[checked].vip_end_time}}</span></p>
                </div>
                <ul class="list clearfix">
                    <li :class="{checked:checked === i}" v-for="(item,i) in price" :key="i" @click="checked = i">
                        <img src="~@/assets/icon/checked.png" class="check" v-show="checked === i">
                        <div>{{item.price}}<span>元</span></div>
                        <p>{{item.value}}</p>
                    </li>
                </ul>
                <div class="pay-way">
                    <p>支付方式：</p>
                    <div @click="pay_type = 1" class="pay-way-o" :class="{active:pay_type === 1}">支付宝</div>
                    <div @click="pay_type= 2" class="pay-way-o" :class="{active:pay_type === 2}">微信支付</div>

                    <div class="pay" @click="toPay()">开通</div>
                    <div class="protocol">
                        <el-checkbox v-model="protocol">同意《服务条例》</el-checkbox>
                    </div>

                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>

import paytel from "@/components/others/pay";

export default {
    components: { paytel },
    data() {
        return {
            dialogVisible: false,
            protocol: true,
            pay_type: 1,
            price: [],
            pay: false,
            checked: 0
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
            this.pay = true;
        }
    },
    watch: {
        pay(val) {
            if (!val) {
                return;
            }
            
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
    .recharge-1 {
        padding: 0 20px;
        .account {
            font-size: 14px;
            color: #333;
            font-weight: bold;
            display: flex;
            justify-content: space-between;
            span {
                color: #ff6801;
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
                border: 1px solid #ff6801;
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
            background: rgb(255, 104, 1);
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
}
</style>