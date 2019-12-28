<template>
    <div class="data-source">
        <ul class="data-source-tab">
            <li :class="{active:tabIndex === 0}" @click="changeTab(0)">引流关键词</li>
            <li :class="{active:tabIndex === 1}" @click="changeTab(1)">成交关键词</li>
            <li :class="{active:tabIndex === 2}" @click="changeTab(2)">流量结构</li>
            <li :class="{active:tabIndex === 3}" @click="changeTab(3)">关键指标</li>
        </ul>
        <div class="data-source-table" v-show="tabIndex === 0">
            <el-table :data="tableData0" border style="width: 100%">
                <el-table-column prop="" label="开始日期" align="center">
                </el-table-column>
                <el-table-column prop="" label="关键词" align="center">
                </el-table-column>
                <el-table-column prop="" label="访客数" align="center">
                </el-table-column>
                <el-table-column prop="" label="成交件数" align="center">
                </el-table-column>
                <el-table-column prop="" label="成交金额" align="center">
                </el-table-column>
                <el-table-column prop="" label="转化率" align="center">
                </el-table-column>
                <el-table-column prop="" label="UV价值" align="center">
                </el-table-column>
                <el-table-column prop="" label="一键分析" align="center">
                    <template slot-scope="scope">
                        <p>查看</p>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="data-source-table" v-show="tabIndex === 1">
            <el-table :data="tableData1" border style="width: 100%">
                <el-table-column prop="" label="开始日期" align="center">
                </el-table-column>
                <el-table-column prop="" label="关键词" align="center">
                </el-table-column>
                <el-table-column prop="" label="访客数" align="center">
                </el-table-column>
                <el-table-column prop="" label="成交件数" align="center">
                </el-table-column>
                <el-table-column prop="" label="成交金额" align="center">
                </el-table-column>
                <el-table-column prop="" label="转化率" align="center">
                </el-table-column>
                <el-table-column prop="" label="一键分析" align="center">
                    <template slot-scope="scope">
                        <p>查看</p>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="data-source-table" v-show="tabIndex === 2">
            <el-table :data="tableData2" border style="width: 100%">
                <el-table-column prop="" label="开始日期" align="center">
                </el-table-column>
                <el-table-column prop="" label="渠道" align="center">
                </el-table-column>
                <el-table-column prop="" label="访客数" align="center">
                </el-table-column>
                <el-table-column prop="" label="成交人数" align="center">
                </el-table-column>
                <el-table-column prop="" label="转化率" align="center">
                </el-table-column>
                <el-table-column prop="" label="交易额" align="center">
                </el-table-column>
                <el-table-column prop="" label="客单价" align="center">
                </el-table-column>
                <el-table-column prop="" label="UV价值" align="center">
                </el-table-column>
                <el-table-column prop="" label="一键分析" align="center">
                    <template slot-scope="scope">
                        <p>查看</p>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="data-source-table" v-show="tabIndex === 3">
            <el-table :data="tableData3" border style="width: 100%">
                <el-table-column prop="" label="开始日期" align="center">
                </el-table-column>
                <el-table-column prop="" label="访客数" align="center">
                </el-table-column>
                <el-table-column prop="" label="支付买家shu" align="center">
                </el-table-column>
                <el-table-column prop="" label="支付件数" align="center">
                </el-table-column>
                <el-table-column prop="" label="收藏数" align="center">
                </el-table-column>
                <el-table-column prop="" label="加购数" align="center">
                </el-table-column>
                <el-table-column prop="" label="转化率" align="center">
                </el-table-column>
                <el-table-column prop="" label="交易额" align="center">
                </el-table-column>
                <el-table-column prop="" label="一键分析" align="center">
                    <template slot-scope="scope">
                        <p>查看</p>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            tabIndex: 0,
            tableData0: [],
            tableData1: [],
            tableData2: [],
            tableData3: []
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
.data-source {
    .data-source-tab {
        padding: 14px 0;
        display: flex;
        justify-content: flex-start;
        li {
            padding: 0 12px;
            cursor: pointer;
            font-size: 14px;
            color: #666;
            .l-h(30px);
            margin-right: 40px;
        }
        .active {
            background: rgba(255, 254, 254, 1);
            border: 1px solid rgba(255, 104, 1, 1);
            border-radius: 15px;
        }
    }
}
</style>