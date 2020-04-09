<template>
    <div class="goldCoinDetails">
        <div class="info">
            <ul class="clearfix">
                <li>
                    <img src="~@/assets/icon/p-1.png" class="p">
                    <p class="p-5">可用余额</p>
                    <p class="p-6">{{data.gold}}</p>
                </li>
                <li>
                    <img src="~@/assets/icon/m-2.png" class="m">
                    <p class="p-5">收入(积分)</p>
                    <p class="p-6">{{data.gold_income}}</p>
                </li>
                <li class="no-border">
                    <img src="~@/assets/icon/m-3.png" class="v">
                    <p class="p-5">支出(积分)</p>
                    <p class="p-6">{{data.gold_outlay}}</p>
                </li>
                <li class="no-border last-li">
                    <el-button size="small" type="primary" class="invite" @click="dialogVisible = true">立即充值</el-button>
                </li>
            </ul>
        </div>
        <div class="goldCoinDetails-table">
            <el-table border style="width: 100%" :data="data.items">
                <el-table-column prop="create_time" label="交易时间" align="center">
                </el-table-column>
                <el-table-column prop="type" label="交易类型" align="center">
                </el-table-column>
                <el-table-column prop="amount" label="交易金额（积分）" align="center">
                </el-table-column>
                <el-table-column prop="balance" label="账户余额（元）" align="center">
                </el-table-column>
                <el-table-column prop="mark" label="说明" align="center">
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination background layout="prev, pager, next" :page-count="total_pages" :current-page.sync="page" @current-change="getList">
            </el-pagination>
        </div>
        <el-dialog :visible.sync="dialogVisible" title="积分充值" width="690px" :before-close="handleClose">
            <div class="recharge" v-if="paying">
                <p class="p1">积分不可提现。1人民币等于{{orderMsg.value}}积分。</p>
                <p class="p2">充值账号：<span>{{userPhone}}</span></p>
                <p class="p3">充值金额<input type="number" placeholder="请输入不小于10的整数" v-model="num" maxlength="9"></p>
                <p class="p4">充值总额<span>{{num}}元</span> （充值￥{{num}}元，获得{{num*orderMsg.value}}积分)</p>
                <div class="pay-way">
                    <p>支付方式：</p>
                    <div @click="pay_type = 1" class="pay-way-o" :class="{active:pay_type === 1}">支付宝</div>
                    <div @click="pay_type= 2" class="pay-way-o" :class="{active:pay_type === 2}">微信支付</div>

                    <div class="pay" @click="paying = false">开通</div>
                </div>
            </div>
            <pay v-else :pay_type="pay_type" :num="num" :serve_id="orderMsg.id"></pay>
        </el-dialog>
    </div>
</template>

<script>
import pay from "@/components/others/pay";

export default {
    components: { pay },
    data() {
        return {
            total_pages: 1,
            page: 1,
            data: { items: [] },
            paying: true,
            pay_type: 1,
            orderMsg: {},
            num: 10,
            dialogVisible: false
        }
    },
    computed: {
        userPhone() {
            return this.$store.state.userInfo.user_phone;
        }
    },
    created() {
        this.getList();
        this.getGoldPrice();
    },
    methods: {
        async getGoldPrice() {
            var res = await this.$fetch.post("/price/getGoldPrice");
            0 == res.code && (this.orderMsg = res.data);
        },
        async getList() {
            var res = await this.$fetch.post("/user/getIncomeList", { page: this.page });
            0 == res.code && (this.data = res.data, this.total_pages = res.data.total_pages);
        },
        handleClose() {
            this.dialogVisible = false;
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

.goldCoinDetails {
    padding: 0 20px;
    .info {
        margin-top: 30px;
        border: 1px solid #fe9f12;
        overflow: hidden;
        ul {
            margin: 27px 0;
        }
        li {
            .fl;
            width: 22%;
            padding: 0 3%;
            border-right: 1px solid #ffcc80;
            .p-5 {
                font-size: 14px;
                color: #666;
            }
            .p-6 {
                font-size: 24px;
                color: #ff6801;
                margin-top: 10px;
                span {
                    font-size: 14px;
                    color: #666;
                }
            }
        }
        .no-border {
            border: 0;
        }
        .last-li {
            width: 5%;
            padding: 0;
        }
        .p,
        .m,
        .v {
            .fl;
            margin-right: 20px;
            margin-top: 10px;
        }
        .invite {
            margin-top: 15px;
            width: 110px;
            height: 34px;
            font-size: 16px;
        }
    }
    .goldCoinDetails-table {
        margin-top: 20px;
    }
    .pagination {
        overflow: hidden;
        padding-top: 20px;
        text-align: center;
    }
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
                color: #ff6801;
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
                color: #ff6801;
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