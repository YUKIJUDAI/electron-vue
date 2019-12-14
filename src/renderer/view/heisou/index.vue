<template>
    <div class="heishou-index">
        <div class="heishou-index-navigation">
            <ul class="heishou-index-navigation-ul">
                <router-link tag="li" to="/heisou/video" :class="{active:$route.meta.index === 0}">
                    <div>视频教程</div>
                </router-link>
                <router-link tag="li" to="/heisou/monitor" :class="{active:$route.meta.index === 1}">
                    <div>竞品监控</div>
                </router-link>
                <li :class="{active:$route.meta.index === 2}">
                    <div>竞品分析</div>
                </li>
                <li :class="{active:$route.meta.index === 3}">
                    <div>竞品对比</div>
                </li>
                <li :class="{active:$route.meta.index === 4}">
                    <div>市场排行</div>
                </li>
            </ul>
            <div class="heishou-index-navigation-right">
                <ul>
                    <li><i class="icon-heishou-index-1"></i>示例</li>
                    <li><i class="icon-heishou-index-2"></i>充值</li>
                </ul>
            </div>
        </div>
        <router-view class="heisou-main"></router-view>
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
.heishou-index {
    padding-top: 15px;
    min-height: calc(~"87vh - 15px");
    .heishou-index-navigation {
        margin: 0 20px;
        border-bottom: 1px solid #d5d5d5;
        height: 43px;
        .heishou-index-navigation-ul {
            .fl;
            li {
                .fl;
                padding-top: 12px;
                padding-bottom: 10px;
                width: 105px;
                .tc;
                cursor: pointer;
                div {
                    font-size: 16px;
                    border-right: 1px solid #d5d5d5;
                }
            }
            .active {
                border-bottom: 3px solid #ff6801;
                div {
                    color: #ff6801;
                }
            }
        }
        .heishou-index-navigation-right {
            .fr;
            li {
                .fl;
                font-size: 16px;
                color: rgba(255, 104, 1, 1);
                margin-right: 20px;
                margin-top: 12px;
                cursor: pointer;
            }
            .icon-heishou-index-1 {
                .wh(18px);
                .dib;
                vertical-align: -2px;
                margin-right: 5px;
                background: url("~@/assets/icon/icon-heishou-index-1.png")
                    no-repeat;
            }
            .icon-heishou-index-2 {
                .wh(18px);
                .dib;
                vertical-align: -2px;
                margin-right: 5px;
                background: url("~@/assets/icon/icon-heishou-index-2.png")
                    no-repeat;
            }
        }
    }
    .heisou-main {
        padding-bottom: 20px;
    }
}
</style>