<template>
    <div class="limit">
        <div class="head">
            <input type="text" class="input input1" v-model="keyword" placeholder="请输入关键词">
            <input type="text" class="input input2" v-model="url" placeholder="请输入宝贝链接">
            <div type="text" class="sumit-btn" @click="monitoringAuthority('createCode')">生成卡首屏二维码</div>
        </div>
        <p class="msg">功能概述: 方便买家快速定位宝贝，提高宝贝关键词权重，提升排名，补单必备！</p>
        <div class="code">
            <canvas ref="code"> </canvas>
        </div>
        <div class="introduction">
            <ul>
                <li><i class="icon-star"></i>功能免费使用，每日生成上限为100次;</li>
                <li><i class="icon-star"></i>去年淘宝有过升级，关键词卡首屏受此影响，原来的卡首屏技术（不卡任何条件）已经失效。 现在的卡首屏会带上卡一定的条件，比如：品牌等，所以理论上权重一定会比完全不卡条件的情况下低。 </li>
                <li><i class="icon-star"></i>卡首屏淘口令获取方式：手淘扫码，扫码结果页点击分享，选择微信/QQ分享即可获取淘口令</li>
            </ul>
        </div>
    </div>
</template>

<script>
var QRCode = require('qrcode');
import { monitoringAuthority } from "@/util/util";

export default {
    data() {
        return {
            url: "",
            keyword: ""
        }
    },
    methods: {
        // 权限
        monitoringAuthority(type, ...arg) {
            monitoringAuthority(this, type, ...arg);
        },
        async createCode() {
            if (!this.url || this.url.indexOf('http') < 0) {
                this.$message.error("请输入正确的网址");
                return;
            }
            var res = await this.$http.post("/tool/searchToHead", { url: this.url, keyword: this.keyword });
            if (0 === res.code) {
                QRCode.toCanvas(this.$refs.code, res.data, { width: 240, height: 240, margin: 0, errorCorrectionLevel: 'H' });
            } else {
                this.$message.error(res.msg);
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");

.limit {
    .head {
        display: flex;
    }
    .code {
        margin-top: 25px;
        margin-bottom: 40px;
        margin-left: 300px;
        canvas {
            width: 0;
        }
    }
    .input {
        width: 184px;
        height: 14px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(204, 204, 204, 1);
        padding: 11px 16px;
        font-size: 14px;
        color: #333;
    }
    .input2 {
        width: 462px;
        margin-left: 20px;
    }
    .sumit-btn {
        .tc;
        width: 152px;
        .l-h(38px);
        color: #fff;
        font-size: 16px;
        background: var(--themeColor);
        margin-left: 20px;
        cursor: pointer;
    }
    .msg {
        font-size: 14px;
        color: #333;
        margin-top: 12px;
    }
    .introduction {
        width: 90%;
        height: 150px;
        background: rgba(255, 249, 245, 1);
        border-radius: 20px;
        ul {
            padding: 0 18px;
            padding-top: 22px;
        }
        li {
            font-size: 14px;
            color: #666;
            padding-bottom: 10px;
        }
        .icon-star {
            .dib;
            .wh(18px);
            .bg("~@/assets/icon/star.png");
            vertical-align: -3px;
            margin-right: 12px;
        }
    }
}
</style>