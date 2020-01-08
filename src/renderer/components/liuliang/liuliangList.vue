<template>
    <div class="liuliang-list">
        <div class="liuliang-form">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-date-picker size="small" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="查询关键词" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select placeholder="选择状态" clearable size="small">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="liuliang-table">
            <el-table border style="width: 100%">
                <el-table-column prop="" label="类型" align="center">
                </el-table-column>
                <el-table-column prop="" label="关键词/商品ID" align="center">
                </el-table-column>
                <el-table-column prop="" label="任务备注" align="center">
                </el-table-column>
                <el-table-column prop="" label="总价(金币)" align="center">
                </el-table-column>
                <el-table-column prop="" label="发布量" align="center">
                </el-table-column>
                <el-table-column prop="" label="剩余量" align="center">
                </el-table-column>
                <el-table-column prop="" label="处理状态" align="center">
                </el-table-column>
                <el-table-column prop="" label="发布时间" align="center">
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination background layout="prev, pager, next" :page-count="total_pages" :current-page.sync="page" @current-change="getList">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            page: 1,
            total_pages: 1,
        }
    },
    methods: {
        getList() { }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");
.liuliang-list {
    margin: 0 15px;
    margin-top: 18px;
    .pagination {
        overflow: hidden;
        padding-top: 20px;
        text-align: center;
    }
}
</style>