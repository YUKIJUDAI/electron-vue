<template>
    <div class="heihao-index">
        <div class="heihao-index-navigation">
            <ul class="heihao-index-navigation-ul">
                <router-link tag="li" to="/heihao/search" :class="{active:$route.meta.index === 0}">
                    <div>深度黑号查询</div>
                </router-link>
                <router-link tag="li" to="" :class="{active:$route.meta.index === 1}">
                    <div>举报黑号</div>
                </router-link>
            </ul>
        </div>
        <router-view></router-view>
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
.heihao-index {
    padding-top: 20px;
    height: calc(~"100% - 20px");
    .heihao-index-navigation {
        margin: 0 20px;
        border-bottom: 1px solid #d5d5d5;
        height: 43px;
        .heihao-index-navigation-ul {
            .fl;
            li {
                .fl;
                padding-top: 12px;
                padding-bottom: 10px;
                width: 150px;
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
    }
}
</style>