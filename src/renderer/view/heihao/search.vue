<template>
    <div class="heihao-search">
        <div class="search">
            <el-form :inline="true" label-width="80px" label-position="left">
                <el-form-item label="用户旺旺">
                    <el-input v-model="wangwang" size="small" style="width:495px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">立即查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="searched" v-if="searchFlag">
            <div class="info">
                <div class="info-con">
                    <div class="info-title">
                        <p class="info-title-p1">用户常规信息<span>（免费查询）</span></p>
                        <p class="info-title-p2">查询时间</p>
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
                <el-table :data="tableData" border style="width: 100%" :header-cell-style="{'text-align':'center','background':'#FF6801','border-color':'#FF6801','color':'#fff'}">
                    <el-table-column prop="pd" label="跑单">
                    </el-table-column>
                    <el-table-column prop="qz" label="敲诈">
                    </el-table-column>
                    <el-table-column prop="pz" label="骗子">
                    </el-table-column>
                    <el-table-column prop="dj" label="打假">
                    </el-table-column>
                    <el-table-column prop="cp" label="差评">
                    </el-table-column>
                    <el-table-column prop="pt" label="P图">
                    </el-table-column>
                    <el-table-column prop="jq" label="降权">
                    </el-table-column>
                </el-table>
                <p class="msg-result">此账号不是黑号，此次查询不消耗次数和VIP日查询次数</p>
            </div>
        </div>
        <div class="unsearch" v-else>
            <div class="introduction">
                <ul>
                    <li><i class="icon-star"></i>免费提供基础查询，如存在点数将自动执行深度查询；</li>
                    <li><i class="icon-star"></i>深度查询结果为黑号，将扣除1次次数；</li>
                    <li><i class="icon-star"></i>VIP用户深度查询出黑号，优先扣除1次当日剩余次数，剩余次数不足将扣1个点数； </li>
                    <li><i class="icon-star"></i>深度查询结果不是黑号，不扣点数和当日剩余次数 ；</li>
                    <li><i class="icon-star"></i>当日重复查询同一账号，不会重复计费。</li>
                </ul>
            </div>
            <div class="information-desk">
                <div class="information-title">
                    <p class="information-title-p1">黑号查询信息台</p>
                    <p class="information-title-p2">2019-12-13 更新</p>
                </div>
                <div class="information-con">
                    <p>累计可疑号总数：<span>9468161</span> (昨日新增：<span>14958</span>) <br />昨日查出黑号：<span>1709</span> ，昨日查出黑号比例：<span>11.43%</span> </br>昨日已帮商家挽回经济损失约：<span>194.454 万元</span></p>
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
export default {
    data() {
        return {
            wangwang: "",
            tableData: [],
            baseInfo: {},
            searchFlag: false,
            blackNum: 0
        }
    },
    computed: {
        vip_level() {
            return this.$store.state.userInfo.vip_level;
        }
    },
    mounted() {
        this.$fetch.post("/user/getBlackNum").then(res => {
            0 === res.code && (this.blackNum = +res.data);
        });
    },
    methods: {
        // 获取淘宝会员信息
        getBaseInfo() {
            this.$fetch.post("/heisou/baseInfo", { wangwang: this.wangwang }).then((res) => {
                if (0 === res.code) {
                    this.baseInfo = res.data;
                    this.vip_level === 0 && this.$message.info("您还有" + (this.blackNum - 1) + "次可用,充值会员后可无限次使用");
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        // 获取打标信息
        getMarking() {
            this.$fetch.post("/heisou/find", { wangwang: this.wangwang }).then((res) => {
                if (0 === res.code) {
                    this.tableData = [res.data]
                } else {
                    this.$message.error(res.msg);
                }
            });
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
    padding: 0 20px;
    .search {
        .tl;
        font-size: 0;
        padding-top: 40px;
    }
    .info {
        margin-top: 25px;
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
            color: #ff6801;
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
        height: 180px;
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
                color: #ff6801;
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