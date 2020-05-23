<template>
    <div class="goods-info">
        <ul class="goods-info-tab">
            <li :class="{active:tabIndex === 0}" @click="changeTab(0)">宝贝信息变化日记录</li>
            <li :class="{active:tabIndex === 1}" @click="changeTab(1)">SKU信息变化日记录</li>
        </ul>
        <div class="goods-info-table">
            <el-table border style="width: 100%" v-show="tabIndex === 0" :height="500" :data="tableData0">
                <el-table-column prop="data_date" label="开始日期" align="center">
                </el-table-column>
                <el-table-column prop="oldPrice" label="原价" align="center">
                </el-table-column>
                <el-table-column label="现价区间" align="center">
                    <template slot-scope="scope">
                        {{scope.row.newPrice}} - {{scope.row.newPrice2}}
                    </template>
                </el-table-column>
                <el-table-column prop="total_stock" label="库存" align="center">
                </el-table-column>
                <el-table-column prop="stock_group_num" label="SKU组合" align="center">
                </el-table-column>
                <el-table-column prop="activity" label="参与活动" align="center">
                </el-table-column>
                <el-table-column prop="favCount" label="收藏数" align="center">
                </el-table-column>
                <el-table-column prop="questNum" label="问题数" align="center">
                </el-table-column>
                <el-table-column prop="commentCount" label="评论数" align="center">
                </el-table-column>
                <el-table-column prop="picCommentNum" label="图评" align="center">
                </el-table-column>
                <el-table-column prop="goodCommentNum" label="好评" align="center">
                </el-table-column>
                <el-table-column prop="addCommentNum" label="追评" align="center">
                </el-table-column>
                <el-table-column prop="midCommentNum" label="中评" align="center">
                </el-table-column>
                <el-table-column prop="badCommentNum" label="差评" align="center">
                </el-table-column>
            </el-table>
            <el-table border style="width: 100%" v-show="tabIndex === 1" :height="500" :data="tableData1">
                <el-table-column prop="data_date" label="开始日期" align="center">
                </el-table-column>
                <el-table-column prop="stock_name" label="sku组合" align="center">
                </el-table-column>
                <el-table-column prop="price" label="价格" align="center">
                </el-table-column>
                <el-table-column prop="stock" label="库存" align="center">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    props: ["itemId", "date_range", "t"],
    data() {
        return {
            tabIndex: 0,
            tableData0: [],
            tableData1: [],
        }
    },
    computed: {
        tableData() {
            return [this.tableData0, this.tableData1];
        }
    },
    mounted() {
        this.itemId && this.getData();
    },
    methods: {
        changeTab(index) {
            this.tabIndex = index;
        },
        getData() {
            this.goodsInfoLog();
            this.goodsStock();
        },
        goodsInfoLog() {
            this.$http.post("/analysis/goodsInfoLog", { itemId: this.itemId, date_range: this.date_range }).then((res) => {
                0 === res.code && (this.tableData0 = res.data);
            });
        },
        goodsStock() {
            this.$http.post("/analysis/goodsStock", { itemId: this.itemId, date_range: this.date_range }).then((res) => {
                0 === res.code && (this.tableData1 = res.data);
            });
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

.goods-info {
    .goods-info-tab {
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
            border: 1px solid var(--themeColor);
            border-radius: 15px;
        }
    }
}
</style>