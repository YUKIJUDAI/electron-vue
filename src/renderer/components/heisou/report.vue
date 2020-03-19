<template>
    <div class="report">
        <el-table :data="report" border style="width: 100%" height="500">
            <el-table-column prop="analysis_time" label="日期" align="center">
            </el-table-column>
            <el-table-column prop="uvIndexNum" label="访客数" align="center">
            </el-table-column>
            <el-table-column prop="payByrCntIndexNum" label="支付件数" align="center">
            </el-table-column>
            <el-table-column prop="tradeNum" label="交易额" align="center">
            </el-table-column>
            <el-table-column prop="cltHitsNum" label="收藏数" align="center">
            </el-table-column>
            <el-table-column prop="cartHitsNum" label="加购数" align="center">
            </el-table-column>
            <el-table-column prop="cltRatio" label="收藏率/%" align="center">
            </el-table-column>
            <el-table-column prop="cartRatio" label="加购率/%" align="center">
            </el-table-column>
            <el-table-column prop="payRateRatio" label="转化率/%" align="center">
            </el-table-column>
            <el-table-column label="手淘搜索" align="center">
                <el-table-column prop="shoutao.uv" label="访客数" align="center">
                </el-table-column>
                <el-table-column prop="shoutao.payByCntNum" label="成交量" align="center">
                </el-table-column>
                <el-table-column prop="shoutao.payRateRatio" label="转化率/%" align="center">
                </el-table-column>
                <el-table-column prop="shoutao.tradeNum" label="成交额" align="center">
                </el-table-column>
            </el-table-column>
            <el-table-column prop="" label="直通车" align="center">
                <el-table-column prop="ztc.uv" label="访客数" align="center">
                </el-table-column>
                <el-table-column prop="ztc.payByCntNum" label="成交量" align="center">
                </el-table-column>
                <el-table-column prop="ztc.payRateRatio" label="转化率/%" align="center">
                </el-table-column>
                <el-table-column prop="ztc.tradeNum" label="成交额" align="center">
                </el-table-column>
            </el-table-column>
            <el-table-column prop="" label="手淘首页" align="center">
                <el-table-column prop="stsy.uv" label="访客数" align="center">
                </el-table-column>
                <el-table-column prop="stsy.payByCntNum" label="成交量" align="center">
                </el-table-column>
                <el-table-column prop="stsy.payRateRatio" label="转化率/%" align="center">
                </el-table-column>
                <el-table-column prop="stsy.tradeNum" label="成交额" align="center">
                </el-table-column>
            </el-table-column>
            <el-table-column prop="" label="淘宝客" align="center">
                <el-table-column prop="tbk.uv" label="访客数" align="center">
                </el-table-column>
                <el-table-column prop="tbk.payByCntNum" label="成交量" align="center">
                </el-table-column>
                <el-table-column prop="tbk.payRateRatio" label="转化率/%" align="center">
                </el-table-column>
                <el-table-column prop="tbk.tradeNum" label="成交额" align="center">
                </el-table-column>
            </el-table-column>
            <el-table-column prop="" label="超级推荐" align="center">
                <el-table-column prop="cjtj.uv" label="访客数" align="center">
                </el-table-column>
                <el-table-column prop="cjtj.payByCntNum" label="成交量" align="center">
                </el-table-column>
                <el-table-column prop="cjtj.payRateRatio" label="转化率/%" align="center">
                </el-table-column>
                <el-table-column prop="cjtj.tradeNum" label="成交额" align="center">
                </el-table-column>
            </el-table-column>
            <el-table-column prop="per_price" label="客单价" align="center">
            </el-table-column>
            <el-table-column prop="uvPrice" label="UV值" align="center">
            </el-table-column>
        </el-table>
        <div id="echarts" style="height:300px"></div>
    </div>
</template>

<script>
export default {
    props: ["itemId", "date_range", "t"],
    data() {
        return {
            report: []
        }
    },
    methods: {
        getData() {
            this.$http.post("/analysis/report", { itemId: this.itemId, date_range: this.date_range }).then((res) => {
                0 === res.code && (this.report = res.data, this.createChatrs(res.data));
            });
        },
        createChatrs(data) {
            var a = [], b = [], c = [], d = [], e = [], f = [], g = [], h = [],
                i = [], j = [], k = [], l = [], m = [], n = [];
            data.map((item) => {
                a.push(item.uvIndexNum);
                b.push(item.ztc.uv);
                c.push(item.shoutao.uv);
                d.push(item.stsy.uv);
                e.push(item.tbk.uv);
                f.push(item.payByrCntIndexNum);
                g.push(item.tradeNum);
                h.push(item.cltHitsNum);
                i.push(item.cartHitsNum);
                j.push(item.payRateRatio);
                k.push(item.cltRatio);
                l.push(item.cartRatio);
                m.push(item.uvPrice);
                n.push(item.analysis_time);
            });
            let option = {
                // color: ["#02A2FF", "#FF7B06", "#00D1B1", "#FF2F86", "#CA35A6"],
                legend: {
                    data: [
                        '访客数', '直通车访客数', '手淘搜索访客数', '手淘首页访客数',
                        '淘宝客访客数', '支付件数', '交易额', '收藏数',
                        '加购数', '转化率', '收藏率', '加购率', 'UV值'
                    ]
                },
                grid: {
                    x:50,
                    y:100,
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
                    data: n,
                    interval: 1,
                    nameRotate: 90
                },
                yAxis: [
                    {
                        name: '元',
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
                        name: '个',
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
                        name: '%',
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
                    }
                ],
                series: [
                    {
                        name: '访客数',
                        yAxisIndex: 1,
                        data: a,
                        type: 'line',
                        smooth: true,
                        symbol: "circle"
                    },
                    {
                        name: '直通车访客数',
                        yAxisIndex: 1,
                        data: b,
                        type: 'line',
                        smooth: true,
                        symbol: "circle"
                    },
                    {
                        name: '手淘搜索访客数',
                        yAxisIndex: 1,
                        data: c,
                        type: 'line',
                        smooth: true,
                        symbol: "circle"
                    },
                    {
                        name: '手淘首页访客数',
                        yAxisIndex: 1,
                        data: d,
                        type: 'line',
                        smooth: true,
                        symbol: "circle"
                    },
                    {
                        name: '淘宝客访客数',
                        yAxisIndex: 1,
                        data: e,
                        type: 'line',
                        smooth: true,
                        symbol: "circle"
                    },
                    {
                        name: '支付件数',
                        yAxisIndex: 1,
                        data: f,
                        type: 'line',
                        smooth: true,
                        symbol: "circle"
                    },
                    {
                        name: '交易额',
                        yAxisIndex: 0,
                        data: g,
                        type: 'line',
                        smooth: true,
                        symbol: "rect"
                    },
                    {
                        name: '收藏数',
                        yAxisIndex: 1,
                        data: h,
                        type: 'line',
                        smooth: true,
                        symbol: "circle"
                    },
                    {
                        name: '加购数',
                        yAxisIndex: 1,
                        data: i,
                        type: 'line',
                        smooth: true,
                        symbol: "circle"
                    },
                    {
                        name: '转化率',
                        yAxisIndex: 2,
                        data: j,
                        type: 'line',
                        smooth: true,
                        symbol: "triangle"
                    },
                    {
                        name: '收藏率',
                        yAxisIndex: 2,
                        data: k,
                        type: 'line',
                        smooth: true,
                        symbol: "triangle"
                    },
                    {
                        name: '加购率',
                        yAxisIndex: 2,
                        data: l,
                        type: 'line',
                        smooth: true,
                        symbol: "triangle"
                    },
                    {
                        name: 'UV值',
                        yAxisIndex: 1,
                        data: m,
                        type: 'line',
                        smooth: true,
                        symbol: "circle"
                    }

                ]
            };
            this.$echarts.init(document.getElementById('echarts')).setOption(option, false);
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
.report {
    margin-top: 15px;
    #echarts {
        width: 100%;
        margin-top: 50px;
    }
}
</style>