<template>
    <div class="liuliangTempFirst">
        <el-form label-width="80px" label-position="left">
            <!-- 日期下拉 -->
            <el-form-item :model="form" label="监控日期">
                <el-date-picker v-model="form.dateValue" type="daterange" value-format="yyyy-MM-dd" format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small"> </el-date-picker>
                <br />
                <p class="statistics">任务时长<span>{{days}}</span>天，每天发布<span>{{countbydays}}</span>个任务，此次合计发布<span>{{countbydays*days}}</span>个任务</p>
            </el-form-item>
            <el-form-item label="商品链接">
                <el-input placeholder="请输入商品链接" style="width:700px" v-model="form.target"></el-input>
            </el-form-item>
            <el-form-item :label="flag ? '关键词' + (i + 1) : '数量'" v-for="(item,i) in form.plan" :key="i">
                <div class="keywords">
                    <el-input placeholder="请输入关键词" class="input-with-select" v-model="item.keyword" style="width:250px" v-if="flag">
                        <el-button slot="append" icon="el-icon-search" @click="open">查排名</el-button>
                    </el-input>
                    <div :class="[flag ? 'keywords-right':'keywords-left']">
                        <span class="keywords-span-1" v-if="flag">数量</span>
                        <el-input-number :min="1" :max="9999" v-model="item.count" @change="smartAllocation(i)"></el-input-number>
                        <span class="keywords-span-2" @click="smartAllocation(i)">智能分配</span>
                        <span class="keywords-span-3" @click="empty(i)">清空</span>
                        <i class="iconfont icon-jianhao" @click="removePlan(i)" v-if="form.plan.length > 1"></i>
                        <i class="iconfont icon-jiahao" @click="addPlan(i)" v-if="flag"></i>
                    </div>
                    <br />
                    <el-collapse v-model="item.collapse">
                        <el-collapse-item :title="'共 '+ item.count +'个任务，已分配 '+ item.assigned + '个任务，未分配 ' + item.unassigned + ' 个'" name="1">
                            <ul class="clearfix">
                                <li v-for="(value,j) in item.hour" :key="j">
                                    <p :class="{'color':j > 19 }">{{j > 9 ? j + ":00" : "0" + j + ":00"}}</p>
                                    <input type="number" v-model="item.hour[j]" @change="changeInput(i)" min="0">
                                </li>
                            </ul>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </el-form-item>
            <el-form-item label="浏览时间">
                <el-select size="small" style="width:200px" v-model="form.browse_time">
                    <el-option label="100 - 180秒(免费)" value="100-180"></el-option>
                    <el-option label="180 - 280秒" value="180-280"></el-option>
                    <el-option label="280 - 380秒" value="280-380"></el-option>
                    <el-option label="380 - 480秒" value="380-480"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="浏览深度">
                <el-select size="small" style="width:200px" v-model="form.depth">
                    <el-option label="不浏览其他商品" value="0"></el-option>
                    <el-option label="随机浏览商品" value="1"></el-option>
                    <el-option label="深度浏览商品" value="2"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div class="settlement">
            <div class="settlement-btn" @click="submit">
                <i class="iconfont icon-fabu"></i>
                <span>发布任务</span>
            </div>
            <p class="settlement-p-1">任务耗时 <span>{{taskTime[+type]}}</span> 秒，单个任务 <span>{{price}}</span> 积分，合计消费 <span>{{price * countbydays}}</span> 积分</p>
            <br />
            <p class="settlement-p-2" v-show="vip_level === 0">升级<span>火星情报会员</span> 每单可节省 <span>{{price - vip_price}}</span> 积分，合计节省 <span>{{(price - vip_price)*countbydays}}</span> 积分</p>
        </div>
    </div>
</template>

<script>
const { shell } = require("electron");
const moment = require('moment');
import { weightFn } from "@/util/util";
import { strictEqual } from 'assert';

var defaultData = [2, 1, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 2, 1],
    emptyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

export default {
    props: ["type"],
    data() {
        return {
            days: 0,
            countbydays: 100,
            flag: true,
            price: 0, // 价格
            vip_price: 0,
            taskTime: ["100-180", "30-50", "30-50", "", "", "", "", "30-100", "", "30-30", "30-30", " 100-180"],
            form: {
                dateValue: "",
                begin_time: "",
                browse_time: "100-180",
                depth: "0",
                plan: [{
                    hour: JSON.parse(JSON.stringify(defaultData)),
                    keyword: "",
                    assigned: 100,
                    unassigned: 0,
                    count: 100,
                    collapse: ["1"]
                }]
            }
        }
    },
    computed: {
        vip_level() {
            return this.$store.state.userInfo.vip_level;
        }
    },
    mounted() {
        this.form.dateValue = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];
        this.getPrice();
    },
    methods: {
        getPrice() {
            // 获取单价
            this.$fetch.post("/price/getLieLiuPrice", { type: this.type }).then(res => {
                if (0 === res.code) {
                    this.price = this.vip_level === 0 ? res.data.price : res.data.vip_price;
                    this.vip_price = res.data.vip_price;
                }
            });
        },
        // 查排名
        open() {
            shell.openExternal("https://www.kehuda.com/");
        },
        // 改变数值
        changeInput(i) {
            this.form.plan[i].assigned = this.form.plan[i].hour.reduce((prev, curr, idx, arr) => +prev + +curr);
            this.form.plan[i].unassigned = this.form.plan[i].count - this.form.plan[i].assigned;
        },
        // 清空
        empty(i) {
            this.form.plan[i].hour = emptyData;
            this.form.plan[i].assigned = 0;
            this.form.plan[i].unassigned = this.form.plan[i].count - this.form.plan[i].assigned;
        },
        // 添加计划
        addPlan(i) {
            this.form.plan.push({
                hour: JSON.parse(JSON.stringify(defaultData)),
                keyword: "",
                assigned: 100,
                unassigned: 0,
                count: 100,
                collapse: ["1"]
            });
            var countbydays = 0;
            this.form.plan.map((item, i) => countbydays += item.count);
            this.countbydays = countbydays;
        },
        // 删除计划
        removePlan(i) {
            this.form.plan.splice(i, 1);
            var countbydays = 0;
            this.form.plan.map((item, i) => countbydays += item.count);
            this.countbydays = countbydays;
        },
        // 智能推荐
        smartAllocation(i) {
            var countbydays = 0;
            this.form.plan.map((item, i) => countbydays += item.count);
            this.countbydays = countbydays;
            this.form.plan[i].assigned = this.form.plan[i].count;
            this.form.plan[i].unassigned = 0;
            this.form.plan[i].hour = weightFn(defaultData, this.form.plan[i].count);
        },
        // 提交数据
        submit() {
            var data = JSON.parse(JSON.stringify(this.form));
            delete data.dateValue;
            data.type = this.type;
            data.plan.forEach((item, i) => item.hour = item.hour.join(","));
            data.plan = JSON.stringify(data.plan);
            this.$fetch.post("/lieliu/addTask", data).then(res => {
                0 === res.code ? this.$success(res.msg) : this.$message.error(res.msg);
            });
        }
    },
    watch: {
        "form.dateValue"(val) {
            if (Array.isArray(val)) {
                this.form.begin_time = val[0];
                this.days = moment(val[1]).diff(moment(val[0]), 'days') + 1;
            }
        },
        "type"(val) {
            if ([2, 7, 10].includes(val)) {
                this.flag = false;
                this.form.plan = [this.form.plan[0]];
                var countbydays = 0;
                this.form.plan.map((item, i) => countbydays += item.count);
                this.countbydays = countbydays;
            } else {
                this.flag = true;
            }
            this.getPrice();
        }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");
.liuliangTempFirst {
    .rel;
    min-height: calc(~"88vh - 217px");
    padding-bottom: 80px;
    .statistics {
        margin-top: 10px;
        font-size: 16px;
        color: #666;
        span {
            color: #ff6801;
        }
    }
    .el-collapse {
        margin-top: 10px;
        border: 0;
    }
    .keywords {
        width: 700px;
        .keywords-right {
            .fr;
        }
        .keywords-left {
            .fl;
        }
        .keywords-span-1 {
            padding-right: 10px;
        }
        .keywords-span-2 {
            padding: 5px 10px;
            .tc;
            color: #fff;
            cursor: pointer;
            background: #ff6801;
            border: 1px solid #ff6801;
            margin-left: 14px;
            border-radius: 4px;
            vertical-align: -1px;
        }
        .keywords-span-3 {
            padding: 5px 10px;
            .tc;
            color: #666;
            cursor: pointer;
            background: rgba(241, 245, 248, 1);
            border: 1px solid rgba(210, 210, 210, 1);
            margin-left: 14px;
            border-radius: 4px;
            vertical-align: -1px;
        }
        .icon-jianhao {
            margin-left: 10px;
            font-size: 28px;
            cursor: pointer;
            vertical-align: -5px;
            color: #ff6801;
        }
        .icon-jiahao {
            margin-left: 10px;
            color: #17cebe;
            font-size: 28px;
            cursor: pointer;
            vertical-align: -5px;
        }
        ul {
            width: 700px;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            li {
                width: 8.33%;
                margin-top: 12px;
                p {
                    width: 100%;
                    .l-h(30px);
                    .tc;
                    color: #fff;
                    background: rgba(104, 220, 230, 1);
                }
                input {
                    width: calc(~"100% - 2px");
                    .l-h(30px);
                    .tc;
                    border: 1px solid rgba(238, 238, 238, 1);
                    border-left: 0;
                    border-top: 0;
                    &:focus {
                        outline: none;
                    }
                }
                .color {
                    background-color: #4bc0e3;
                }
                &:nth-child(1) > input,
                &:nth-child(13) > input {
                    border-left: 1px solid rgba(238, 238, 238, 1);
                    border-right: 1px solid rgba(238, 238, 238, 1);
                }
            }
        }
    }
    .settlement {
        .abs;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 76px;
        border-top: 1px solid rgba(230, 232, 235, 1);
        margin-left: -20px;
        padding-left: 50px;
        .settlement-p-1 {
            .dib;
            font-size: 16px;
            line-height: 40px;
            color: #666;
            span {
                color: #ff6801;
            }
        }
        .settlement-p-2 {
            .dib;
            font-size: 15px;
            color: #999;
            span {
                color: #ff6801;
            }
        }
        .settlement-btn {
            .fr;
            cursor: pointer;
            width: 180px;
            height: 76px;
            background: rgba(255, 104, 1, 1);
            i {
                margin-left: 18px;
                color: #fff;
                font-size: 24px;
            }
            span {
                font-size: 22px;
                line-height: 76px;
                color: #fff;
                margin-left: 10px;
            }
        }
    }
}
</style>
<style lang="less">
.liuliangTempFirst {
    .el-collapse-item__header {
        height: 30px;
        line-height: 30px;
        font-size: 15px;
        color: #ff6801;
        border: 0;
    }
    .el-collapse-item__wrap {
        border: 0;
    }
    .el-collapse-item__content {
        padding-bottom: 0;
    }
}
</style>