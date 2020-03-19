<template>
    <div class="root-analysis">
        <ul class="root-analysis-tab">
            <li :class="{active:type === 'title'}" @click="type = 'title'">关键词词根分析</li>
            <li :class="{active:type === 'keywords'}" @click="type = 'keywords'">标题词根分析</li>
        </ul>
        <div class="root-analysis-table clearfix" v-if="type === 'title'">
            <div class="root-analysis-textarea">
                <el-select placeholder="请选择" @change="change(0)" v-model="checked1">
                    <el-option v-for="(item,i) in root1" :key="i" :label="item" :value="item">
                    </el-option>
                </el-select>
                <p class="warn">使用帮助：输入关键词，进行自定义查询</p>
                <el-input placeholder="添加自定义查询" class="customize" v-model="customize1"></el-input>
                <el-button type="primary" class="root-analysis-reload" @click="addCustomize(0)">添加自定义查询</el-button>
                <el-button type="primary" plain class="root-analysis-reset" @click="getTitle">重置数据</el-button>
            </div>

            <el-table border class="table" style="width:80%" :data="tableList1" height="500">
                <el-table-column prop="compete_keywords" label="词根" align="center" width="150" fixed>
                </el-table-column>
                <el-table-column prop="uv" label="访客数" align="center">
                </el-table-column>
                <el-table-column prop="payByrCntIndexNum" label="成交件数" align="center">
                </el-table-column>
                <el-table-column prop="tradeNum" label="成交金额" align="center">
                </el-table-column>
                <el-table-column prop="payRateRatio" label="转化率/%" align="center">
                </el-table-column>
                <el-table-column prop="" label="标题词" align="center">
                    <template slot-scope="scope">
                        <i class="el-icon-check" v-show="title.includes(scope.row.compete_keywords._id)"></i>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="流量词" align="center">
                    <template slot-scope="scope">
                        <i class="el-icon-check" v-show="scope.row.uv"></i>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="成交词" align="center">
                    <template slot-scope="scope">
                        <i class="el-icon-check" v-show="scope.row.tradeNum"></i>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="" label="一键分析">
                    <template slot-scope="scope">
                        <p>查看</p>
                    </template>
                </el-table-column> -->
            </el-table>
        </div>
                <div class="root-analysis-table clearfix" v-if="type === 'keywords'">
            <div class="root-analysis-textarea">
                <el-select placeholder="请选择" @change="change(1)" v-model="checked2">
                    <el-option v-for="(item,i) in root2" :key="i" :label="item" :value="item">
                    </el-option>
                </el-select>
                <p class="warn">使用帮助：输入关键词，进行自定义查询</p>
                <el-input placeholder="添加自定义查询" class="customize" v-model="customize2"></el-input>
                <el-button type="primary" class="root-analysis-reload" @click="addCustomize(1)">添加自定义查询</el-button>
                <el-button type="primary" plain class="root-analysis-reset" @click="getKeywords">重置数据</el-button>
            </div>

            <el-table border class="table" style="width:80%" :data="tableList2" height="500">
                <el-table-column prop="compete_keywords" label="词根" align="center" width="150" fixed>
                </el-table-column>
                <el-table-column prop="uv" label="访客数" align="center">
                </el-table-column>
                <el-table-column prop="payByrCntIndexNum" label="成交件数" align="center">
                </el-table-column>
                <el-table-column prop="tradeNum" label="成交金额" align="center">
                </el-table-column>
                <el-table-column prop="payRateRatio" label="转化率/%" align="center">
                </el-table-column>
                <el-table-column prop="" label="标题词" align="center">
                    <template slot-scope="scope">
                        <i class="el-icon-check" v-show="title.includes(scope.row.compete_keywords._id)"></i>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="流量词" align="center">
                    <template slot-scope="scope">
                        <i class="el-icon-check" v-show="scope.row.uv"></i>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="成交词" align="center">
                    <template slot-scope="scope">
                        <i class="el-icon-check" v-show="scope.row.tradeNum"></i>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="" label="一键分析">
                    <template slot-scope="scope">
                        <p>查看</p>
                    </template>
                </el-table-column> -->
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    props: ["itemId", "date_range", "t", "title"],
    data() {
        return {
            type: "title",
            root1: [],
            keywords1: [],
            tableList1: [],
            customize1: "",
            checked1: "",
            root2: [],
            keywords2: [],
            tableList2: [],
            customize2: "",
            checked2: "",
        }
    },
    methods: {
        getData() {
            this.getTitle();
            this.getKeywords();
        },
        getTitle() {
            this.checked1 = "";
            this.$http.post("/analysis/rootAnalysis", { itemId: this.itemId, date_range: this.date_range, type: "title" }).then(res => {
                if (0 === res.code) {
                    this.root1 = res.data.root;
                    this.keywords1 = res.data.keywords;
                    this.tableList1 = res.data.keywords;
                }
            });
        },
        getKeywords() {
            this.checked2 = "";
            this.$http.post("/analysis/rootAnalysis", { itemId: this.itemId, date_range: this.date_range, type: "keywords" }).then(res => {
                if (0 === res.code) {
                    this.root2 = res.data.root;
                    this.keywords2 = res.data.keywords;
                    this.tableList2 = res.data.keywords;
                }
            });
        },
        change(type) {
            var arr = [];
            var k = [this.keywords1, this.keywords2][+type];
            var c = [this.checked1, this.checked2][+type];
            k.map((item, i) => {
                if (item.compete_keywords.includes(c)) {
                    arr.push(item);
                }
            });
            console.log(arr,type)
            if (type === 0) {
                this.tableList1 = arr;
            } else if (type === 1) {
                this.tableList2 = arr;
            }
        },
        addCustomize(type) {
            var a = [this.customize1, this.customize2][+type];
            if (a) {
                if (type === 0) {
                    this.root1.push(a);
                    this.checked1 = a;
                } else if (type === 1) {
                    this.root2.push(a);
                    this.checked2 = a;
                }
                this.change(type);
            }
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
        padding: 10px 0;
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