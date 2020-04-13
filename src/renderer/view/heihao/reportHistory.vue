<template>
    <div class="reportHistory">
        <div class="reportHistory-title">
            <el-form :inline="true" :model="searchForm" label-width="70px" label-position="left">
                <el-form-item label="旺旺号码">
                    <el-input placeholder="请输入旺旺号" v-model="searchForm.wangwang" style="width:150px"></el-input>
                </el-form-item>
                <el-form-item label="查询日期">
                    <el-date-picker type="daterange" v-model="searchForm.date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:300px">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="举报状态">
                    <el-select style="width:150px" v-model="searchForm.status">
                        <el-option label="全部" value="0"></el-option>
                        <el-option label="已通过" value="1"></el-option>
                        <el-option label="未通过" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getList">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="reportHistory-table">
            <el-table :data="tableData" border style="width: 100%" :header-cell-style="{'background':'#FF6801','border-color':'#FF6801','color':'#fff'}">
                <el-table-column prop="wangwang" label="举报旺旺">
                </el-table-column>
                <el-table-column prop="content" label="举报类型">
                </el-table-column>
                <el-table-column prop="name" label="举报状态">
                    <template slot-scope="scope">
                        {{["","已通过","未通过"][+scope.row.status]}}
                    </template>
                </el-table-column>
                <el-table-column prop="create_time" label="举报日期">
                </el-table-column>
                <el-table-column prop="check_time" label="审核时间">
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
            // 搜索条件
            searchForm: { status: "0" },
            // 表格数据
            tableData: [],
            total_pages: 1,
            page: 1
        }
    },
    created() {
        this.getList();
    },
    methods: {
        // 获取列表数据
        async getList() {
            var res = await this.$fetch.post("/heisou/getReportLogs", Object.assign(this.searchForm, { page: this.page }));
            0 === res.code && (this.tableData = res.data.items, this.total_pages = res.data.total_pages);
        }
    },
    watch: {
        "searchForm.date"(val) {
            this.searchForm.date_range = Array.isArray(val) ? val[0] + "|" + val[1] : "";
        }
    }
}
</script>

<style lang="less" scoped>
.reportHistory {
    .reportHistory-title {
        padding: 15px 0 0 0;
        font-size: 0;
    }
    .pagination {
        overflow: hidden;
        padding-top: 20px;
        text-align: center;
    }
}
</style>