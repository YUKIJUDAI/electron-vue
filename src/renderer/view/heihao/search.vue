<template>
    <div class="heihao-search">
        <div class="search">
            <el-form :inline="true" label-width="80px" label-position="left">
                <el-form-item label="用户旺旺">
                    <el-input v-model="wangwang" size="small" style="width:495px" placeholder="请输入要查询的黑号旺旺"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">立即查询</el-button>
                </el-form-item>
            </el-form>
            <div class="nums">
                <p>今日剩余：<span>{{+blackNum.type > 0 ? blackNum.type + '/' + blackNum.black_limit + '次，高级会员享受无限次查询' : '无限制'}}</span></p>
                <p v-show="vip_level === 0">
                    <router-link tag="span" to="/geren/vip">立即开通</router-link>
                </p>
            </div>
        </div>
        <div class="searched" v-if="searchFlag">
            <div class="info">
                <div class="info-con">
                    <div class="info-title">
                        <p class="info-title-p1">用户常规信息<span>（免费查询）</span></p>
                        <p class="info-title-p2">查询时间：{{baseInfo.time}}</p>
                    </div>
                    <ul class="info-ul">
                        <li>
                            <p>旺旺：<span>{{baseInfo.wang}}</span></p>
                        </li>
                        <li>
                            <p>是否实名：<span>{{["未实名","已实名"][+baseInfo.isAuth]}}</span></p>
                        </li>
                        <li>
                            <p>周单均数：<span>{{baseInfo.weekNum}}</span></p>
                        </li>
                        <li>
                            <p>单数：<span>{{baseInfo.goodNum}}</span></p>
                        </li>
                        <li>
                            <p>性别：<span>{{baseInfo.sex}}</span></p>
                        </li>
                        <li>
                            <p>买家信誉：<span>{{baseInfo.creditLevel}}</span></p>
                        </li>
                        <li>
                            <p>月单均值：<span>{{baseInfo.monthNum}}</span></p>
                        </li>
                        <li>
                            <p>中差评价：<span>{{baseInfo.receiveBadNum}}</span></p>
                        </li>
                        <li>
                            <p>地区：<span>{{baseInfo.area}}</span></p>
                        </li>
                        <li>
                            <p>会员等级：<span>{{baseInfo.vLevel}}</span></p>
                        </li>
                        <li>
                            <p>注册时间：<span>{{baseInfo.registerDate}}</span></p>
                        </li>
                        <li>
                            <p>好评数：<span>{{baseInfo.goodRate}}</span></p>
                        </li>
                        <li>
                            <p>淘龄：<span>{{baseInfo.tbAge}}</span></p>
                        </li>
                        <li>
                            <p>超级会员：<span>{{baseInfo.superVip}}</span></p>
                        </li>
                        <li>
                            <p>最后登录：<span>{{baseInfo.lastLoginTime}}</span></p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="msg">
                <div class="msg-title">
                    <p class="msg-title-p1">用户打标情况<span>（深度付费查询）</span></p>
                    <p class="msg-title-p2" @click="report">【这个是黑号，我有证据，我要举报】</p>
                </div>
                <el-table :data="tableData" border style="width: 100%" header-cell-style="headStyle2">
                    <el-table-column prop="pd" label="跑单">
                        <template slot-scope="scope" slot="header">
                            跑单
                            <el-tooltip content="拿到商家的返款，就恶意退款跑了" placement="top">
                                <i class="iconfont icon-wenhao"></i>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="qz" label="敲诈">
                        <template slot-scope="scope" slot="header">
                            敲诈
                            <el-tooltip content="用各种方式威胁你给钱" placement="top">
                                <i class="iconfont icon-wenhao"></i>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="pz" label="骗子">
                        <template slot-scope="scope" slot="header">
                            骗子
                            <el-tooltip content="用各种方式骗你钱了" placement="top">
                                <i class="iconfont icon-wenhao"></i>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="dj" label="打假">
                        <template slot-scope="scope" slot="header">
                            打假
                            <el-tooltip content="用各种方式威胁你给钱" placement="top">
                                <i class="iconfont icon-wenhao"></i>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="cp" label="差评">
                        <template slot-scope="scope" slot="header">
                            差评
                            <el-tooltip content="接完了单给了你差评进行要挟" placement="top">
                                <i class="iconfont icon-wenhao"></i>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="pt" label="P图">
                        <template slot-scope="scope" slot="header">
                            P图
                            <el-tooltip content="用工商，发票，字体，商标，假货各种方式来坑你钱了" placement="top">
                                <i class="iconfont icon-wenhao"></i>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="jq" label="降权">
                        <template slot-scope="scope" slot="header">
                            降权
                            <el-tooltip content="被稽查系统判定虚假交易过导致商家单品降权的帐号，下面的数字为黑号捕手用户数，实际降权的店铺数是大于等于显示出来的数字的" placement="top">
                                <i class="iconfont icon-wenhao"></i>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
                <p class="msg-result" v-show="tableData.is_black === 0">此账号不是黑号，此次查询不消耗次数</p>
            </div>
        </div>
        <div class="unsearch" v-else>
            <div class="introduction">
                <ul>
                    <li><i class="icon-star"></i>会员提供无限制手动查询，API接口合作联系客服；</li>
                    <li><i class="icon-star"></i>查询结果仅供参考，每个软件号库不同，会存在差异；</li>
                    <li><i class="icon-star"></i>成功举报黑号赠送会员1个月；</li>
                    <li><i class="icon-star"></i>建议结合超级打标功能使用：查号+打权重 超级打标 ；</li>
                </ul>
            </div>
            <div class="information-desk">
                <div class="information-title">
                    <p class="information-title-p1">黑号查询信息台</p>
                    <p class="information-title-p2">{{fake.heisou_time}} 更新</p>
                </div>
                <div class="information-con">
                    <p>累计可疑号总数：<span>{{fake.heisou_total}}</span> (昨日新增：<span>{{fake.heisou_add}}</span>) <br />昨日查出黑号：<span>{{fake.heisou_black}}</span> ，昨日查出黑号比例：<span>{{fake.heisou_lv}}</span> </br>昨日已帮商家挽回经济损失约：<span>{{fake.heisou_money}}</span></p>
                </div>
                <div class="information-prompt">
                    <p>
                        黑号危害：<br />
                        有问题的账号都会进入阿里蚁盾的异常账号监控中，补单过程中遇到过多黑号操作，轻则无流量，甚至降权，重则直接扣分永封店铺！<br />
                        所以补单第一个要求就是查询淘宝账号是不是淘宝黑号，是否有已降权店铺，信誉等级、待收货、评价、实名、登录IP等这些都要看一遍，安全补单才是长久之计！<br />
                    </p>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import moment from "moment";

export default {
    data() {
        return {
            // 旺旺号
            wangwang: "",
            // 表格数据
            tableData: [],
            // 基础数据
            baseInfo: {},
            // 是否已搜索flag
            searchFlag: false,
            // 剩余查询黑号次数
            blackNum: {},
            // 假数据
            fake: {}
        }
    },
    computed: {
        vip_level() {
            return this.$store.state.userInfo.vip_level;
        }
    },
    created() {
        this.getBlackNum();
        this.getFake();
    },
    methods: {
        // 获取剩余黑号查询次数
        async getBlackNum() {
            var res = await this.$fetch.post("/user/getBlackNum");
            0 === res.code && (this.blackNum = res.data);
        },
        // 获取假数据
        async getFake() {
            var res = await this.$fetch.post("/heisou/getFake");
            0 === res.code && (this.fake = res.data);
        },
        // 获取淘宝会员信息
        async getBaseInfo() {
            var res = await this.$fetch.post("/heisou/baseInfo", { wangwang: this.wangwang });
            if (0 !== res.code) {
                this.$message.error(res.msg);
                return;
            }
            this.baseInfo = res.data;
            this.baseInfo.time = moment().format('YYYY-MM-DD HH:MM:SS')
            this.vip_level !== 1 && this.getBlackNum();
        },
        // 获取打标信息
        async getMarking() {
            var res = await this.$fetch.post("/heisou/find", { wangwang: this.wangwang });
            0 === res.code ? this.tableData = [res.data] : this.$message.error(res.msg);
        },
        // 搜索
        search() {
            if (this.blackNum <= 0 && this.vip_level === 0) {
                this.$message.error("您的免费次数已用完,充值会员后可无限次使用");
                return;
            }
            if (this.wangwang === "") {
                this.$message.error("请输入旺旺号");
                return;
            }
            this.searchFlag = true;
            this.tableData = [];
            this.baseInfo = {};
            this.getMarking();
            this.getBaseInfo();
        },
        // 举报
        report() {
            if (this.wangwang === "") {
                this.$message.error("请输入旺旺号");
                return;
            }
            this.$router.push("/heihao/report?id=" + this.wangwang);
        }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");

.heihao-search {
    .search {
        .tl;
        font-size: 0;
        padding-top: 25px;
    }
    .nums {
        padding-bottom: 24px;
        margin-left: 80px;
        display: flex;
        font-size: 14px;
        color: #666;
        p {
            &:nth-of-type(2) {
                padding-left: 30px;
            }
        }
        span {
            color: var(--themeColor);
            cursor: pointer;
        }
    }
    .info {
        background: rgba(255, 248, 243, 1);
        border-radius: 20px;
        .info-con {
            padding: 34px;
        }
        .info-title {
            font-size: 0;
            height: 30px;
        }
        .info-title-p1 {
            .l-h(30px);
            .fl;
            font-size: 16px;
            font-weight: bold;
            color: #333;
            span {
                font-weight: normal;
                color: #999;
            }
        }
        .info-title-p2 {
            .fl;
            margin-left: 45px;
            .l-h(30px);
            font-size: 14px;
            color: #666;
        }
        .info-ul {
            font-size: 14px;
            height: 170px;
            padding-top: 36px;
            li {
                .fl;
                padding-bottom: 25px;
                width: 25%;
            }
            p {
                font-size: 14px;
                color: #666;
                span {
                    color: #333;
                    font-weight: bold;
                }
            }
        }
    }
    .msg {
        margin-top: 25px;
        .icon-wenhao {
            font-size: 12px;
        }
        .msg-title {
            font-size: 0;
            height: 30px;
            margin-bottom: 28px;
        }
        .msg-title-p1 {
            .l-h(30px);
            .fl;
            font-size: 16px;
            font-weight: bold;
            color: #333;
            span {
                font-weight: normal;
                color: #999;
            }
        }
        .msg-title-p2 {
            .fl;
            margin-left: 45px;
            .l-h(30px);
            font-size: 14px;
            font-weight: bold;
            color: var(--themeColor);
            text-decoration: underline;
            cursor: pointer;
        }
        .msg-result {
            margin-top: 18px;
            padding-bottom: 30px;
            font-size: 14px;
            color: #666;
        }
    }
    .introduction {
        width: 90%;
        height: 150px;
        background: rgba(255, 249, 245, 1);
        border-radius: 20px;
        ul {
            padding: 0 18px;
            padding-top: 22px;
        }
        li {
            font-size: 14px;
            color: #666;
            padding-bottom: 10px;
        }
        .icon-star {
            .dib;
            .wh(18px);
            .bg("~@/assets/icon/star.png");
            vertical-align: -3px;
            margin-right: 12px;
        }
    }
    .information-desk {
        margin-top: 25px;
        .information-title {
            font-size: 0;
            height: 30px;
        }
        .information-title-p1 {
            .l-h(30px);
            .fl;
            font-size: 16px;
            color: #333;
        }
        .information-title-p2 {
            .fl;
            margin-left: 21px;
            font-size: 12px;
            .l-h(30px);
            color: #999;
        }
        .information-con {
            padding: 24px 0 35px 0;
            border-bottom: 1px dashed #eee;
            font-size: 14px;
            color: #333;
            line-height: 26px;
            span {
                color: var(--themeColor);
            }
        }
        .information-prompt {
            padding: 18px 0;
            font-size: 12px;
            color: #999;
            line-height: 22px;
        }
    }
}
</style>