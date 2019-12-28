<template>
    <div class="ganhuo-index">
        <div class="ganhuo-index-navigation">
            <ul class="ganhuo-index-navigation-ul">
                <router-link tag="li" to="/ganhuo/videoCenter" :class="{active:$route.meta.index === 0}">
                    <div>视频中心</div>
                </router-link>
            </ul>
        </div>
        <router-view class="ganhuo-main"></router-view>
    </div>
</template>

<script>

export default {}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");
.ganhuo-index {
    padding-top: 15px;
    min-height: calc(~"87vh - 15px");
    .ganhuo-index-navigation {
        margin: 0 20px;
        border-bottom: 1px solid #d5d5d5;
        height: 45px;
        .ganhuo-index-navigation-ul {
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
    .ganhuo-main {
        padding-bottom: 20px;
    }
}
</style>