<template>
    <div class="goods-info">
        <ul class="goods-info-tab">
            <li :class="{active:tabIndex === 0}" @click="changeTab(0)">宝贝信息变化日记录</li>
            <li :class="{active:tabIndex === 1}" @click="changeTab(1)">SKU信息变化日记录</li>
        </ul>
        <div class="goods-info-table">
            <el-table border style="width: 100%" v-show="tabIndex === 0">
                <el-table-column prop="" label="开始日期" align="center">
                </el-table-column>
                <el-table-column prop="" label="原价" align="center">
                </el-table-column>
                <el-table-column prop="" label="现价区间" align="center">
                </el-table-column>
                <el-table-column prop="" label="库存" align="center">
                </el-table-column>
                <el-table-column prop="" label="SKU组合" align="center">
                </el-table-column>
                <el-table-column prop="" label="参与活动" align="center">
                </el-table-column>
                <el-table-column prop="" label="收藏数" align="center">
                </el-table-column>
                <el-table-column prop="" label="问题数" align="center">
                </el-table-column>
                <el-table-column prop="" label="评论数" align="center">
                </el-table-column>
                <el-table-column prop="" label="图评" align="center">
                </el-table-column>
                <el-table-column prop="" label="好评" align="center">
                </el-table-column>
                <el-table-column prop="" label="追评" align="center">
                </el-table-column>
                <el-table-column prop="" label="中评" align="center">
                </el-table-column>
                <el-table-column prop="" label="差评" align="center">
                </el-table-column>
            </el-table>
            <el-table border style="width: 100%" v-show="tabIndex === 1">
                <el-table-column prop="" label="开始日期" align="center">
                </el-table-column>
                <el-table-column prop="" label="sku组合" align="center">
                </el-table-column>
                <el-table-column prop="" label="价格" align="center">
                </el-table-column>
                <el-table-column prop="" label="库存" align="center">
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
            border: 1px solid rgba(255, 104, 1, 1);
            border-radius: 15px;
        }
    }
}
</style>