<template>
    <div class="traffi-structure-analysis clearfix">
        <div class="traffi-structure-analysis-left">
            <el-table border style="width: 100%">
                <el-table-column prop="" label="渠道" width="140" align="center">
                </el-table-column>
                <el-table-column prop="" label="访客数" width="60" align="center">
                </el-table-column>
                <el-table-column prop="" label="成交人数" width="70" align="center">
                </el-table-column>
                <el-table-column prop="" label="转化率" width="60" align="center">
                </el-table-column>
                <el-table-column prop="" label="交易额" width="60" align="center">
                </el-table-column>
                <el-table-column prop="" label="操作" width="60" align="center">
                </el-table-column>
            </el-table>
        </div>
        <div class="traffi-structure-analysis-right">
            <div class="traffi-structure-analysis-right-left">
                <el-table border style="width: 100%">
                    <el-table-column prop="" label="日期" width="150" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="渠道" width="120" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="访客数" width="60" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="成交人数" width="70" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="转化率" width="60" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="交易额" width="60" align="center">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");
.traffi-structure-analysis {
    margin-top: 34px;
    .traffi-structure-analysis-left {
        .fl;
        margin-right: 26px;
    }
    .traffi-structure-analysis-right {
        .fl;
    }
}
</style>