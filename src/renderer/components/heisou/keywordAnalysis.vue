<template>
    <div class="keyword-analysis">
        <p class="warn">注：因生意参谋竞品分析成交词每天最多提供20个入店关键词与20个成交关键词，但20个入店关键词不一定全部都存在成交词中 <br />所以系统会有:引流关键词分析，引流成交词分析，成交词统计等功能</p>
        <div class="form">
            <el-table border class="form-table form-table1" :header-cell-style="headStyle">
                <el-table-column prop="" label="流量关键词" align="center" width="150">
                </el-table-column>
                <el-table-column prop="" label="访客数" align="center">
                </el-table-column>
                <el-table-column prop="" label="出现天数" align="center">
                </el-table-column>
                <el-table-column prop="" label="标题词" align="center">
                </el-table-column>
            </el-table>
            <el-table border class="form-table form-table2" :header-cell-style="headStyle">
                <el-table-column prop="" label="成交关键词" align="center" width="150">
                </el-table-column>
                <el-table-column prop="" label="访客数" align="center">
                </el-table-column>
                <el-table-column prop="" label="出现天数" align="center">
                </el-table-column>
                <el-table-column prop="" label="标题词" align="center">
                </el-table-column>
            </el-table>
            <el-table border class="form-table form-table3" :header-cell-style="headStyle">
                <el-table-column prop="" label="流量成交关键词" align="center" fixed width="150">
                </el-table-column>
                <el-table-column prop="" label="操作" align="center" fixed>
                </el-table-column>
                <el-table-column prop="" label="访客数" align="center">
                </el-table-column>
                <el-table-column prop="" label="成交数" align="center">
                </el-table-column>
                <el-table-column prop="" label="成交金额" align="center">
                </el-table-column>
                <el-table-column prop="" label="转化率" align="center">
                </el-table-column>
                <el-table-column prop="" label="出现天数" align="center">
                </el-table-column>
                <el-table-column prop="" label="标题词" align="center">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>


export default {
    data() {
        return {}
    },
    methods: {
        headStyle({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                return "color:#FF6801;background-color:rgba(255, 105, 2, 0.08)"
            } else {
                return "";
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");

.keyword-analysis {
    .warn {
        padding: 14px 0;
        font-size: 12px;
        color: #666;
    }
    .form {
        display: flex;
        justify-content: flex-start;
        .form-table {
            margin-right: 12px;
        }
    }
    .form-table1,
    .form-table2 {
        flex: 1;
    }
    .form-table3 {
        flex: 1.6;
    }
}
</style>