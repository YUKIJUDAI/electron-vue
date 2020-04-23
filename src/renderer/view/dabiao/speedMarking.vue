<template>
    <div class="speedMarking">
        <div class="head">
            <input type="text" class="input input2" v-model="keyword" placeholder="请输入打标关键词">
            <div type="text" class="sumit-btn" @click="createCode" v-has>生成极速打标二维码</div>
        </div>
        <p class="msg">功能概述：先把用户在你类目下的权重值及标签精准提升上去，再让他下单，效果你懂的！</p>
        <div class="code">
            <canvas ref="code"> </canvas>
        </div>
    </div>
</template>

<script>
var QRCode = require('qrcode');

export default {
    data() {
        return {
            keyword: ""
        }
    },
    methods: {
        async createCode() {
            var res = await this.$http.post("/tool/superMarking", { keyword: this.keyword });
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

.speedMarking {
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
    }
    .sumit-btn {
        .tc;
        width: 182px;
        .l-h(38px);
        color: #fff;
        font-size: 16px;
        background: @color;
        margin-left: 20px;
        cursor: pointer;
    }
    .msg {
        font-size: 14px;
        color: #333;
        margin-top: 12px;
    }
}
</style>