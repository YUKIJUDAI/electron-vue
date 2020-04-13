<template>
    <div class="dataChange">
        <div class="header">
            <p>选择指数</p>
            <ul>
                <li :class="{active:index === i}" v-for="(item,i) in arr" :key="i" @click="index = i">{{item.name}}</li>
            </ul>
        </div>
        <div class="body">
            <div class="body-left">
                <p>{{arr[index].name}}</p>
                <div class="body-input">
                    <div class="body-input-padding">
                        <input class="body-inputs" v-for="(item,i) in data" :key="i" :placeholder="i === 0 ? '输入指数，一行一个':''" />
                    </div>
                </div>
            </div>
            <div class="body-center">
                <el-button type="primary" class="body-btn"><i class="el-icon-sort"></i>转成真实值</el-button>
                <br />
                <br />
                <el-button type="primary" class="body-btn"><i class="el-icon-download"></i>下载数据</el-button>
            </div>
            <div class="body-right">
                <p>{{arr[index].rename}}</p>
                <div class="body-input">
                    <div class="body-input-padding">
                        <input class="body-inputs"></input>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            arr: [
                { name: "流量指数", rename: "访客人数" },
                { name: "支付转化指数", rename: "支付转化率" },
                { name: "交易指数", rename: "交易金额" },
                { name: "关键词交易指数", rename: "关键词交易金额" },
                { name: "加购人气", rename: "加购人数" },
                { name: "搜索人气", rename: "搜索人数" },
                { name: "客群指数", rename: "支付人数" },
                { name: "收藏人气", rename: "收藏人数" }
            ],
            data: [
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            index: 0
        }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");

.dataChange {
    margin-top: 15px;
    padding: 0 20px;
    .header {
        margin-top: 30px;
        display: flex;
        p {
            width: 80px;
            font-size: 14px;
            .l-h(34px);
        }
        ul {
            display: flex;
            flex-wrap: wrap;
            li {
                cursor: pointer;
                width: 112px;
                .l-h(32px);
                .tc;
                background: rgba(241, 245, 248, 1);
                border: 1px solid rgba(238, 238, 238, 1);
                margin-left: 20px;
                margin-bottom: 20px;
                font-size: 14px;
                color: #777;
            }
            .active {
                background: rgba(255, 104, 1, 1);
                color: #fff;
            }
        }
    }
    .body {
        margin-top: 60px;
        padding: 0 20px;
        display: flex;
        .body-input {
            width: 358px;
            height: 400px;
            border: 2px solid rgba(29, 235, 155, 1);
            margin-top: -10px;
        }
        .body-input-padding {
            padding: 50px 63px;
        }
        .body-inputs {
            width: 206px;
            height: 14px;
            padding: 9px 13px;
            border: 1px solid rgba(204, 204, 204, 1);
            margin-bottom: 20px;
            &:focus {
                outline: none;
            }
        }
        .body-left,
        .body-right {
            p {
                .dib;
                color: #1deb9b;
                font-size: 14px;
                background: #fff;
                padding: 0 20px;
                margin-left: 20px;
            }
        }
        .body-right {
            p {
                color: #ff6801;
            }
            .body-input {
                border: 2px solid rgba(255, 104, 1, 1);
            }
        }
        .body-center {
            margin-top: 140px;
            padding: 0 50px;
            .body-btn {
                width: 140px;
                height: 40px;
            }
            .el-icon-sort,
            .el-icon-download {
                font-size: 16px;
                vertical-align: -2px;
                padding-right: 5px;
            }
            .el-icon-sort {
                transform: rotate(90deg);
                vertical-align: -7px;
                padding-top: 10px;
                padding-right: 0px;
            }
        }
    }
}
</style>