<template>
    <div class="report">
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="" label="日期" align="center">
            </el-table-column>
            <el-table-column prop="" label="访客数" align="center">
            </el-table-column>
            <el-table-column prop="" label="支付件数" align="center">
            </el-table-column>
            <el-table-column prop="" label="买家数" align="center">
            </el-table-column>
            <el-table-column prop="" label="交易额" align="center">
            </el-table-column>
            <el-table-column prop="" label="收藏数" align="center">
            </el-table-column>
            <el-table-column prop="" label="加购数" align="center">
            </el-table-column>
            <el-table-column prop="" label="收藏率%" align="center">
            </el-table-column>
            <el-table-column prop="" label="加购率%" align="center">
            </el-table-column>
            <el-table-column prop="" label="转化率%" align="center">
            </el-table-column>
            <el-table-column prop="" label="手淘搜索" align="center">
                <el-table-column prop="" label="访客数" align="center">
                </el-table-column>
                <el-table-column prop="" label="成交量" align="center">
                </el-table-column>
                <el-table-column prop="" label="转化率" align="center">
                </el-table-column>
                <el-table-column prop="" label="成交额" align="center">
                </el-table-column>
            </el-table-column>
            <el-table-column prop="" label="直通车" align="center">
                <el-table-column prop="" label="访客数" align="center">
                </el-table-column>
                <el-table-column prop="" label="成交量" align="center">
                </el-table-column>
                <el-table-column prop="" label="转化率" align="center">
                </el-table-column>
                <el-table-column prop="" label="成交额" align="center">
                </el-table-column>
            </el-table-column>
            <el-table-column prop="" label="手淘首页" align="center">
                <el-table-column prop="" label="访客数" align="center">
                </el-table-column>
                <el-table-column prop="" label="成交量" align="center">
                </el-table-column>
                <el-table-column prop="" label="转化率" align="center">
                </el-table-column>
                <el-table-column prop="" label="成交额" align="center">
                </el-table-column>
            </el-table-column>
            <el-table-column prop="" label="淘宝客">
                <el-table-column prop="" label="访客数" align="center">
                </el-table-column>
                <el-table-column prop="" label="成交量" align="center">
                </el-table-column>
                <el-table-column prop="" label="转化率" align="center">
                </el-table-column>
                <el-table-column prop="" label="成交额" align="center">
                </el-table-column>
            </el-table-column>
            <el-table-column prop="" label="超级推荐">
                <el-table-column prop="" label="访客数" align="center">
                </el-table-column>
                <el-table-column prop="" label="成交量" align="center">
                </el-table-column>
                <el-table-column prop="" label="转化率" align="center">
                </el-table-column>
                <el-table-column prop="" label="成交额" align="center">
                </el-table-column>
            </el-table-column>
            <el-table-column prop="" label="客单价" align="center">
            </el-table-column>
            <el-table-column prop="" label="UV值" align="center">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.report {
    margin-top: 15px;
}
</style>