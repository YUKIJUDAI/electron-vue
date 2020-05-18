<template>
    <div class="speedMarking">
        <div class="head">
            <input type="text" class="input" v-model="keyword1" placeholder="请输入关键词1">
            <input type="text" class="input" v-model="keyword2" placeholder="请输入关键词2">
            <input type="text" class="input" v-model="keyword3" placeholder="请输入关键词3">
            <div type="text" class="sumit-btn" @click="monitoringAuthority('createCode')">生成极速打标二维码</div>
        </div>
        <p class="msg">功能概述：先把用户在你类目下的权重值及标签精准提升上去，再让他下单，效果你懂的！</p>
        <div class="code">
            <div>
                <p>{{keywordList[0]}}</p>
                <canvas ref="code"> </canvas>
            </div>
            <div>
                <p>{{keywordList[1]}}</p>
                <canvas ref="code"> </canvas>
            </div>
            <div>
                <p>{{keywordList[2]}}</p>
                <canvas ref="code"> </canvas>
            </div>
            <div>
                <p>{{keywordList[3]}}</p>
                <canvas ref="code"> </canvas>
            </div>
            <div>
                <p>{{keywordList[4]}}</p>
                <canvas ref="code"> </canvas>
            </div>
            <div>
                <p>{{keywordList[5]}}</p>
                <canvas ref="code"> </canvas>
            </div>
        </div>
    </div>
</template>

<script>
import { monitoringAuthority } from "@/util/util";
import { Loading } from 'element-ui';
var QRCode = require('qrcode');

export default {
    data() {
        return {
            keywordList: [],
            keyword1: "",
            keyword2: "",
            keyword3: "",
            config: { width: 200, height: 200, margin: 0, errorCorrectionLevel: 'M' }
        }
    },
    methods: {
        // 权限
        monitoringAuthority(type, ...arg) {
            monitoringAuthority(this, type, ...arg);
        },
        async createCode() {
            let loadingInstance = Loading.service({ background: 'rgba(0,0,0,.1)', text: "数据量过大，加载较慢，请耐心等待！" });
            var res = await this.$http.post("/tool/superMarking", { keyword: [this.keyword1, this.keyword2, this.keyword3] });
            loadingInstance.close();
            if (0 === res.code) {
                var a = [], b = [];
                res.data.map((item, i) => {
                    a.push(...item.url);
                    for (let index = 1; index <= item.url.length; index++) {
                        b.push(item.keyword + "-" + index);
                    }
                });
                this.keywordList = b;
                a.map((item, i) => {
                    QRCode.toCanvas(document.querySelectorAll("canvas")[i], item, this.config);
                });
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
        margin-bottom: 20px;
        display: flex;
        flex-wrap: wrap;
        p {
            height: 30px;
            font-size: 18px;
            color: #333;
        }
        div {
            width: 30%;
            margin-bottom: 20px;
            .tc;
        }
        canvas {
            width: 0;
        }
    }
    .input {
        width: 184px;
        margin-right: 20px;
        height: 14px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(204, 204, 204, 1);
        padding: 11px 16px;
        font-size: 14px;
        color: #333;
    }
    .sumit-btn {
        .tc;
        width: 182px;
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
}
</style>