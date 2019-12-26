<template>
    <div class="analysis">
        <div class="info">
            <span class="info-title">宝贝信息</span>
            <el-button type="primary" class="info-btn">选择宝贝</el-button>
            <div class="competition-info">
                <img src="">
                <span class="title">腕力球100公斤200健身60男减压自启动静音臂力手腕锻炼握力器离心</span>
                <br />
                <span class="shop-name">日轮九山旗舰店</span>
                <br />
                <span class="shop-id">ID:625415124947</span>
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
                <el-button type="primary">开始查询</el-button>
                <el-button type="primary" plain>分析前一天</el-button>
                <el-button type="primary" plain>分析后一天</el-button>
                <el-button type="primary" plain>导出excel</el-button>
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
                <li :class="{active:tabIndex === 6}" @click="changeTab(6)">黑搜分析<i class="hot"></i></li>
            </ul>
        </div>
        <div class="data" :is="tempList[tabIndex]"></div>
    </div>
</template>

<script>
import dataSource from "@/components/heisou/dataSource";
import keywordAnalysis from "@/components/heisou/keywordAnalysis";
import rootAnalysis from "@/components/heisou/rootAnalysis";
import trafficStructureAnalysis from "@/components/heisou/trafficStructureAnalysis";
import report from "@/components/heisou/report";

export default {
    data() {
        return {
            form: {},
            tabIndex: 4,
            tempList: [dataSource, keywordAnalysis, rootAnalysis, trafficStructureAnalysis, report]
        }
    },
    methods: {
        changeTab(index) {
            this.tabIndex = index;
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
        border-bottom: 2px solid #ff6902;
        height: 30px;
        li {
            .fl;
            background: rgba(255, 105, 2, 0.08);
            border-radius: 4px 4px 0px 0px;
            color: #ff6902;
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
            background: rgba(255, 105, 2, 1);
            color: #fff;
            &::after {
                border-bottom: 30px solid rgba(255, 105, 2, 1);
            }
        }
    }
}
</style>