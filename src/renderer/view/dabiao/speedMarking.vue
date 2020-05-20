<template>
    <div class="speedMarking">
        <div class="head">
            <input type="text" class="input" v-model="keyword1" placeholder="请输入关键词1">
            <input type="text" class="input" v-model="keyword2" placeholder="请输入关键词2">
            <input type="text" class="input" v-model="keyword3" placeholder="请输入关键词3">
            <div class="sumit-btn" @click="monitoringAuthority('createCode')">生成极速打标二维码</div>
            <div class="sumit-btn" @click="save()">保存二维码</div>
        </div>
        <p class="msg">功能概述：先把用户在你类目下的权重值及标签精准提升上去，再让他下单，效果你懂的！</p>
        <div class="help">
            <p class="help_title">最强权重方法：</p>
            <pre>1、【打标】给用户打上精准标签;
2、【查权重/标签】确认已经是超高权重用户
3、【魔搜卡位】卡出中大词的位置，给到用户浏览进行下一步

【使用方法】
1、输入跟打标类目相关的关键词 （建议使用二级词，最多同时输入3个关键词），点击生成急速打标二维码
2、让下单用户手淘扫描二维码进入详情页（可直接保存到本地）
3、进入详情页 浏览十秒以上
4、建议随机选三个二维码重复上述扫码浏览操作
5、30分钟后再去查看权重值，该类目下权重值可得到显著提升
（实际上5分钟内已经完成账户打标和增权，因存在数据更新延迟，所以建议30分钟后再查询）

【注意事项】
必须手淘扫码浏览，直接在手淘以淘口令等形式分享商品， 将无法获得显著提升
            </pre>
        </div>
        <div class="code">
            <div>
                <p class="code-p">{{keywordList[0]}}</p>
                <canvas ref="code"> </canvas>
            </div>
            <div>
                <p class="code-p">{{keywordList[1]}}</p>
                <canvas ref="code"> </canvas>
            </div>
            <div>
                <p class="code-p">{{keywordList[2]}}</p>
                <canvas ref="code"> </canvas>
            </div>
            <div>
                <p class="code-p">{{keywordList[3]}}</p>
                <canvas ref="code"> </canvas>
            </div>
            <div>
                <p class="code-p">{{keywordList[4]}}</p>
                <canvas ref="code"> </canvas>
            </div>
            <div>
                <p class="code-p">{{keywordList[5]}}</p>
                <canvas ref="code"> </canvas>
            </div>
        </div>
        <el-dialog title="数据下载" :visible.sync="progressDialog" width="400px" height="200px" :close-on-click-modal="false">
            <p class="progress">数据下载中请稍后。。。</p>
            <el-progress :text-inside="true" :stroke-width="26" :percentage="percentage"></el-progress>
        </el-dialog>
    </div>
</template>

<script>
import { monitoringAuthority } from "@/util/util";
import { downloadSuccess } from "@/util/electronFun";
import { ewm } from "@/util/fs";
import { Loading } from 'element-ui';
var QRCode = require('qrcode');

export default {
    data() {
        return {
            keywordList: [],
            keyword1: "",
            keyword2: "",
            keyword3: "",
            config: { width: 200, height: 200, margin: 0, errorCorrectionLevel: 'M' },
            // 进度条
            progressDialog: false,
            percentage: 0,
        }
    },
    mounted() {
        downloadSuccess(this, "ewm");
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
        },
        save() {
            
            var arr = [];
            Array.prototype.map.call(document.querySelectorAll(".code-p"), (item, i) => {
                item.innerText !== "" && arr.push({ name: item.innerText, url: document.querySelectorAll("canvas")[i].toDataURL("image/png") })
            });
            arr.length > 0 && (this.progressDialog = true) && ewm(arr);
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
    .help {
        margin-top: 20px;
        .help_title {
            height: 30px;
            border-bottom: 1px solid #ccc;
            color: #333;
        }
        pre {
            font-family: "微软雅黑";
            margin-top: 20px;
            color: #333;
            font-size: 14px;
        }
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
        width: 150px;
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
        padding: 0 20px;
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