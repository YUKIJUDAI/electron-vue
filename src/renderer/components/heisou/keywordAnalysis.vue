<template>
    <div class="keyword-analysis">
        <p class="warn">注：因生意参谋竞品分析成交词每天最多提供20个入店关键词与20个成交关键词，但20个入店关键词不一定全部都存在成交词中 <br />所以系统会有:引流关键词分析，引流成交词分析，成交词统计等功能</p>
        <div class="form">
            <el-table border class="form-table form-table1" :header-cell-style="headStyle" :data="tableData1" height="500">
                <el-table-column prop="_id" label="流量关键词" align="center" width="150">
                </el-table-column>
                <el-table-column prop="uv" label="访客数" align="center">
                </el-table-column>
                <el-table-column prop="count" label="出现天数" align="center">
                </el-table-column>
                <el-table-column prop="" label="标题词" align="center">
                    <template slot-scope="scope">
                        <i class="el-icon-check" v-show="title.includes(scope.row._id)"></i>
                    </template>
                </el-table-column>
            </el-table>
            <el-table border class="form-table form-table2" :header-cell-style="headStyle" :data="tableData2" height="500">
                <el-table-column prop="_id" label="成交关键词" align="center" width="150">
                </el-table-column>
                <el-table-column prop="trade_num" label="成交数" align="center">
                </el-table-column>
                <el-table-column prop="count" label="出现天数" align="center">
                </el-table-column>
                <el-table-column prop="" label="标题词" align="center">
                    <template slot-scope="scope">
                        <i class="el-icon-check" v-show="title.includes(scope.row._id)"></i>
                    </template>
                </el-table-column>
            </el-table>
            <el-table border class="form-table form-table3" :header-cell-style="headStyle" :data="tableData3" height="500">
                <el-table-column prop="_id" label="流量成交关键词" align="center" fixed width="150">
                </el-table-column>
                <el-table-column prop="" label="操作" align="center" fixed>
                    <template slot-scope="scope">
                        <p @click="view(scope.row._id)" class="view">查看</p>
                    </template>
                </el-table-column>
                <el-table-column prop="uv" label="访客数" align="center">
                </el-table-column>
                <el-table-column prop="trade_num" label="成交数" align="center">
                </el-table-column>
                <el-table-column prop="trade_money" label="成交金额" align="center">
                </el-table-column>
                <el-table-column prop="payRateRadio" label="转化率/%" align="center">
                </el-table-column>
                <el-table-column prop="count" label="出现天数" align="center">
                </el-table-column>
                <el-table-column prop="" label="标题词" align="center">
                    <template slot-scope="scope">
                        <i class="el-icon-check" v-show="title.includes(scope.row._id)"></i>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 查看数据趋势 -->
        <el-dialog title="查看数据趋势" :visible.sync="treadFlag" width="900px">
            <div id="echarts" style="height:400px;padding:0 50px;"></div>
        </el-dialog>
    </div>
</template>

<script>


export default {
    props: ["itemId", "date_range", "t", "title"],
    data() {
        return {
            tableData1: [],
            tableData2: [],
            tableData3: [],
            treadFlag: false,
            myChart: ""
        }
    },
    methods: {
        headStyle({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                return "color:#FF6801;background-color:rgba(255, 105, 2, 0.08)"
            } else {
                return "";
            }
        },
        getData() {
            this.$http.post("/collect/keywordsAnalysis", { itemId: this.itemId, date_range: this.date_range }).then((res) => {
                if (0 === res.code) {
                    this.tableData3 = res.data;
                    var a = [], b = [];
                    res.data.map((item, i) => {
                        0 === item.uv && a.push(item);
                        0 === item.trade_num && b.push(item);
                    });
                    this.tableData1 = a;
                    this.tableData2 = b;
                }
            });
        },
        view(keyword) {
            this.treadFlag = true;
            this.$http.post("/collect/getKeywordsTrend", { itemId: this.itemId, date_range: this.date_range, keyword }).then(res => {
                0 === res.code && (this.myChart = this.$echarts.init(document.getElementById('echarts')), this.createCharts(res.data));
            });
        },
        // 创建图表
        createCharts(data) {
            var a = [], b = [], c = [], d = [], e = [], f = [];
            data.map((item, i) => {
                a.push(item.uv);
                b.push(item.payByrCntIndexNum);
                c.push(item.payRateRatio);
                d.push(item.tradeNum);
                e.push(item.uvPrice);
                f.push(item.data_date);
            });
            let option = {
                color: ["#02A2FF", "#FF7B06", "#00D1B1", "#FF2F86", "#CA35A6"],
                legend: {
                    data: ['访客数', '成交件数', '转化率', '成交金额', 'uv价值']
                },
                grid: {
                    left: '20%',
                    right: '20%',
                    bottom: '5%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: f,
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
                        name: '成交件数/件',
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
                        name: '转化率',
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
                        name: '成交金额/元',
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
                    },
                    {
                        name: 'uv价值/元',
                        type: 'value',
                        position: "right",
                        offset: 200,
                        nameTextStyle: {
                            color: "#FF2F86"
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#CA35A6"
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
                        data: a,
                        type: 'line',
                        smooth: true,
                        symbol: "circle"
                    },
                    {
                        name: '成交件数',
                        yAxisIndex: 1,
                        data: b,
                        type: 'line',
                        smooth: true,
                        symbol: "rect"
                    },
                    {
                        name: '转化率',
                        yAxisIndex: 2,
                        data: c,
                        type: 'line',
                        smooth: true,
                        symbol: "triangle"
                    },
                    {
                        name: '成交金额',
                        yAxisIndex: 3,
                        data: d,
                        type: 'line',
                        smooth: true,
                        symbol: "diamond"
                    },
                    {
                        name: 'uv价值',
                        yAxisIndex: 4,
                        data: e,
                        type: 'line',
                        smooth: true,
                        symbol: "arrow"
                    }
                ]
            };
            this.myChart.setOption(option, false);
        }
    },
    watch: {
        t(val) {
            val && this.getData()
        }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");

.keyword-analysis {
    .warn {
        padding: 14px 0;
        font-size: 12px;
        color: #666;
    }
    .form {
        display: flex;
        justify-content: flex-start;
        .form-table {
            margin-right: 12px;
        }
    }
    .form-table1,
    .form-table2 {
        flex: 1;
    }
    .form-table3 {
        flex: 1.6;
        .view {
            color: #3399ff;
            cursor: pointer;
            text-decoration: underline;
        }
    }
}
</style>