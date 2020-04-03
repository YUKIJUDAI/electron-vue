<template>
    <div class="heisou-monitor">
        <!-- 新增竞品监控 -->
        <el-dialog title="新增竞品配置监控" :visible.sync="addFlag" width="700px" :close-on-click-modal="false" :close-on-press-escape="false">
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
                        <el-button type="primary" size="small" @click="addMonitor(add,true)" v-else>开始获取</el-button>
                    </el-form-item>
                </el-form>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>日志记录</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="logList = []">清空</el-button>
                    </div>
                    <div v-for="(item,i) in logList" :key="i" class="text item">
                        {{item}}
                    </div>
                </el-card>
            </div>
        </el-dialog>

        <!-- 查看数据趋势 -->
        <el-dialog title="查看数据趋势" :visible.sync="treadFlag" width="900px" :before-close="treadClose">
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
                            <div id="echarts" style="height:400px;padding:0 50px;"></div>
                        </el-tab-pane>
                        <el-tab-pane label="显示列表" name="second">
                            <el-table :data="treadTable" style="width: 100%" border height="500">
                                <el-table-column prop="itemId" label="宝贝ID" width="120"> </el-table-column>
                                <el-table-column prop="analysis_time_str" label="日期" width="120"> </el-table-column>
                                <el-table-column prop="uvIndexNum" label="访客数"> </el-table-column>
                                <el-table-column prop="tradeNum" label="买家数"> </el-table-column>
                                <el-table-column prop="payAmount" label="支付金额"> </el-table-column>
                                <el-table-column prop="price" label="客单价"> </el-table-column>
                                <el-table-column prop="payRateRatio" label="转化率/%"> </el-table-column>
                                <el-table-column prop="uvPrice" label="UV价值"> </el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </el-dialog>

        <div class="my-data">
            <div class="data-detail clearfix">
                <div class="data-detail-1">
                    <img src="~@/assets/icon/monitor-1.png">
                    <span class="span-1">支付金额（元）</span>
                    <span class="span-2">{{~~shopInfo.today[4].payAmt.value | money}}</span>
                    <ul>
                        <li>行业排名 {{shopInfo.rank.payAmtRank.value === 0 ? "100+" : shopInfo.rank.payAmtRank.value}}</li>
                        <li>无线占比 {{shopInfo.wireless.payAmtWL.value}}</li>
                        <li>昨日全天 {{(~~shopInfo.yesterday.index.payAmt.value) | money}}</li>
                    </ul>
                </div>
                <div class="data-detail-2" id="data-detail-2"></div>
                <div class="data-detail-3">
                    <ul>
                        <li>
                            <img src="~@/assets/icon/monitor-2.png">
                            <span class="span-1">访客数</span>
                            <br />
                            <span class="span-2">{{shopInfo.today[0].uv.value}}</span>
                        </li>
                        <li>
                            <img src="~@/assets/icon/monitor-3.png">
                            <span class="span-1">支付订单数</span>
                            <br />
                            <span class="span-2">{{shopInfo.today[3].payOrdCnt.value}}</span>
                        </li>
                        <li>
                            <img src="~@/assets/icon/monitor-4.png">
                            <span class="span-1">浏览量</span>
                            <br />
                            <span class="span-2">{{shopInfo.today[2].pv.value}}</span>
                        </li>
                        <li>
                            <img src="~@/assets/icon/monitor-5.png">
                            <span class="span-1">转化率</span>
                            <br />
                            <span class="span-2">{{~~(shopInfo.today[3].payOrdCnt.value/shopInfo.today[0].uv.value * 100)}}%</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- 上部表单开始 -->
        <div class="table-form">
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-form-item label="新增竞品">
                    <el-button type="primary" size="small" @click="addDialog">新增商品监控</el-button>
                    <el-button type="info" plain size="small" v-if="updateFlag">更新中</el-button>
                    <el-button type="info" plain size="small" @click="update" v-else>更新数据</el-button>
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
                    <el-button type="info" plain size="small" @click="del">删除</el-button>
                    <el-button type="info" plain size="small">导出Excel</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 上部表单结束 -->

        <!-- 下部表格开始 -->
        <div class="table-content">
            <el-table :data="table" style="width: 100%" border @select="select" @select-all="select">
                <el-table-column type="selection" width="30" fixed align="center"> </el-table-column>
                <el-table-column label="查看趋势" width="90" fixed align="center">
                    <template slot-scope="scope">
                        <el-button @click="toCheckTrend(scope.row)" type="text" size="small">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="昨日监控" width="70" fixed align="center">
                    <template slot-scope="scope">
                        {{["未监控","已监控"][+scope.row.isMonitored]}}
                    </template>
                </el-table-column>
                <el-table-column prop="monitor_days" label="监控天数" width="70" fixed align="center"> </el-table-column>
                <el-table-column label="主图" width="70" fixed align="center">
                    <template slot-scope="scope">
                        <img class="picture" :src="scope.row.pictUrl" alt="" />
                    </template>
                </el-table-column>
                <el-table-column prop="itemId" label="宝贝ID" width="120" fixed align="center"> </el-table-column>
                <el-table-column prop="goods_name" label="宝贝标题" width="220" fixed align="center"> </el-table-column>
                <el-table-column prop="uvIndexNum" label="访客数" align="center"> </el-table-column>
                <el-table-column prop="tradeNum" label="买家数" align="center"> </el-table-column>
                <el-table-column prop="payAmount" label="支付金额" align="center"> </el-table-column>
                <el-table-column prop="price" label="客单价" align="center"> </el-table-column>
                <el-table-column prop="payRateRatio" label="转化率/%" align="center"> </el-table-column>
                <el-table-column prop="uvPrice" label="UV价值" align="center"> </el-table-column>

                <el-table-column label="深度智能分析" width="120" align="center">
                    <template slot-scope="scope">
                        <p>点击展开智能分析</p>
                    </template>
                </el-table-column>
                <el-table-column label="深度人工诊断" width="120" align="center">
                    <template slot-scope="scope">
                        <p>扫码添加咨询诊断</p>
                    </template>
                </el-table-column>
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
import axios from "axios";

export default {
    data() {
        return {
            // 列表
            shopInfo: {
                rank: { payAmtRank: { value: 0 } },
                wireless: { payAmtWL: { value: "" } },
                today: [{ uv: { value: "" } }, {}, { pv: { value: "" } }, { payOrdCnt: { value: "" } }, { payAmt: { value: "" } }],
                yesterday: { index: { payAmt: { value: "" } } }
            },
            table: [],
            total_pages: 1,
            page: 1,
            form: {
                date: "",
                dateValue: "",
                date_range: "",
                itemId: "",
                keywords: ""
            },
            selectData: "",

            // 新增竞品
            addFlag: false,
            addingFlag: false,
            updateFlag: false,
            // 日志
            logList: [],
            logFlag: true,
            // 添加监控表单
            add: { time: "30" },

            // 趋势
            treadFlag: false,
            tread: "30",
            treadActiveName: "first",
            treadActiveData: {},
            treadData: {},
            treadTable: [],
            myChart: "",
        }
    },
    filters: {
        money(num) {
            var result = [], counter = 0;
            num = (num || 0).toString().split('');
            for (var i = num.length - 1; i >= 0; i--) {
                counter++;
                result.unshift(num[i]);
                if (!(counter % 3) && i != 0) { result.unshift(','); }
            }
            return result.join('');
        }
    },
    mounted() {
        this.form.date = "1";
        this.getList();
        this.getShop();
        // 获取日志
        ipcRenderer.on("get-log", (event, data) => {
            // flag 0 成功  1进行中  2 失败
            if (!this.logFlag) {
                return;
            }
            switch (data.flag) {
                case 0:
                    this.addingFlag = false;
                    this.updateFlag = false;
                    this.logFlag = false;
                    this.logList.push(data.msg);
                    this.addFlag = false;
                    this.$message.success("数据获取成功，请点击开始查询按钮查看");
                    break;
                case 1:
                    this.logList.push(data.msg);
                    break;
                case 2:
                    this.addingFlag = false;
                    this.updateFlag = false;
                    this.logFlag = false;
                    this.logList.push(data.msg);
                    break;
                default:
                    break;
            }
        });
    },
    methods: {
        // 关闭趋势
        treadClose() {
            this.tread = "30";
            this.treadActiveName = "first";
            this.treadActiveData = {};
            this.treadData = {};
            this.treadTable = [];
            this.treadFlag = false;
        },
        // 查看趋势
        toCheckTrend(data) {
            this.treadFlag = true;
            this.treadActiveData = data;
            this.$nextTick(() => {
                var a = this.$http.post("/collect/getTrend", { itemId: data.itemId });
                var b = this.$http.post("/collect/getTrendData", { itemId: data.itemId });
                axios.all([a, b]).then((res) => {
                    if (0 === res[0].code && 0 === res[1].code) {
                        var arr = [];
                        for (let index = 0; index < 90; index++) {
                            arr.push(moment(res[0].data.last_date).subtract((1 * index + 1), 'days').format('YYYY-MM-DD'));
                        }
                        res[0].data.date = arr.reverse();
                        this.treadData = res[0].data;
                        this.treadTable = res[1].data;
                        this.myChart = this.$echarts.init(document.getElementById('echarts'));
                        this.createCharts(false);
                    } else {
                        this.$message.error("数据获取失败，请重试");
                    }
                });
            });
        },
        // 打开添加竞品
        addDialog() {
            this.addingFlag = false;
            this.logList = [];
            this.logFlag = true;
            this.add = { time: "30" };
            this.addFlag = true;
        },
        // 更新竞品
        update() {
            if (this.selectData === "") {
                this.$message.error("请至少选择一条数据");
                return;
            }
            this.updateFlag = true;
            this.addMonitor({ id: this.selectData, date: "30" });
        },
        // 添加竞品
        addMonitor(data, flag) {
            if (!this.add.id && flag) {
                this.$message.error("请输入竞品ID");
                return;
            }
            this.addingFlag = true;
            this.logFlag = true;
            this.logList = [];
            from(remote.BrowserWindow.getAllWindows()).subscribe(i => {
                remote.BrowserWindow.fromId(i.id).webContents.send("add-monitor", data);
            });
        },
        // 创建图表
        createCharts(flag) {
            var arr = JSON.parse(JSON.stringify(this.treadData));
            let option = {
                color: ["#02A2FF", "#FF7B06", "#00D1B1", "#FF2F86"],
                legend: {
                    data: ['访客数', '支付金额', '买家数', '转化率']
                },
                grid: {
                    left: '10%',
                    right: '10%',
                    bottom: '5%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: arr.date.slice(-this.tread),
                    interval: 1,
                    nameRotate: 90
                },
                yAxis: [
                    {
                        name: '访客数/人',
                        type: 'value',
                        position: "left",
                        offset: 20,
                        nameTextStyle: {
                            color: "#02A2FF"
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#02A2FF"
                            }
                        },
                        splitLine: {
                            show: false
                        }
                    },
                    {
                        name: '支付金额/元',
                        type: 'value',
                        position: "left",
                        offset: 90,
                        nameTextStyle: {
                            color: "#FF7B06"
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#FF7B06"
                            }
                        },
                        splitLine: {
                            show: false
                        }
                    },
                    {
                        name: '买家数/人',
                        type: 'value',
                        position: "right",
                        offset: 20,
                        nameTextStyle: {
                            color: "#00D1B1"
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#00D1B1"
                            }
                        },
                        splitLine: {
                            show: false
                        }
                    },
                    {
                        name: '转化率',
                        type: 'value',
                        position: "right",
                        offset: 90,
                        nameTextStyle: {
                            color: "#FF2F86"
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#FF2F86"
                            }
                        },
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series: [
                    {
                        name: '访客数',
                        yAxisIndex: 0,
                        data: arr.uvIndexNum.slice(-this.tread),
                        type: 'line',
                        smooth: true,
                        symbol: "circle"
                    },
                    {
                        name: '支付金额',
                        yAxisIndex: 1,
                        data: arr.tradeNum.slice(-this.tread),
                        type: 'line',
                        smooth: true,
                        symbol: "rect"
                    },
                    {
                        name: '买家数',
                        yAxisIndex: 2,
                        data: arr.payByrCntIndexNum.slice(-this.tread),
                        type: 'line',
                        smooth: true,
                        symbol: "triangle"
                    },
                    {
                        name: '转化率',
                        yAxisIndex: 3,
                        data: arr.payRateRatio.slice(-this.tread),
                        type: 'line',
                        smooth: true,
                        symbol: "diamond"
                    }
                ]
            };
            this.myChart.setOption(option, flag);
        },
        // 重绘图表
        resetCharts() {
            this.createCharts(true)
        },
        // 获取列表数据
        getList() {
            this.$http.post("/collect/getCompeteGoods", Object.assign(this.form, { page: this.page })).then(res => {
                if (0 === res.code) {
                    this.table = res.data.items;
                    this.total_pages = res.data.total_pages;
                }
            });
        },
        // 获取店铺基础数据
        getShop() {
            this.$http.post("/collect/getShopTrend", {}).then(res => {
                if (0 === res.code) {
                    this.shopInfo = res.data;
                    let echarts = this.$echarts.init(document.getElementById('data-detail-2'));
                    let option = {
                        color: ["#FF6801", "#CECECE"],
                        legend: {
                            data: ['今日', '昨日']
                        },
                        grid: {
                            left: '5%',
                            right: '5%',
                            top: "10%",
                            bottom: '5%',
                            containLabel: true
                        },
                        tooltip: {
                            trigger: 'axis',
                            formatter: '{b0}时<br/>{a0}：{c0}元<br/>{a1}：{c1}元'
                        },
                        xAxis: {
                            type: 'category',
                            data: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                interval: 2
                            }
                        },
                        yAxis: {
                            type: 'value',
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            },
                            splitNumber: 2
                        },
                        series: [
                            {
                                name: "今日",
                                data: res.data.trend.payAmt.map(item => ~~item),
                                type: 'line',
                                symbol: 'none',
                                smooth: true,
                                areaStyle: {
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                            offset: 0, color: 'rgba(255,104,1,0.5)'
                                        }, {
                                            offset: 1, color: '#fff'
                                        }],
                                        global: false
                                    }
                                }
                            },
                            {
                                name: "昨日",
                                data: res.data.yesterday.trend.payAmt.map(item => ~~item),
                                type: 'line',
                                symbol: 'none',
                                smooth: true,
                                areaStyle: {
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                            offset: 0, color: 'rgba(206,206,206,0.5)'
                                        }, {
                                            offset: 1, color: '#fff'
                                        }],
                                        global: false
                                    }
                                }
                            }
                        ]
                    }
                    echarts.setOption(option)
                }
            })
        },
        // 选择
        select(selection) {
            var arr = [];
            selection.forEach((item, i) => { arr.push(item.itemId) });
            this.selectData = arr.join(",");
        },
        // 删除
        del() {
            if (this.selectData === "") {
                this.$message.error("请至少选择一条数据");
                return;
            }
            this.$confirm('确认是否要删除此数据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post("/collect/deleteCompeteGoods", { "itemIds": this.selectData }).then(res => {
                    if (0 === res.code) {
                        this.$message.success(res.msg);
                        this.page = 1;
                        this.getList();
                    } else {
                        this.$message.error(res.msg);
                    }
                });
            }).catch(() => {
                this.$message({ type: 'info', message: '已取消删除' });
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

.my-data {
    padding: 30px 0 0 0;
    margin: 0 20px;
    border-bottom: 1px solid #f5f5f5;
    .data-detail {
        margin-left: 25px;
        overflow: hidden;
    }
    .data-detail-1 {
        .fl;
        width: 160px;
        img {
            .fl;
        }
        .span-1 {
            font-size: 14px;
            padding-left: 6px;
        }
        .span-2 {
            font-size: 22px;
            padding-left: 6px;
        }
        ul {
            margin-top: 20px;
        }
        li {
            font-size: 12px;
            color: #999;
            line-height: 22px;
        }
    }
    .data-detail-2 {
        .fl;
        margin: 0 50px;
        width: 360px;
        height: 150px;
    }
    .data-detail-3 {
        .fl;
        ul {
            width: 350px;
        }
        li {
            .dib;
            width: 170px;
            margin: 15px 0;
        }
        img {
            .fl;
        }
        .span-1 {
            font-size: 14px;
            padding-left: 10px;
        }
        .span-2 {
            font-size: 22px;
            padding-left: 10px;
        }
    }
}

.table-form {
    padding: 28px 50px;
    padding-bottom: 0;
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
    overflow: hidden;
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
        margin-top: 20px;
    }
}
</style>