<template>
    <div class="personCenter">
        <div class="head clearfix">
            <div class="head-left clearfix">
                <div class="head-left-1">
                    <img src="~@/assets/img/admin.png">
                </div>
                <div class="head-left-2">
                    <p class="p-1">
                        您好，{{userInfo.username}}
                        <img src="~@/assets/img/vip-0.png" v-show="userInfo.vip_level === 0" />
                        <img src="~@/assets/img/vip-1.png" v-show="userInfo.vip_level === 1" />
                        <router-link to="/geren/vip" v-show="userInfo.vip_level === 0" tag="span">升级</router-link>
                    </p>
                    <ul class="clearfix">
                        <li>
                            <p>可用担保金额：<span></span></p>
                        </li>
                        <li>
                            <p>积分余额：<span>{{userInfo.gold}}</span></p>
                        </li>
                    </ul>
                    <p class="p-2">冻结中担保金：</p>
                </div>
                <div class="head-left-3">
                    <el-button size="small" type="primary" class="head-left-3-btn" @click="$router.push('/geren/goldCoinDetails')">充值</el-button>
                    <br />
                    <el-button size="small" plain class="head-left-3-btn">提现</el-button>
                </div>
            </div>
            <div class="head-right">
                <ul>
                    <li>
                        <img src="~@/assets/icon/gift.png">
                        <span>邀请有奖</span>
                        <br />
                        <span>获取免费积分</span>
                    </li>
                    <li>
                        <img src="~@/assets/icon/gzh.png">
                        <span>微信公众号</span>
                        <br />
                        <span>关注免费得积分</span>
                    </li>
                    <li>
                        <img src="~@/assets/icon/wechat.png">
                        <span>加客服好友</span>
                        <br />
                        <span>人工精准对接</span>
                    </li>
                </ul>
            </div>
        </div>
        <p class="p-3">邀请码：{{userInfo.invite_url | code}}，<span @click="copy(userInfo.invite_url)">点击复制邀请链接</span></p>
        <p class="p-4">邀请商家成功注册送7天VIP会员</p>
        <div class="body">
            <div class="body-con">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>使用明细</span>
                        <el-button style="float: right; padding: 3px 0" type="text">查看更多></el-button>
                    </div>
                    <ul>
                        <li>
                            <p class="p-5">竞品已监控</p>
                            <p class="p-6">0<span>天</span></p>
                        </li>
                        <li>
                            <p class="p-5">黑号已查询</p>
                            <p class="p-6">{{userInfo.black_num}}<span>次</span></p>
                        </li>
                        <li>
                            <p class="p-5">流量已发布</p>
                            <p class="p-6">{{userInfo.lieliu_count}}<span>单</span></p>
                        </li>
                    </ul>
                </el-card>
                <img src="~@/assets/img/ad-1.png" class="ad">
            </div>
            <div class="body-con">
                <el-card class="box-card box-card2">
                    <div slot="header" class="clearfix">
                        <span>邀请明细</span>
                        <el-button style="float: right; padding: 3px 0" type="text">查看更多></el-button>
                    </div>
                    <ul>
                        <router-link tag="li" to="/geren/Invitation">
                            <img src="~@/assets/icon/p.png" class="p">
                            <p class="p-5">累计邀请人数</p>
                            <p class="p-6">{{userInfo.invite_count}}<span>人</span></p>
                        </router-link>
                        <li>
                            <img src="~@/assets/icon/m.png" class="m">
                            <p class="p-5">累计获得奖励 (积分)</p>
                            <p class="p-6">0<span>个</span></p>
                        </li>
                        <li>
                            <el-button size="small" type="primary" class="invite">立即邀请</el-button>
                        </li>
                    </ul>
                </el-card>
                <img src="~@/assets/img/ad-2.png" class="ad">
            </div>
        </div>
    </div>
</template>

<script>
import { isEmpty } from "@/util/util";
import copy from "clipboard-copy";
const qs = require("qs");

export default {
    data() {
        return {
            userInfo: {}
        }
    },
    created() {
        this.getUserInfo();
        this.getGoldPrice();
    },
    filters: {
        code(val) {
            return isEmpty(val) ? "" : qs.parse(val.split("?")[1]).invite_code;
        }
    },
    methods: {
        async getGoldPrice() {
            var res = await this.$fetch.post("/price/getGoldPrice");
            0 === res.code && (this.orderMsg = res.data);
        },
        async getUserInfo() {
            var res = await this.$fetch.post("/user/getUserInfo");
            0 === res.code && (this.userInfo = res.data);
        },
        copy(val) {
            copy(val);
            this.$message("复制成功");
        }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");

.personCenter {
    margin-top: 38px;
    padding: 0 20px;
    .head {
        overflow: hidden;
        .head-left {
            overflow: hidden;
            .fl;
            border-right: 1px solid #ddd;
        }
        .head-left-1 {
            .fl;
        }
        .head-left-2 {
            .fl;
            margin-left: 10px;
            .p-1 {
                font-size: 16px;
                font-weight: bold;
                color: #333;
                img {
                    margin-left: 8px;
                    vertical-align: -5px;
                }
                span {
                    padding-left: 7px;
                    color: #fe0102;
                    font-size: 12px;
                    text-decoration: underline;
                }
            }
            ul {
                margin-top: 15px;
                li {
                    width: 160px;
                    .fl;
                    font-size: 14px;
                    color: #333;
                    &:first-child {
                        border-right: 1px solid #ddd;
                    }
                    &:nth-child(2) {
                        .tc;
                    }
                }
            }
            .p-2 {
                margin-top: 10px;
                font-size: 12px;
                color: #999;
            }
        }
        .head-left-3 {
            .fl;
            margin: 0 20px;
            .head-left-3-btn {
                margin-top: 10px;
            }
        }
        .head-right {
            .fl;
            ul {
                display: flex;
            }
            li {
                width: 148px;
                padding: 18px 0 18px 18px;
                img {
                    .fl;
                    margin-top: 4px;
                }
                span {
                    &:nth-child(2) {
                        color: #ff6801;
                        font-size: 14px;
                        padding-left: 9px;
                    }
                    &:nth-child(4) {
                        color: #999;
                        font-size: 12px;
                        padding-left: 9px;
                        padding-top: 3px;
                    }
                }
            }
        }
    }
    .p-3 {
        font-size: 14px;
        color: #333;
        margin-top: 15px;
        span {
            text-decoration: underline;
            color: red;
            cursor: pointer;
        }
    }
    .p-4 {
        color: #ff6801;
        font-size: 14px;
        font-weight: bold;
        margin-top: 7px;
    }
    .body {
        margin-top: 20px;
        .body-con {
            display: flex;
            margin-bottom: 27px;
            .box-card {
                width: 60%;
                margin-right: 20px;
                li {
                    .fl;
                    width: 33%;
                    .tc;
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
                .p,
                .m {
                    .fl;
                    margin-right: 20px;
                    margin-top: 10px;
                }
                .invite {
                    margin-top: 15px;
                }
            }
            .box-card2 {
                li {
                    .tl;
                    width: 40%;
                    &:last-child {
                        width: 20%;
                    }
                }
            }
        }
    }
}
</style>