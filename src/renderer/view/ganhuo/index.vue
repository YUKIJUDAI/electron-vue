<template>
    <div class="ganhuo-index">
        <div class="ganhuo-index-navigation">
            <ul class="ganhuo-index-navigation-ul">
                <router-link tag="li" to="/ganhuo/realstuffCenter" :class="{active:$route.meta.index === 0}">
                    <div>干货中心</div>
                </router-link>
                <router-link tag="li" to="/ganhuo/videoCenter" :class="{active:$route.meta.index === 1}">
                    <div>视频中心</div>
                </router-link>
                <router-link tag="li" to="/ganhuo/articleCenter" :class="{active:$route.meta.index === 2}">
                    <div>好文分享</div>
                </router-link>
                <router-link tag="li" to="/ganhuo/tutorCenter" :class="{active:$route.meta.index === 3}">
                    <div>导师中心</div>
                </router-link>
            </ul>
            <div class="ganhuo-index-navigation-right">
                <p @click="$router.go(-1)" v-if="$route.meta.hasBack">返回</p>
            </div>
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
        .ganhuo-index-navigation-right {
            .back {
                .dib;
                background: url("~@/assets/icon/back.png") no-repeat;
                background-size: cover;
                width: 16px;
                height: 12px;
                vertical-align: -3px;
            }
            .fr;
            margin-top: 12px;
            margin-right: 12px;
            color: #ff6801;
            cursor: pointer;
        }
    }
    .ganhuo-main {
        padding-bottom: 20px;
    }
}
</style>