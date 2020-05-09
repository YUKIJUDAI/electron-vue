<template>
    <div class="liuliang-list">
        <div class="liuliang-form">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-select v-model="task_type" placeholder="请选择任务类型">
                        <el-option label="APP流量" :value="0"></el-option>
                        <el-option label="PC流量" :value="1"></el-option>
                        <el-option label="直访流量" :value="2"></el-option>
                        <el-option label="搜索收藏" :value="9"></el-option>
                        <el-option label="商品收藏" :value="7"></el-option>
                        <el-option label="搜索加购" :value="11"></el-option>
                        <el-option label="直接加购" :value="10"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-date-picker size="small" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-model="date">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="查询关键词" size="small" v-model="keyword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="monitoringAuthority('getList')">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="liuliang-table">
            <el-table border style="width: 100%" :data="list">
                <el-table-column prop="type" label="类型" align="center" width="120">
                </el-table-column>
                <el-table-column prop="keyword" label="关键词/商品ID" align="center">
                </el-table-column>
                <el-table-column prop="gold" label="总价(积分)" align="center" width="80">
                </el-table-column>
                <el-table-column prop="count" label="发布量" align="center" width="80">
                </el-table-column>
                <el-table-column prop="lave" label="剩余量" align="center" width="80">
                </el-table-column>
                <el-table-column prop="status" label="处理状态" align="center">
                </el-table-column>
                <el-table-column prop="create_time" label="发布时间" align="center">
                </el-table-column>
                <el-table-column prop="" label="操作" align="center" width="80">
                    <template slot-scope="scope">
                        <p @click="view(scope.row.id)" class="view">查看详情</p>
                    </template>
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
import { monitoringAuthority } from "@/util/util";

export default {
    data() {
        return {
            list: [],
            date: "",
            keyword: "",
            task_type: "",
            page: 1,
            total_pages: 1,
        }
    },
    created() {
        this.getList();
    },
    methods: {
        // 权限
        monitoringAuthority(type, ...arg) {
            monitoringAuthority(this, type, ...arg);
        },
        async getList() {
            var date1 = this.date ? this.date[0] : "";
            var date2 = this.date ? this.date[1] : "";
            var res = await this.$fetch.post("/lieliu/getLieliuList", { date1, date2, task_type: this.task_type, keyword: this.keyword, page: this.page });
            0 === res.code && (this.list = res.data.items, this.total_pages = res.data.total_pages);
        },
        view(id) {
            this.$emit("changeIndex", 1, id);
        }
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
    .view {
        color: var(--themeColor);
        cursor: pointer;
    }
}
</style>