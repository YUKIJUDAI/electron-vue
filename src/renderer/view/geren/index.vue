<template>
    <div class="main-container">
        <div class="main-container-navigation">
            <ul class="main-container-navigation-ul">
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
                    <div>会员充值</div>
                </router-link>
            </ul>
        </div>
        <router-view class="main-container-view"></router-view>
    </div>
</template>

<script>

export default { }
</script>