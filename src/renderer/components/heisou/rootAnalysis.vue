<template>
    <div class="root-analysis">
        <ul class="root-analysis-tab">
            <li :class="{active:tabIndex === 0}">关键词词根分析</li>
            <li :class="{active:tabIndex === 1}">标题词根分析</li>
        </ul>
        <div class="root-analysis-table clearfix">
            <div class="root-analysis-textarea">
                <el-input type="textarea" :rows="20" v-model="textarea" />
                <p class="warn">使用帮助：输入关键词，进行自定义查询</p>
                <el-button type="primary" class="root-analysis-reload">自定义查询</el-button>
                <el-button type="primary" plain class="root-analysis-reset">重置数据</el-button>
            </div>

            <el-table border class="table" style="width:1103px">
                <el-table-column prop="" label="词根" align="center" width="150" fixed>
                </el-table-column>
                <el-table-column prop="" label="访客数" align="center">
                </el-table-column>
                <el-table-column prop="" label="成交件数" align="center">
                </el-table-column>
                <el-table-column prop="" label="成交金额" align="center">
                </el-table-column>
                <el-table-column prop="" label="转化率/%" align="center">
                </el-table-column>
                <el-table-column prop="" label="标题词" align="center">
                </el-table-column>
                <el-table-column prop="" label="流量词" align="center">
                </el-table-column>
                <el-table-column prop="" label="成交词" align="center">
                </el-table-column>
                <el-table-column prop="" label="一键分析">
                    <template slot-scope="scope">
                        <p>查看</p>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tabIndex: 0,
            textarea: ""
        }
    },
    methods: {
        change(val) {
            console.log(val)
        },
        change1(val) {
            val = val.replace(/;/g, ";</br>");
            val = val.replace(/；/g, "；</br>");
            return val;
        }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");
.root-analysis {
    .root-analysis-tab {
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
    .warn {
        padding-top: 10px;
        font-size: 14px;
        color: #999;
    }
    .root-analysis-table {
        overflow: hidden;
        .root-analysis-textarea {
            .fl;
            width: 150px;
            margin-right: 20px;
        }
        .table {
            .fl;
        }
        .root-analysis-reload,
        .root-analysis-reset {
            width: 150px;
            margin-top: 10px;
        }
        .root-analysis-reset {
            margin-left: 0;
        }
    }
}
</style>