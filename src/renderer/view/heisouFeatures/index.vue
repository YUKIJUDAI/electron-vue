<template>
    <div class="heishou-index">
        <div class="heishou-index-navigation">
            <ul class="heishou-index-navigation-ul">
                <router-link tag="li" to="/heisou-features/monitor" :class="{active:$route.meta.index === 0}">
                    <div>竞品监控</div>
                </router-link>
                <router-link tag="li" to="/heisou-features/analysis" :class="{active:$route.meta.index === 1}">
                    <div>竞品分析</div>
                </router-link>
            </ul>
        </div>
        <router-view class="heisou-main"></router-view>
    </div>
</template>

<script>

export default {

}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");
.heishou-index {
    .heishou-index-navigation {
        margin: 0 20px;
        border-bottom: 1px solid #d5d5d5;
        height: 45px;
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
                border-bottom: 3px solid @color;
                div {
                    color: @color;
                }
            }
        }
    }
    .heisou-main {
        padding-bottom: 20px;
    }
}
</style>