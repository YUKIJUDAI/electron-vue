<template>
    <div class="liuliang-index">
        <div class="liuliang-index-navigation clearfix">
            <ul class="liuliang-index-navigation-ul">
                <router-link tag="li" to="/liuliang/flow" :class="{active:$route.meta.index === 0}">
                    <div>流量任务</div>
                </router-link>
                <router-link tag="li" to="/liuliang/favorite" :class="{active:$route.meta.index === 1}">
                    <div>收藏任务</div>
                </router-link>
                <router-link tag="li" to="/liuliang/plusPurchase" :class="{active:$route.meta.index === 2}">
                    <div>加购任务</div>
                </router-link>
            </ul>
            <div class="liuliang-index-navigation-right">
                <router-link tag="p" to="/liuliangliebiao/flow">任务管理</router-link>
            </div>
        </div>
        <router-view class="liuliang-main">
        </router-view>
    </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");
.liuliang-index {
    padding-top: 15px;
    min-height: calc(~"87vh - 15px");
    .liuliang-index-navigation {
        margin: 0 20px;
        border-bottom: 1px solid #d5d5d5;
        height: 45px;
        .liuliang-index-navigation-ul {
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
        .liuliang-index-navigation-right {
            .fr;
            margin-top: 12px;
            color: #ff6801;
            cursor: pointer;
        }
    }
}
</style>