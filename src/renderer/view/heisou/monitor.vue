<template>
    <div class="heisou-monitor">

        <el-dialog title="新增竞品配置监控" :visible.sync="addFlag" width="700px">
            <div class="add">
                <el-form ref="form" :model="add" label-width="80px" :inline="true">
                    <el-form-item label="竞品ID">
                        <el-input type="textarea" :rows="5" placeholder="请输入竞品ID" v-model="add.id" style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item label="监控天数">
                        <el-select v-model="add.time" placeholder="请选择" style="width:200px">
                            <el-option label="最近30天" value="30"></el-option>
                            <el-option label="最近60天" value="60"></el-option>
                            <el-option label="最近90天" value="90"></el-option>
                        </el-select>
                        </br>
                        </br>
                        <el-button type="primary" size="small" v-if="addingFlag">监控中。。。</el-button>
                        <el-button type="primary" size="small" @click="addMonitor" v-else>开始监控</el-button>
                    </el-form-item>
                </el-form>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>日志记录</span>
                    </div>
                    <div v-for="(item,i) in logList" :key="i" class="text item">
                        {{item}}
                    </div>
                </el-card>
            </div>
        </el-dialog>

        <!-- 上部表单开始 -->
        <div class="table-form">
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-form-item label="新增竞品">
                    <el-button type="primary" size="small" @click="addFlag = true">新增商品监控</el-button>
                    <el-button type="info" plain size="small">监控昨日数据</el-button>
                    <el-button type="info" plain size="small" @click="opensycm">打开生意参谋</el-button>
                </el-form-item>
                </br>
                <!-- 日期下拉 -->
                <el-form-item label="监控日期">
                    <el-select v-model="form.date" size="small" style="width:100px">
                        <el-option label="昨天" value=""></el-option>
                        <el-option label="7天" value=""></el-option>
                        <el-option label="30天" value=""></el-option>
                        <el-option label="90天" value=""></el-option>
                    </el-select>
                </el-form-item>
                <!-- 日期选择器 -->
                <el-form-item>
                    <el-date-picker v-model="form.dateValue" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small"> </el-date-picker>
                </el-form-item>
                </br>
                <!-- 单选框 -->
                <el-form-item label="店铺分类">
                    <el-select v-model="form.date" size="small" style="width:200px">
                        <el-option label="昨天" value=""></el-option>
                        <el-option label="前天" value=""></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类目分类">
                    <el-select v-model="form.date" size="small" style="width:200px">
                        <el-option label="昨天" value=""></el-option>
                        <el-option label="前天" value=""></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="宝贝ID">
                    <el-input v-model="form.search" size="small" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="关键词搜索">
                    <el-input v-model="form.search" size="small" style="width:200px"></el-input>
                </el-form-item>
                </br>
                <!-- 按钮 -->
                <el-form-item label="查询表格">
                    <el-button type="primary" size="small">开始查询</el-button>
                    <el-button type="info" plain size="small">删除</el-button>
                    <el-button type="info" plain size="small">导出Excel</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 上部表单结束 -->

        <!-- 下部表格开始 -->
        <div class="table-content">
            <el-table :data="table" style="width: 100%" border>
                <el-table-column type="selection" width="30" fixed> </el-table-column>
                <el-table-column prop="date" label="查看趋势" width="70" fixed>
                    <template slot-scope="scope">
                        <el-button @click="toCheckTrend(scope.row)" type="text" size="small">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="昨日监控" width="70" fixed> </el-table-column>
                <el-table-column prop="date" label="监控天数" width="70" fixed> </el-table-column>
                <el-table-column prop="date" label="主图" width="70" fixed>
                    <img class="picture" src="" alt="" />
                </el-table-column>
                <el-table-column prop="date" label="宝贝ID" width="120" fixed> </el-table-column>
                <el-table-column prop="date" label="访客数" width="70" fixed> </el-table-column>
                <el-table-column prop="date" label="买家数" width="70" fixed> </el-table-column>
                <el-table-column prop="date" label="支付金额" width="70" fixed> </el-table-column>
                <el-table-column prop="date" label="客单价" width="70"> </el-table-column>
                <el-table-column prop="date" label="转化率" width="70"> </el-table-column>
                <el-table-column prop="date" label="UV价值" width="70"> </el-table-column>
                <el-table-column prop="date" label="宝贝标题" width="200"> </el-table-column>
                <el-table-column prop="date" label="店铺名称" width="120"> </el-table-column>
                <el-table-column prop="date" label="类目名称" width="200"> </el-table-column>
                <el-table-column prop="date" label="开始如期" width="120"> </el-table-column>
                <el-table-column prop="date" label="截止时间" width="120"> </el-table-column>
            </el-table>
        </div>
        <!-- 下部表格结束 -->
        <div class="pagination">
            <el-pagination background layout="prev, pager, next" :page-count="total_pages" :current-page.sync="page" @current-change="getList">
            </el-pagination>
        </div>
    </div>
</template>

<script>
const { ipcRenderer, remote } = require("electron");
const { from } = require("rxjs");

import factory from "@/util/factory";

export default {
    data() {
        return {
            addFlag: false,
            addingFlag: false,
            form: {
                // 日期
                date: "",
                // 日期选择
                dateValue: "",
                // 筛选方式单选
                radio: "",
                //   搜索框
                search: "",
            },
            // 日志
            logList: [],
            logFlag: true,
            // 添加监控表单
            add: { time: "30" },
            // 表格数据
            table: [{ date: "1234" }],
            total_pages: 1,
            page: 1
        }
    },
    mounted() {
        // 获取xhr信息后处理
        ipcRenderer.on('send-xhr-data', (event, type, params, data) => {
            if (factory.obj[type]) {
                typeof factory.obj[type].callback === "function" && factory.obj[type].callback(params, data);
            }
        });
        // 获取日志
        ipcRenderer.on("get-log", (event, data) => {
            // flag 0 成功  1进行中  2 失败
            if (data.flag === 1 && this.logFlag) {
                this.logList.push(data.msg);
            }
            if (data.flag === 0 && this.logFlag) {
                this.logFlag = false;
                this.logList.push(data.msg);
                this.$message.success(data.msg);
            }
            if (data.flag === 2 && this.logFlag) {
                this.logFlag = false;
                this.logList.push(data.msg);
                this.$message.error(data.msg);
            }
        });
    },
    methods: {
        opensycm() {
            ipcRenderer.send("open-sycm");
        },
        addMonitor() {
            if (!this.add.id) {
                this.$message.error("请输入竞品ID");
                return;
            }
            this.logFlag = true;
            this.logList = ["开始获取竞品" + this.add.id];
            from(remote.BrowserWindow.getAllWindows()).subscribe(i => {
                remote.BrowserWindow.fromId(i.id).webContents.send("add-monitor", this.add);
            });
        },
        getList() { }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");

.table-form {
    padding: 28px 50px;
    font-size: 0;
    background-color: #fff;
}
.table-content {
    margin-top: 10px;
    padding: 10px 50px;
    .picture {
        width: 120px;
    }
}
.pagination {
    padding-top: 20px;
    text-align: center;
}
.add {
    .add-left {
        .fl;
    }
}
</style>