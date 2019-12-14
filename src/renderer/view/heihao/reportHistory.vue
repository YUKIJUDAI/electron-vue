<template>
    <div class="reportHistory">
        <div class="reportHistory-title">
            <el-form :inline="true" :model="searchForm" label-width="80px">
                <el-form-item label="旺旺号">
                    <el-input placeholder="请输入旺旺号" style="width:150px"></el-input>
                </el-form-item>
                <el-form-item label="查询日期">
                    <el-date-picker type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:300px">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select style="width:150px">
                        <el-option label="全部"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="reportHistory-table">
            <el-table :data="tableData" border style="width: 100%" :header-cell-style="{'background':'#FF6801','border-color':'#FF6801','color':'#fff'}">
                <el-table-column prop="name" label="举报日期">
                </el-table-column>
                <el-table-column prop="name" label="举报旺旺">
                </el-table-column>
                <el-table-column prop="name" label="举报类型">
                </el-table-column>
                <el-table-column prop="name" label="举报状态">
                </el-table-column>
                <el-table-column prop="name" label="审核时间">
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
            searchForm: {},
            tableData: [],
            total_pages: 1,
            page: 1
        }
    },
    methods: {
        getList() { }
    }
}
</script>

<style lang="less" scoped>
.reportHistory {
    padding: 0 20px;
    .reportHistory-title {
        padding: 30px 0;
        font-size: 0;
    }
    .pagination {
        overflow: hidden;
        padding-top: 20px;
        text-align: center;
    }
}
</style>