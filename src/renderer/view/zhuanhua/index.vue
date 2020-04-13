<template>
    <div class="zhuanhua-index">
        <div class="zhuanhua-index-navigation">
            <ul class="zhuanhua-index-navigation-ul">
                <router-link tag="li" to="/zhuanhua/dataChange" :class="{active:$route.meta.index === 0}">
                    <div>指数转化</div>
                </router-link>
            </ul>
        </div>
        <router-view class="zhuanhua-main"></router-view>
    </div>
</template>

<script>

export default {}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");
.zhuanhua-index {
    padding-top: 15px;
    min-height: calc(~"87vh - 15px");
    .zhuanhua-index-navigation {
        margin: 0 20px;
        border-bottom: 1px solid #d5d5d5;
        height: 45px;
        .zhuanhua-index-navigation-ul {
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
    .zhuanhua-main {
        padding-bottom: 20px;
    }
}
</style>