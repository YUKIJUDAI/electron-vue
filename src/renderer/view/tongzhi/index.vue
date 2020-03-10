<template>
    <div class="tongzhi-index">
        <div class="tongzhi-index-navigation clearfix">
            <ul class="tongzhi-index-navigation-ul">
                <!-- <router-link tag="li" to="/tongzhi/flow" :class="{active:$route.meta.index === 0}">
                    <div>流量任务</div>
                </router-link> -->
            </ul>
        </div>
        <router-view class="tongzhi-main">
        </router-view>
    </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");
.tongzhi-index {
    padding-top: 15px;
    min-height: calc(~"87vh - 15px");
    .tongzhi-index-navigation {
        margin: 0 20px;
        border-bottom: 1px solid #d5d5d5;
        height: 45px;
        .tongzhi-index-navigation-ul {
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
    }
}
</style>