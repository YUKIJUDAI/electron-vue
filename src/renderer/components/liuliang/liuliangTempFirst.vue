<template>
    <div class="liuliangTempFirst">
        <el-form label-width="80px" label-position="left">
            <el-form-item label="商品链接">
                <el-input placeholder="请输入商品链接" style="width:700px" v-model="form.target" @change="changeTarget"></el-input>
                <div class="goods_info" v-show="goodsFlag">
                    <div class="goods_info_left">
                        <img :src="form.goods_img">
                    </div>
                    <div class="goods_info_right">
                        <p class="goods_info_title">{{form.goods_title}}</p>
                        <span>店铺：{{form.shop_name}}</span>
                        <span>旺旺：{{form.wwid}}</span>
                    </div>
                </div>
            </el-form-item>
            <template v-for="(item,i) in form.plan">
                <el-form-item :label="'关键词' + (i + 1)" v-show="flag === 0 || flag === 1">
                    <div class="keywords">
                        <el-input placeholder="请输入关键词" class="input-with-select" v-model="item.keyword" style="width:600px">
                            <el-button slot="append" icon="el-icon-search" @click="open(i)">查排名</el-button>
                        </el-input>
                        <div class="keywords-right">
                            <i class="iconfont icon-jianhao" @click="removePlan(i)" v-show="form.plan.length > 1"></i>
                            <i class="iconfont icon-jiahao" @click="addPlan(i)"></i>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="每日数量">
                    <div class="keywords">
                        <el-input-number :min="1" :max="9999" v-model="item.count" @change="smartAllocation(i)"></el-input-number>
                        <el-radio-group v-show="flag === 3" style="margin-left:40px" v-model="automatic">
                            <el-radio :label="0">自动当天完成</el-radio>
                            <el-radio :label="1">手动指定时段</el-radio>
                        </el-radio-group>
                        <div class="keywords-right show" v-show="flag === 0">
                            <span>展现</span>
                            <el-input size="small" style="width:80px" v-model="item.show_count" @change="changeShow(i)"></el-input>
                            <span class="circle" @click="item.multiple = 1,item.show_count=item.multiple * item.count" :class="{active:item.multiple===1}">1倍</span>
                            <span class="circle" @click="item.multiple = 3,item.show_count=item.multiple * item.count" :class="{active:item.multiple===3}">3倍</span>
                            <span class="circle" @click="item.multiple = 5,item.show_count=item.multiple * item.count" :class="{active:item.multiple===5}">5倍</span>
                        </div>
                        <br />
                        <el-collapse v-model="item.collapse" v-show="flag !== 2 && automatic === 1">
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
            </template>
            <el-form-item label="浏览时间" v-show="flag === 0 || flag === 1">
                <el-select size="small" style="width:200px" v-model="form.browse_time" @change="changeBorwseTime">
                    <el-option :label="item.serve_name" :value="item.value" v-for="(item,i) in browse_time[type]"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="浏览深度" v-show="flag === 0 || flag === 1">
                <el-select size="small" style="width:200px" v-model="form.depth">
                    <el-option label="不浏览其他商品" value="0"></el-option>
                    <el-option label="随机浏览商品" value="1"></el-option>
                    <el-option label="深度浏览商品" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="任务备注">
                <el-input size="small" style="width: 700px;" v-model="form.remark"></el-input>
            </el-form-item>
            <!-- 日期下拉 -->
            <el-form-item :model="form" label="任务日期">
                <el-date-picker v-model="form.dateValue" type="daterange" value-format="yyyy-MM-dd" format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small"> </el-date-picker>
                <br />
                <p class="statistics">任务时长<span>{{days}}</span>天，每天发布<span>{{countbydays}}</span>个任务，此次合计发布<span>{{countbydays*days}}</span>个任务</p>
            </el-form-item>
        </el-form>
        <div class="settlement">
            <div class="settlement-btn" @click="submit">
                <i class="iconfont icon-fabu"></i>
                <span>发布任务</span>
            </div>
            <p class="settlement-p-1">任务耗时 <span>{{taskTime[+type]}}</span> 秒，单个任务 <span>{{price[type].price + browse_price}}</span> 积分，合计消费 <span>{{(price[type].price + browse_price)*countbydays*days}}</span> 积分</p>
            <br />
            <p class="settlement-p-2" v-show="vip_level === 0">升级<span>会员</span> 每单可节省 <span>{{price[type].price + browse_price - price[type].vip_price}}</span> 积分，合计节省 <span>{{(price[type].price + browse_price - price[type].vip_price)*countbydays*days}}</span> 积分</p>
        </div>
    </div>
</template>

<script>
const { shell } = require("electron");
const moment = require('moment');
const qs = require("qs");
import { weightFn } from "@/util/util";

// 默认配置 , 空配置
var defaultData = [2, 1, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 2, 1],
    emptyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

export default {
    props: ["type"],
    data() {
        return {
            // 任务时常
            days: 0,
            // 任务天数
            countbydays: 100,
            // 是否显示关键词
            flag: 0,
            // 商品flag
            goodsFlag: false,
            // 时间自动手动
            automatic: 1,
            // 价格
            price: [],
            // 浏览时间
            browse_time: [],
            // 浏览价格
            browse_price: 0,
            // 任务时常
            taskTime: ["100-180", "30-50", "30-50", "", "", "", "", "30-100", "", "30-30", "30-30", " 100-180"],
            // 提交的表单
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
                    collapse: ["1"],
                    show_count: 300,
                    multiple: 3
                }]
            }
        }
    },
    computed: {
        vip_level() {
            return this.$store.state.userInfo.vip_level;
        }
    },
    created() {
        this.form.dateValue = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];
        this.getPrice();
    },
    methods: {
        async getPrice() {
            // 获取单价
            var res = await this.$fetch.post("/price/getLieLiuPrice", { type: this.type });
            if (0 === res.code) {
                var a = [], b = [];
                res.data.price.forEach((item, i) => {
                    item.price = this.vip_level === 0 ? item.price : item.vip_price;
                    a[item.type] = item;
                });
                b[0] = res.data.app;
                b[9] = res.data.app;
                b[11] = res.data.app;
                b[1] = res.data.pc;
                this.price = a;
                this.browse_time = b;
            }
        },
        // 查排名
        open(i) {
            var id = qs.parse(this.form.target.split('?')[1]).id;
            var keyword = this.form.plan[i].keyword || "";
            shell.openExternal("https://www.kehuda.com/#username=" + id + "&keyword=" + keyword + "&shebei=1");
        },
        // 改变url
        async changeTarget() {
            if (!this.form.target) return;
            this.form.target = this.form.target.split("?")[0] + "?id=" + qs.parse(this.form.target.split('?')[1]).id;
            var res = await this.$fetch.post("/lieliu/getGoodsInfo", { url: this.form.target });
            if (0 === res.code) {
                this.form = Object.assign(this.form, res.data);
                this.goodsFlag = true;
            } else {
                this.form = Object.assign(this.form, { "goods_title": "", "goods_img": "", "shop_name": "", "wwid": "" });
                this.goodsFlag = false;
            }
        },
        changeBorwseTime(value) {
            this.browse_price = this.browse_time[this.type].filter(item => item.value === value)[0].price;
        },
        changeShow(i) {
            if (this.form.plan[i].show_count % this.form.plan[i].count !== 0) {
                this.form.plan[i].show_count = this.form.plan[i].count * Math.ceil(this.form.plan[i].show_count / this.form.plan[i].count);
            }
            this.form.plan[i].multiple = this.form.plan[i].show_count % this.form.plan[i].count;
        },
        // 改变数值
        changeInput(i) {
            this.form.plan[i].count = this.form.plan[i].hour.reduce((prev, curr, idx, arr) => +prev + +curr);
            this.form.plan[i].assigned = this.form.plan[i].count;
            var countbydays = 0;
            this.form.plan.map((item, i) => countbydays += item.count);
            this.countbydays = countbydays;
            this.form.plan[i].show_count = this.form.plan[i].count * this.form.plan[i].multiple;
            this.form.plan[i].assigned = this.form.plan[i].count;
            this.form.plan[i].unassigned = 0;
        },
        // 添加计划
        addPlan(i) {
            this.form.plan.push({
                hour: JSON.parse(JSON.stringify(defaultData)),
                keyword: "",
                assigned: 100,
                unassigned: 0,
                count: 100,
                collapse: ["1"],
                show_count: 300,
                multiple: 3
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
            this.form.plan[i].show_count = this.form.plan[i].count * this.form.plan[i].multiple;
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
                0 === res.code ? this.$message.success(res.msg) : this.$message.error(res.msg);
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
            if ([0, 9, 11].includes(val)) {
                this.flag = 0;
                this.form.browse_time = "100-180";
            } else if ([1].includes(val)) {
                this.flag = 1;
                this.form.browse_time = "30-50";
            } else if ([2].includes(val)) {
                this.flag = 2;
                this.form.plan = [this.form.plan[0]];
                var countbydays = 0;
                this.form.plan.map((item, i) => countbydays += item.count);
                this.countbydays = countbydays;
            } else if ([7, 10].includes(val)) {
                this.flag = 3;
                this.form.plan = [this.form.plan[0]];
                var countbydays = 0;
                this.form.plan.map((item, i) => countbydays += item.count);
                this.countbydays = countbydays;
            }
            this.automatic = 1;
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
    .goods_info {
        margin-top: 20px;
        display: flex;
        .goods_info_left {
            .wh(80px);
            img {
                .wh(100%);
            }
        }
        .goods_info_right {
            margin-left: 30px;
            p {
                margin-bottom: 10px;
                font-size: 16px;
                color: #333;
            }
            span {
                color: #999;
                &:nth-child(3) {
                    padding-left: 200px;
                }
            }
        }
    }
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
        .show {
            color: #333;
            .circle {
                border: 1px solid #dcdfe6;
                border-radius: 20px;
                padding: 5px 10px;
                cursor: pointer;
            }
            .active {
                border: 1px solid #ff6801;
                background: #ff6801;
                color: #fff;
            }
        }
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