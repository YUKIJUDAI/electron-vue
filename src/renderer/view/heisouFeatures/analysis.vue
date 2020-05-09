<template>
    <div class="analysis">
        <el-dialog title="选择监控竞品宝贝" :visible.sync="addFlag" width="1024px" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="handleClose">
            <el-table :data="goodsList" border style="width: 100%" class="goodsInfo">
                <el-table-column prop="" label="主图" width="70">
                    <template slot-scope="scope">
                        <img class="picture" :src="scope.row.pictUrl | hasHttp" alt="" />
                    </template>
                </el-table-column>
                <el-table-column prop="itemId" label="宝贝ID" width="110">
                </el-table-column>
                <el-table-column prop="goods_name" label="宝贝标题" width="210">
                </el-table-column>
                <el-table-column prop="shop_name" label="店铺名称" width="140">
                </el-table-column>
                <el-table-column prop="create_time" label="开始日期">
                </el-table-column>
                <el-table-column prop="last_crawler_time" label="截至日期">
                </el-table-column>
                <el-table-column prop="crawler_days" label="采集天数" width="70">
                </el-table-column>
                <el-table-column prop="" label="昨日监控" width="70">
                    <template slot-scope="scope">
                        {{["未监控","已监控"][+scope.row.isMonitored]}}
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作" width="110">
                    <template slot-scope="scope">
                        <el-button type="primary" plain @click="getCompeteGoodsInfo(scope.row)">开始获取</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>日志记录</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="logList = []">清空</el-button>
                </div>
                <div v-for="(item,i) in logList" :key="i" class="text item">
                    {{item}}
                </div>
            </el-card>
        </el-dialog>
        <div class="info">
            <span class="info-title">宝贝信息</span>
            <el-button type="primary" class="info-btn" @click="monitoringAuthority('addFlag',true)">选择宝贝</el-button>
            <div class="competition-info" v-show="goodsInfo.itemId">
                <img :src="goodsInfo.pictUrl | hasHttp">
                <div>
                    <span class="title">{{goodsInfo.goods_name}}</span>
                    <br />
                    <span class="shop-name">{{goodsInfo.shop_name}}</span>
                    <br />
                    <span class="shop-id">ID:{{goodsInfo.itemId}}</span>
                </div>
            </div>
        </div>
        <div class="form">
            <el-form :inline="true" :model="form">
                <el-form-item label="分析周期">
                    <el-select v-model="form.date" size="small" style="width:100px">
                        <el-option label="昨天" value="1"></el-option>
                        <el-option label="30天" value="31"></el-option>
                        <el-option label="60天" value="66"></el-option>
                        <el-option label="90天" value="91"></el-option>
                        <el-option label="自定义" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <!-- 日期选择器 -->
                <el-form-item>
                    <el-date-picker v-model="form.dateValue" type="daterange" value-format="yyyy-MM-dd" format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small"> </el-date-picker>
                </el-form-item>
                <el-button type="primary" @click="monitoringAuthority('t',new Date().getTime())">开始查询</el-button>
                <el-button type="primary" plain @click="monitoringAuthority('prevDay')">分析前一天</el-button>
                <el-button type="primary" plain @click="monitoringAuthority('nextDay')">分析后一天</el-button>
                <!-- <el-button type="primary" plain>导出excel</el-button> -->
            </el-form>
        </div>
        <div class="tab">
            <ul>
                <li :class="{active:tabIndex === 0}" @click="changeTab(0)">数据源</li>
                <li :class="{active:tabIndex === 1}" @click="changeTab(1)">关键词分析</li>
                <li :class="{active:tabIndex === 2}" @click="changeTab(2)">词根分析</li>
                <li :class="{active:tabIndex === 3}" @click="changeTab(3)">流量结构分析</li>
                <li :class="{active:tabIndex === 4}" @click="changeTab(4)">黑搜报表</li>
                <li :class="{active:tabIndex === 5}" @click="changeTab(5)">宝贝信息</li>
                <!-- <li :class="{active1:tabIndex === 6}" @click="changeTab(6)">黑搜分析<i class="hot"></i></li> -->
            </ul>
        </div>
        <div class="data" :is="tempList[tabIndex]" :itemId="goodsInfo.itemId" :date_range="form.date_range" :t="t" :title="goodsInfo.goods_name"></div>
    </div>
</template>

<script>
const { from } = require("rxjs");
import moment from "moment";
import { getAllWindows, fromId, getLog } from "@/util/electronFun";
import { monitoringAuthority } from "@/util/util";

import dataSource from "@/components/heisou/dataSource";
import keywordAnalysis from "@/components/heisou/keywordAnalysis";
import rootAnalysis from "@/components/heisou/rootAnalysis";
import trafficStructureAnalysis from "@/components/heisou/trafficStructureAnalysis";
import report from "@/components/heisou/report";
import goodsInfo from "@/components/heisou/goodsInfo";
import heisouAnalysis from "@/components/heisou/heisouAnalysis";

export default {
    data() {
        return {
            form: {
                date: "",
                dateValue: "",
                date_range: ""
            },
            tabIndex: 0,
            tempList: [
                dataSource,
                keywordAnalysis,
                rootAnalysis,
                trafficStructureAnalysis,
                report,
                goodsInfo,
                heisouAnalysis
            ],
            // 竞品列表
            goodsList: [],
            // 竞品获取中flag
            addingFlag: false,
            goodsInfo: {
                goods_name: "", pictUrl: "", shop_name: "", itemId: ""
            },

            // 添加弹窗
            addFlag: false,
            // 日志
            logList: [],
            logFlag: true,

            t: ""
        }
    },
    mounted() {
        this.form.date = "1";
        this.getList();
        // 获取日志
        getLog(this);
    },
    methods: {
        changeTab(index) {
            this.tabIndex = index;
        },
        // 权限
        monitoringAuthority(type, ...arg) {
            monitoringAuthority(this, type, ...arg);
        },
        // 获取列表数据
        getList() {
            this.$http.post("/collect/getCompeteGoodsList", {}).then(res => {
                0 === res.code && (this.goodsList = res.data);
            });
        },
        // 上一天
        prevDay() {
            this.form.dateValue = [moment(this.form.dateValue[0]).subtract(1, 'days').format('YYYY-MM-DD'), moment(this.form.dateValue[1]).subtract(1, 'days').format('YYYY-MM-DD')];
            this.t = new Date().getTime();
        },
        nextDay() {
            this.form.dateValue = [moment(this.form.dateValue[0]).add(1, 'days').format('YYYY-MM-DD'), moment(this.form.dateValue[1]).add(1, 'days').format('YYYY-MM-DD')];
            this.t = new Date().getTime();
        },
        // 获取竞品数据
        getCompeteGoodsInfo(data) {
            if (this.addingFlag) {
                this.$message.error("请等待当前任务完成后再试");
                return;
            }
            this.goodsInfo = { goods_name: data.goods_name, pictUrl: data.pictUrl, shop_name: data.shop_name, itemId: data.itemId };
            this.$confirm('是否获取新数据后再分析?', '提示', {
                confirmButtonText: '获取数据',
                cancelButtonText: '直接分析'
            }).then(() => {
                this.addingFlag = true;
                this.logList = [];
                this.logFlag = true;
                from(getAllWindows()).subscribe(i => {
                    fromId(i.id, "add-monitor-detail", [data.goods_name]);
                });
            }).catch(() => {
                this.handleClose();
            });
        },
        // 竞品关闭
        handleClose() {
            if (this.addingFlag) {
                this.$message.error("请等待当前任务完成后再关闭");
                return;
            }
            this.logList = [];
            this.logFlag = true;
            this.addFlag = false;
        }
    },
    watch: {
        "form.date"(val) {
            if (val !== "0") {
                this.form.dateValue = "";
                this.form.date_range = moment().subtract(val, 'days').format('YYYY-MM-DD') + "|" + moment().subtract(1, 'days').format('YYYY-MM-DD');
            }
        },
        "form.dateValue"(val) {
            if (Array.isArray(val)) {
                this.form.date = "0";
                this.form.date_range = val[0] + "|" + val[1];
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");
.analysis {
    margin: 0 15px;
    margin-top: 20px;
    .info {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: nowrap;
    }
    .info-title {
        padding-right: 20px;
        font-size: 14px;
        color: #333;
        .l-h(100px);
    }
    .info-btn {
        margin-right: 20px;
        height: 36px;
    }
    .competition-info {
        img {
            .wh(100px);
            .fl;
            margin-right: 13px;
        }
        div {
            .fl;
        }
        .title {
            .dib;
            font-size: 14px;
            color: #188fff;
        }
        .shop-name {
            .dib;
            margin-top: 10px;
            font-size: 13px;
            color: #999;
        }
        .shop-id {
            .dib;
            margin-top: 30px;
            font-size: 13px;
            color: #999;
        }
    }
    .form {
        margin-top: 20px;
    }
    .tab {
        margin-top: 30px;
        border-bottom: 2px solid var(--themeColor);
        height: 30px;
        li {
            .fl;
            background: rgba(255, 105, 2, 0.08);
            border-radius: 4px 4px 0px 0px;
            color: var(--themeColor);
            .l-h(30px);
            padding: 0 15px;
            margin-right: 15px;
            font-size: 14px;
            .rel;
            cursor: pointer;
            &::after {
                content: "";
                position: absolute;
                top: 0;
                right: -15px;
                width: 0;
                height: 0;
                border-bottom: 30px solid rgba(255, 105, 2, 0.08);
                border-right: 15px solid transparent;
            }
            .hot {
                background: url("~@/assets/icon/hot.gif");
                width: 26px;
                height: 12px;
                margin-left: 5px;
                vertical-align: -1px;
                .dib;
            }
        }
        .active {
            background: var(--themeColor);
            color: #fff;
            &::after {
                border-bottom: 30px solid var(--themeColor);
            }
        }
        .active1 {
            background: rgba(223, 63, 49, 1);
            color: #fff;
            &::after {
                border-bottom: 30px solid rgba(223, 63, 49, 1);
            }
        }
    }
    .box-card {
        margin-top: 20px;
    }
    .goodsInfo {
        height: 300px;
        overflow-y: auto;
    }
    .picture {
        .wh(40px);
    }
}
</style>