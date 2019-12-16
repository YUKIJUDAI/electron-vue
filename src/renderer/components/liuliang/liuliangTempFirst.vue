<template>
    <div class="liuliangTempFirst">
        <el-form label-width="80px" label-position="left">
            <!-- 日期下拉 -->
            <el-form-item :model="form" label="监控日期">
                <el-select v-model="form.date" size="small" style="width:100px">
                    <el-option label="1天" value="1"></el-option>
                    <el-option label="3天" value="3"></el-option>
                    <el-option label="7天" value="7"></el-option>
                    <el-option label="30天" value="30"></el-option>
                    <el-option label="自定义" value="0"></el-option>
                </el-select>
                <el-date-picker v-model="form.dateValue" type="daterange" value-format="yyyy-MM-dd" format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small"> </el-date-picker>
                <br />
                <p class="statistics">任务时长<span>1</span>天，每天发布<span>100</span>个任务，此次合计发布<span>100</span>个任务</p>
            </el-form-item>
            <el-form-item label="商品链接">
                <el-input placeholder="请输入商品链接" style="width:700px"></el-input>
            </el-form-item>
            <el-form-item label="关键词一">
                <div class="keywords">
                    <el-input placeholder="请输入关键词" class="input-with-select" style="width:300px">
                        <el-button slot="append" icon="el-icon-search">查排名</el-button>
                    </el-input>
                    <div class="keywords-right">
                        <span class="keywords-span-1">数量</span>
                        <el-input-number :min="1" :max="9999"></el-input-number>
                        <span class="keywords-span-2">时段</span>
                        <i class="iconfont icon-jianhao"></i>
                        <i class="iconfont icon-jiahao"></i>
                    </div>
                    <br />
                    <ul class="clearfix">
                        <li v-for="(i,item) in 24" :key="i">
                            <p :class="{'color':i > 19 }">00:00</p><input type="text">
                        </li>
                    </ul>
                </div>
            </el-form-item>
            <el-form-item label="浏览时间">
                <el-select size="small" style="width:200px">
                    <el-option label="100 - 180秒(免费)" value="1"></el-option>
                    <el-option label="180 - 280秒" value="2"></el-option>
                    <el-option label="280 - 380秒" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="浏览深度">
                <el-select size="small" style="width:200px">
                    <el-option label="不浏览其他商品" value="1"></el-option>
                    <el-option label="随机浏览商品" value="2"></el-option>
                    <el-option label="深度浏览商品" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="任务备注">
                <el-input placeholder="任务备注（可不填）" style="width:700px"></el-input>
            </el-form-item>
        </el-form>
        <div class="settlement">
            <div class="settlement-btn">
                <i class="iconfont icon-fabu"></i>
                <span>发布任务</span>
            </div>
            <p class="settlement-p-1">任务耗时 <span>180</span> 秒，单个任务 <span>6</span> 金币，合计消费 <span>600</span> 金币</p>
            <br />
            <p class="settlement-p-2">升级<span>普通会员</span> 本次可节省 <span>80</span> 金币，合计消费 <span>520</span> 金币</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {}
        }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");
.liuliangTempFirst {
    .rel;
    min-height: calc(~"88vh - 247px");
    padding-bottom: 80px;
    .statistics {
        margin-top: 10px;
        font-size: 16px;
        color: #666;
        span {
            color: #ff6801;
        }
    }
    .keywords {
        width: 700px;
        .keywords-right {
            .fr;
        }
        .keywords-span-1 {
            padding-right: 10px;
        }
        .keywords-span-2 {
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