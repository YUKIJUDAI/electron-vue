<template>
    <div class="geren-index">
        <div class="geren-index-navigation">
            <ul class="geren-index-navigation-ul">
                <router-link tag="li" to="/geren/personCenter" :class="{active:$route.meta.index === 0}">
                    <div>个人中心</div>
                </router-link>
                <router-link tag="li" to="/geren/invitation" :class="{active:$route.meta.index === 1}">
                    <div>邀请有奖</div>
                </router-link>
                <router-link tag="li" to="/geren/goldCoinDetails" :class="{active:$route.meta.index === 2}">
                    <div>积分明细</div>
                </router-link>
                <router-link tag="li" to="/geren/accountSettings" :class="{active:$route.meta.index === 3}">
                    <div>账户设置</div>
                </router-link>
                <router-link tag="li" to="/geren/vip" :class="{active:$route.meta.index === 4}">
                    <div>VIP充值</div>
                </router-link>
            </ul>
        </div>
        <router-view class="geren-main"></router-view>
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
.geren-index {
    padding-top: 15px;
    min-height: calc(~"87vh - 15px");
    .geren-index-navigation {
        margin: 0 20px;
        border-bottom: 1px solid #d5d5d5;
        height: 45px;
        .geren-index-navigation-ul {
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
    .geren-main {
        padding-bottom: 20px;
    }
}
</style>