<template>
    <div class="traffi-structure-analysis clearfix">
        <div class="traffi-structure-analysis-left">
            <el-table border style="width: 100%" :data="flowStructure" height="500">
                <el-table-column prop="_id" label="渠道" align="center">
                </el-table-column>
                <el-table-column prop="uv" label="访客数" align="center">
                </el-table-column>
                <el-table-column prop="payByCntNum" label="成交人数" align="center">
                </el-table-column>
                <el-table-column prop="payRateRadio" label="转化率/%" align="center">
                </el-table-column>
                <el-table-column prop="trade_money" label="交易额" align="center">
                </el-table-column>
                <el-table-column prop="" label="操作" align="center">
                    <template slot-scope="scope">
                        <p @click="getKeywordsTrend(scope.row._id)" class="view">查看</p>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="traffi-structure-analysis-right">
            <el-table border style="width: 100%" :data="keywordsTrend" height="500">
                <el-table-column prop="data_date" label="日期" align="center">
                </el-table-column>
                <el-table-column prop="pageName" label="渠道" align="center">
                </el-table-column>
                <el-table-column prop="uv" label="访客数" align="center">
                </el-table-column>
                <el-table-column prop="payByCntNum" label="成交人数" align="center">
                </el-table-column>
                <el-table-column prop="payRateRatio" label="转化率/%" align="center">
                </el-table-column>
                <el-table-column prop="tradeNum" label="交易额" align="center">
                </el-table-column>
            </el-table>
        </div>
        <div class="echarts-left" style="height:350px;"></div>
        <div class="echarts-right" style="height:350px;"></div>
    </div>
</template>

<script>
export default {
    props: ["itemId", "date_range", "t"],
    data() {
        return {
            flowStructure: [],
            keywordsTrend: []
        }
    },
    mounted(){
        this.itemId && this.getData();
    },
    methods: {
        getData() {
            this.$http.post("/analysis/flowStructure", { itemId: this.itemId, date_range: this.date_range }).then(res => {
                0 === res.code && (this.flowStructure = res.data, this.createChatrs1(res.data));
            });
        },
        getKeywordsTrend(source_name) {
            this.$http.post("/analysis/flowForDay", { itemId: this.itemId, date_range: this.date_range, source_name }).then(res => {
                0 === res.code && (this.keywordsTrend = res.data, this.createChatrs2(res.data));
            });
        },
        createChatrs1(data) {
            var arr = [], arrTitle = [];
            data.map((item, i) => {
                arr.push({ name: item._id, value: item.uv });
                arrTitle.push(item._id);
            });
            console.log(arr)
            var option = {
                title: {
                    text: '访问渠道占比'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b} : {c} ({d}%)'
                },
                // legend: {
                //     type: 'scroll',
                //     orient: 'vertical',
                //     left: 10,
                //     top: 20,
                //     bottom: 20,
                //     data: arrTitle,
                // },
                series: [
                    {
                        type: 'pie',
                        radius: '40%',
                        center: ['40%', '50%'],
                        data: arr
                    }
                ]
            };
            this.$echarts.init(document.querySelector('.echarts-left')).setOption(option, false)
        },
        createChatrs2(data) {
            var a = [], b = [], c = [], d = [], e = [];
            data.map((item, i) => {
                a.push(item.uv);
                b.push(item.payByCntNum);
                c.push(item.tradeNum);
                d.push(item.payRateRatio);
                e.push(item.data_date);
            });
            let option = {
                color: ["#02A2FF", "#FF7B06", "#00D1B1", "#FF2F86"],
                legend: {
                    data: ['访客数', '成交件数', '成交金额', '转化率']
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
                    data: e,
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
                        name: '成交金额/元',
                        type: 'value',
                        position: "right",
                        offset: 90,
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
                        offset: 20,
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
                        name: '成交金额',
                        yAxisIndex: 2,
                        data: c,
                        type: 'line',
                        smooth: true,
                        symbol: "triangle"
                    },
                    {
                        name: '转化率',
                        yAxisIndex: 3,
                        data: d,
                        type: 'line',
                        smooth: true,
                        symbol: "diamond"
                    }
                ]
            };
            this.$echarts.init(document.querySelector('.echarts-right')).setOption(option, false)
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
.traffi-structure-analysis {
    margin-top: 34px;
    display: flex;
    flex-wrap: wrap;
    .view {
        color: #3399ff;
        cursor: pointer;
        text-decoration: underline;
    }
    .traffi-structure-analysis-left {
        margin-right: 26px;
        width: 48%;
    }
    .traffi-structure-analysis-right {
        width: 48%;
    }
    .echarts-left {
        margin-top: 30px;
        width: 45%;
    }
    .echarts-right {
        margin-top: 30px;
        width: 55%;
    }
}
</style>