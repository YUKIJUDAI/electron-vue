<template>
    <div class="detail">
        <div class="goods_info">
            <div class="goods_info_left">
                <img :src="data.goods_img">
            </div>
            <div class="goods_info_right">
                <p class="goods_info_title">{{data.goods_title}}</p>
                <span>店铺：{{data.shop_name}}</span>
                <span>旺旺：{{data.wang}}</span>
            </div>
        </div>
        <div class="order_info">
            <p>任务详情</p>
            <ul>
                <li>任务ID：<span>{{data.id}}</span></li>
                <li style="width:60%">商品链接：<span>{{data.target}}</span></li>
                <li>任务类型：<span>{{data.type}}</span></li>
                <li>关键词：<span>{{data.keyword}}</span></li>
                <li>浏览时间：<span>{{data.browse_time}}</span></li>
                <li>浏览深度：<span>{{data.depth}}</span></li>
                <li>任务数量：<span>总任务 {{data.count}} 个(已完成{{data.count - data.less}}个/未完成{{data.less}}个)</span></li>
                <li>任务积分：<span>{{data.gold}}</span></li>
                <li>任务状态：<span>{{data.status}}</span></li>
                <li>任务日期：<span>{{data.begin_time}}</span></li>
                <li style="width:100%">任务备注：{{data.remark}}<span></span></li>
                <li style="width:100%">任务时段：
                    <div class="timer">
                        <div v-for="(item,i) in data.hour" :key="i">
                            <p>{{i}}:00</p>
                            <p>{{item}}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="goods_btn">
            <el-button type="primary" @click="changeIndex">返回列表</el-button>
            <el-button type="primary" v-if="data.status_val === '0'" @click="cancelTask">取消任务</el-button>
        </div>
    </div>
</template>

<script>
export default {
    props: ["id"],
    data() {
        return {
            data: {
                hour: []
            }
        }
    },
    created() {
        this.getDetail();
    },
    methods: {
        async getDetail() {
            var res = await this.$fetch.post("/lieliu/getLieLiuDetail", { id: this.id });
            if (0 === res.code) {
                res.data.hour && (res.data.hour = res.data.hour.split(","));
                this.data = res.data;
            }
        },
        async cancelTask() {
            var res = await this.$fetch.post("/lieliu/cancelTask", { id: this.id });
            if (0 === res.code) {
                this.$message.success(res.msg);
                this.changeIndex();
            } else {
                this.$message.error(res.msg);
            }
        },
        changeIndex() {
            this.$emit("changeIndex", 0, "");
        }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");

.detail {
    margin: 0 20px;
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
                margin-bottom: 30px;
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
    .order_info {
        background: #fff8f3;
        margin-top: 20px;
        padding: 20px 30px;
        border-radius: 10px;
        ul {
            display: flex;
            flex-wrap: wrap;
        }
        li {
            margin-top: 20px;
            width: 40%;
            color: #999;
            font-size: 14px;
        }
        .timer {
            display: flex;
            flex-wrap: wrap;
            width: 792px;
            border: 1px solid #eee;
            border-width: 1px 0 0 1px;
            margin-top: 20px;
            div {
                border: 1px solid #eee;
                border-width: 0 1px 1px 0;
                width: 65px;
                .tc;
            }
            p {
                .l-h(25px);
                background-color: #f6f6f6;
                &:nth-child(2) {
                    background-color: #fff;
                }
            }
        }
    }
    .goods_btn {
        margin-top: 20px;
        font-size: 16px;
    }
}
</style>