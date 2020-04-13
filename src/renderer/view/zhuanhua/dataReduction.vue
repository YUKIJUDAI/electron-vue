<template>
    <div class="dataReduction">
        <div class="body">
            <div class="body-left">
                <p>输入区域</p>
                <div class="body-input">
                    <div class="body-input-padding">
                        <span>流量指数</span><input class="body-inputs" />
                        <span>交易指数</span><input class="body-inputs" />
                        <span>转化指数</span><input class="body-inputs" />
                        <span>客群指数</span><input class="body-inputs" />
                    </div>
                </div>
            </div>
            <div class="body-center">
                <el-button type="primary" class="body-btn"><i class="calculator"></i>计算</el-button>
            </div>
            <div class="body-right">
                <p>计算结果</p>
                <div class="body-input">
                    <div class="body-input-padding">
                        <span>实际访客数</span><input class="body-inputs" />
                        <span>实际交易额</span><input class="body-inputs" />
                        <span>实际转化率</span><input class="body-inputs" />
                        <span>实际买家数</span><input class="body-inputs" />
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
        }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");

.dataReduction {
    margin-top: 15px;
    padding: 0 20px;
    .body {
        margin-top: 140px;
        padding: 0 20px;
        display: flex;
        .body-input {
            width: 412px;
            height: 296px;
            border: 2px solid #42bbdf;
            margin-top: -10px;
        }
        .body-input-padding {
            padding: 50px 40px;
            span {
                font-size: 14px;
                color: #333;
                .l-h(32px);
                padding-right: 20px;
            }
        }
        .body-inputs {
            width: 210px;
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
                color: #42bbdf;
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
            padding: 0 28px;
            .body-btn {
                width: 96px;
            }
            .calculator {
                .dib;
                width: 16px;
                height: 18px;
                background: url("~@/assets/icon/calculator.png") no-repeat
                    center center;
                padding-right: 5px;
                vertical-align: -4px;
            }
        }
    }
}
</style>