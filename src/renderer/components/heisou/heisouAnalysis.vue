<template>
    <div class="heisou-analysis">
        <ul class="heisou-analysis-tab">
            <li :class="{active:tabIndex === 0}" @click="changeTab(0)">智能推荐</li>
            <li :class="{active:tabIndex === 1}" @click="changeTab(1)">成交关键词</li>
        </ul>
        <div class="table">
            <el-table :data="tableData1" border style="width: 100%" v-show="tabIndex === 0">
                <el-table-column prop="" label="智能推荐" align="center">
                </el-table-column>
                <el-table-column prop="" label="推荐词根" align="center">
                </el-table-column>
                <el-table-column prop="" label="推荐转化率/%" align="center">
                    <el-table-column prop="" label="日期" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="数值" align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column prop="" label="推荐收藏率" align="center">
                    <el-table-column prop="" label="日期" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="数值" align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column prop="" label="推荐加购率" align="center">
                    <el-table-column prop="" label="日期" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="数值" align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column prop="" label="直通车投放建议" align="center">
                </el-table-column>
                <el-table-column prop="" label="人工解读分析" align="center">
                </el-table-column>
            </el-table>
            <el-table :data="tableData2" border style="width: 100%" v-show="tabIndex === 1">
                <el-table-column prop="" label="时间" align="center">
                </el-table-column>
                <el-table-column prop="" label="第一天" align="center">
                    <el-table-column prop="" label="12-15">
                    </el-table-column>
                </el-table-column>
                <el-table-column prop="" label="第二天" align="center">
                    <el-table-column prop="" label="12-15">
                    </el-table-column>
                </el-table-column>
                <el-table-column prop="" label="第三天" align="center">
                    <el-table-column prop="" label="12-15">
                    </el-table-column>
                </el-table-column>
                <el-table-column prop="" label="第四天" align="center">
                    <el-table-column prop="" label="12-15" align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column prop="" label="第五天" align="center">
                    <el-table-column prop="" label="12-15">
                    </el-table-column>
                </el-table-column>
                <el-table-column prop="" label="第六天" align="center">
                    <el-table-column prop="" label="12-15">
                    </el-table-column>
                </el-table-column>
                <el-table-column prop="" label="第七天" align="center">
                    <el-table-column prop="" label="12-15">
                    </el-table-column>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tabIndex: 0
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

.heisou-analysis {
    .heisou-analysis-tab {
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