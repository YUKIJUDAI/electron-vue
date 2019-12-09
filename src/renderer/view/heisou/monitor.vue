<template>
    <div class="heisou-monitor">
        <el-dialog title="新增竞品配置监控" :visible.sync="addFlag" width="700px">
            <div class="add">
                <el-form ref="form" :model="add" label-width="80px" :inline="true">
                    <el-form-item label="竞品ID">
                        <el-input type="textarea" :rows="5" placeholder="请输入竞品ID,多个竞品已','号隔开" v-model="add.id" style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item label="监控天数">
                        <el-select v-model="add.time" placeholder="请选择" style="width:200px">
                            <el-option label="最近30天" value="30"></el-option>
                            <el-option label="最近60天" value="60"></el-option>
                            <el-option label="最近90天" value="90"></el-option>
                        </el-select>
                        </br>
                        </br>
                        <el-button type="primary" size="small" v-if="addingFlag">获取中。。。</el-button>
                        <el-button type="primary" size="small" @click="addMonitor" v-else>开始获取</el-button>
                    </el-form-item>
                </el-form>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>日志记录</span>
                    </div>
                    <div v-for="(item,i) in logList" :key="i" class="text item">
                        {{item}}
                    </div>
                </el-card>
            </div>
        </el-dialog>

        <el-dialog title="查看数据趋势" :visible.sync="treadFlag" width="1000px">
            <div class="tread">
                <div class="tread-title clearfix">
                    <div class="tread-title-left">
                        <img :src="treadActiveData.pictUrl">
                        <div>
                            <p>{{treadActiveData.goods_name}}</p>
                            <p>{{treadActiveData.shop_name}}</p>
                        </div>
                    </div>
                    <div class="tread-title-right">
                        <span class="day">天数</span>
                        <el-select v-model="tread" size="small" style="width:140px" @change="resetCharts">
                            <el-option label="30天" value="30"></el-option>
                            <el-option label="60天" value="60"></el-option>
                            <el-option label="90天" value="90"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="tread-body">
                    <el-tabs v-model="treadActiveName" type="border-card">
                        <el-tab-pane label="图表" name="first">
                            <div id="echarts" style="height:500px;padding:0 50px;"></div>
                        </el-tab-pane>
                        <el-tab-pane label="显示列表" name="second">显示列表</el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </el-dialog>

        <!-- 上部表单开始 -->
        <div class="table-form">
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-form-item label="新增竞品">
                    <el-button type="primary" size="small" @click="addFlag = true">新增商品监控</el-button>
                    <el-button type="info" plain size="small">更新数据</el-button>
                    <el-button type="info" plain size="small" @click="opensycm">打开生意参谋</el-button>
                </el-form-item>
                </br>
                <!-- 日期下拉 -->
                <el-form-item label="监控日期">
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
                </br>
                <!-- 单选框 -->
                <el-form-item label="店铺分类">
                    <el-select v-model="form.shop" size="small" style="width:200px">
                        <el-option label="昨天" value=""></el-option>
                        <el-option label="前天" value=""></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类目分类">
                    <el-select v-model="form.leimu" size="small" style="width:200px">
                        <el-option label="昨天" value=""></el-option>
                        <el-option label="前天" value=""></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="宝贝ID">
                    <el-input v-model="form.itemId" size="small" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="关键词搜索">
                    <el-input v-model="form.keywords" size="small" style="width:200px"></el-input>
                </el-form-item>
                </br>
                <!-- 按钮 -->
                <el-form-item label="查询表格">
                    <el-button type="primary" size="small" @click="getList">开始查询</el-button>
                    <el-button type="info" plain size="small">删除</el-button>
                    <el-button type="info" plain size="small">导出Excel</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 上部表单结束 -->

        <!-- 下部表格开始 -->
        <div class="table-content">
            <el-table :data="table" style="width: 100%" border>
                <el-table-column type="selection" width="30" fixed> </el-table-column>
                <el-table-column label="查看趋势" width="90" fixed>
                    <template slot-scope="scope">
                        <el-button @click="toCheckTrend(scope.row)" type="text" size="small">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="昨日监控" width="70" fixed>
                    <template slot-scope="scope">
                        {{["未监控","已监控"][+scope.row.isMonitored]}}
                    </template>
                </el-table-column>
                <el-table-column prop="monitor_days" label="监控天数" width="70" fixed> </el-table-column>
                <el-table-column label="主图" width="70" fixed>
                    <template slot-scope="scope">
                        <img class="picture" :src="scope.row.pictUrl" alt="" />
                    </template>
                </el-table-column>
                <el-table-column prop="itemId" label="宝贝ID" width="120" fixed> </el-table-column>
                <el-table-column prop="uvIndexNum" label="访客数" width="70" fixed> </el-table-column>
                <el-table-column prop="tradeNum" label="买家数" width="70" fixed> </el-table-column>
                <el-table-column prop="" label="支付金额" width="70" fixed> </el-table-column>
                <el-table-column prop="" label="客单价" width="70"> </el-table-column>
                <el-table-column prop="payRateRatio" label="转化率" width="70"> </el-table-column>
                <el-table-column prop="" label="UV价值" width="70"> </el-table-column>
                <el-table-column prop="goods_name" label="宝贝标题" width="200"> </el-table-column>
                <el-table-column prop="shop_name" label="店铺名称" width="120"> </el-table-column>
                <el-table-column prop="" label="类目名称" width="200"> </el-table-column>
                <el-table-column prop="start_time" label="开始时间" width="120"> </el-table-column>
                <el-table-column prop="end_time" label="截止时间" width="120"> </el-table-column>
            </el-table>
        </div>
        <!-- 下部表格结束 -->
        <div class="pagination">
            <el-pagination background layout="prev, pager, next" :page-count="total_pages" :current-page.sync="page" @current-change="getList">
            </el-pagination>
        </div>
    </div>
</template>

<script>
const { ipcRenderer, remote } = require("electron");
const { from } = require("rxjs");
const moment = require('moment');
const echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
require('echarts/lib/component/tooltip');

import factory from "@/util/factory";

export default {
    data() {
        return {
            addFlag: false,
            addingFlag: false,
            // 趋势
            treadFlag: false,
            tread: "30",
            treadActiveName: "first",
            treadActiveData: {},
            treadData: {},
            myChart: "",
            form: {
                date: "1",
                dateValue: "",
                date_range: "",
                itemId: "",
                keywords: ""
            },
            // 日志
            logList: [],
            logFlag: true,
            // 添加监控表单
            add: { time: "30" },
            // 表格数据
            table: [{ date: "1234" }],
            total_pages: 1,
            page: 1
        }
    },
    mounted() {
        this.getList();
        // 获取xhr信息后处理
        ipcRenderer.on('send-xhr-data', (event, type, params, data) => {
            if (factory.obj[type]) {
                typeof factory.obj[type].callback === "function" && factory.obj[type].callback(params, data);
            }
        });
        // 获取日志
        ipcRenderer.on("get-log", (event, data) => {
            // flag 0 成功  1进行中  2 失败
            if (data.flag === 1 && this.logFlag) {
                this.logList.push(data.msg);
            }
            if (data.flag === 0 && this.logFlag) {
                this.addingFlag = false;
                this.logFlag = false;
                this.logList.push(data.msg);
                this.$message.success(data.msg);
            }
            if (data.flag === 2 && this.logFlag) {
                this.addingFlag = false;
                this.logFlag = false;
                this.logList.push(data.msg);
                this.$message.error(data.msg);
            }
        });
    },
    methods: {
        opensycm() {
            ipcRenderer.send("open-sycm");
        },
        addMonitor() {
            if (!this.add.id) {
                this.$message.error("请输入竞品ID");
                return;
            }
            this.addingFlag = true;
            this.logFlag = true;
            this.logList = [];
            from(remote.BrowserWindow.getAllWindows()).subscribe(i => {
                remote.BrowserWindow.fromId(i.id).webContents.send("add-monitor", this.add);
            });
        },
        // 查看趋势
        toCheckTrend(data) {
            this.treadFlag = true;
            this.treadActiveData = data;
            this.$nextTick(() => {
                this.$http.post("/crawler/getTrend", { itemId: data.itemId }).then(res => {
                    if (0 === res.code) {
                        var arr = [];
                        for (let index = 0; index < 90; index++) {
                            arr.push(moment(res.data.last_date).subtract((1 * index + 1), 'days').format('YYYY-MM-DD'));
                        }
                        res.data.date = arr.reverse();
                        this.treadData = res.data;
                        this.myChart = echarts.init(document.getElementById('echarts'));
                        this.createCharts(false);
                    }
                });
            });
        },
        createCharts(flag) {
            var arr = JSON.parse(JSON.stringify(this.treadData));
            let option = {
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: arr.date.slice(-this.tread)
                },
                yAxis: [
                    {
                        name: '人',
                        type: 'value',
                        position: "left",
                        offset: 10
                    },
                    {
                        name: '元',
                        type: 'value',
                        position: "left",
                        offset: 40
                    },
                    {
                        name: '元',
                        type: 'value',
                        position: "right",
                        offset: 10
                    },
                    {
                        name: '%',
                        type: 'value',
                        position: "right",
                        offset: 40
                    }
                ],
                series: [
                    {
                        name: '访客数',
                        yAxisIndex: 0,
                        data: arr.uvIndexNum.slice(-this.tread),
                        type: 'line'
                    },
                    {
                        name: '支付金额',
                        yAxisIndex: 1,
                        data: arr.tradeNum.slice(-this.tread),
                        type: 'line'
                    },
                    {
                        name: '买家数',
                        yAxisIndex: 2,
                        data: arr.payByrCntIndexNum.slice(-this.tread),
                        type: 'line'
                    },
                    {
                        name: '转化率',
                        yAxisIndex: 3,
                        data: arr.payRateRatio.slice(-this.tread),
                        type: 'line'
                    }
                ]
            };
            this.myChart.setOption(option, flag);
        },
        resetCharts() {
            this.createCharts(true)
        },
        getList() {
            this.$http.post("/crawler/getCompeteGoods", Object.assign(this.form, { page: this.page })).then(res => {
                if (0 === res.code) {
                    this.table = res.data.items;
                    this.total_pages = res.data.total_pages;
                }
            });
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

.table-form {
    padding: 28px 50px;
    font-size: 0;
    background-color: #fff;
}
.table-content {
    margin-top: 10px;
    padding: 10px 50px;
    .picture {
        width: 40px;
    }
}
.pagination {
    padding-top: 20px;
    text-align: center;
}
.add {
    .add-left {
        .fl;
    }
}
.tread {
    .tread-title-left {
        .fl;
        width: 70%;
        img {
            .fl;
            .wh(60px);
        }
        div {
            margin-left: 20px;
            .fl;
            p {
                font-size: 16px;
                .l-h(30px);
            }
        }
    }
    .tread-title-right {
        .fl;
        .day {
            font-size: 16px;
            margin: 0 20px;
        }
    }
    .tread-body {
        margin-top: 50px;
    }
}
</style>