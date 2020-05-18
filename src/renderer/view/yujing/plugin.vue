<template>
    <div class="plugin">
        <img src="~@/assets/img/plugin-0.jpg" class="plugin-img" @click="open">
        <div class="title">
            <div class="tit border" :class="{active:flag}" @click="flag=true">
                <p>安装教程</p>
                <p>INSTALLATION TUTORIAL</p>
            </div>
            <div class="tit" :class="{active:!flag}" @click="flag=false">
                <p>使用教程</p>
                <p>USING TUTORIALS</p>
            </div>
        </div>
        <div v-if="flag">
            <div class="list">
                <ul>
                    <li :class="{'li-active':index === 0}" @click="index = 0">谷歌浏览器</li>
                    <li :class="{'li-active':index === 1}" @click="index = 1">360安全浏览器</li>
                    <li :class="{'li-active':index === 2}" @click="index = 2">QQ浏览器</li>
                    <li :class="{'li-active':index === 3}" @click="index = 3">360极速浏览器</li>
                </ul>
            </div>
            <div v-if="index === 0">
                <img src="~@/assets/img/gg_01.jpg">
                <img src="~@/assets/img/gg_02.jpg">
                <img src="~@/assets/img/gg_03.jpg">
                <img src="~@/assets/img/gg_04.jpg">
            </div>
            <div v-else-if="index === 1">
                <img src="~@/assets/img/360safe_01.jpg">
                <img src="~@/assets/img/360safe_02.jpg">
                <img src="~@/assets/img/360safe_03.jpg">
                <img src="~@/assets/img/360safe_04.jpg">
            </div>
            <div v-else-if="index === 2">
                <img src="~@/assets/img/QQ_01.jpg">
                <img src="~@/assets/img/QQ_02.jpg">
                <img src="~@/assets/img/QQ_03.jpg">
                <img src="~@/assets/img/QQ_04.jpg">
            </div>
            <div v-else-if="index === 3">
                <img src="~@/assets/img/360fast_01.jpg">
                <img src="~@/assets/img/360fast_02.jpg">
                <img src="~@/assets/img/360fast_03.jpg">
                <img src="~@/assets/img/360fast_04.jpg">
            </div>
        </div>
        <div v-else>
            <div class="list"></div>
            <div>
                <img src="~@/assets/img/tutorial_01.jpg">
                <img src="~@/assets/img/tutorial_02.jpg">
                <img src="~@/assets/img/tutorial_03.jpg">
                <img src="~@/assets/img/tutorial_04.jpg">
            </div>
        </div>
    </div>
</template>

<script>
import config from "@/config/config";
import { download } from "@/util/electronFun";

export default {
    data() {
        return {
            flag: true,
            index: 0
        }
    },
    methods: {
        open() {
            download(config.qnUrl + "1589789658231.zip");
        }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");
.plugin {
    .plugin-img {
        cursor: pointer;
    }
    img {
        .db;
        width: 100%;
        height: auto;
    }
    .title {
        display: flex;
        width: 600px;
        margin: 0 auto;
        margin-top: 80px;
        height: 50px;
    }
    .tit {
        .tc;
        width: 50%;
        cursor: pointer;
        p {
            margin-top: 10px;
            font-size: 10px;
            color: #999;
            &:nth-child(1) {
                margin-top: 5px;
                font-size: 24px;
                color: #333;
            }
        }
    }
    .active {
        p {
            color: #ffbc86;
            &:nth-child(1) {
                color: #ff9d4d;
            }
        }
    }
    .border {
        border-right: 4px solid rgba(255, 157, 77, 1);
    }
    .list {
        margin-top: 40px;
        padding-bottom: 20px;
        border-bottom: 1px solid #f2f2f2;
        margin-bottom: 30px;
        ul {
            display: flex;
        }
        li {
            .tc;
            width: 100px;
            .l-h(24px);
            cursor: pointer;
            font-size: 14px;
            color: #666;
            margin-left: 30px;
            margin-right: 60px;
        }
        .li-active {
            background: rgba(255, 157, 77, 1);
            border-radius: 12px;
            color: #fff;
        }
    }
}
</style>