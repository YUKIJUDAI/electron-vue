<template>
    <div class="main-container">
        <div class="main-container-navigation clearfix">
            <ul class="main-container-navigation-ul">
                <router-link tag="li" to="/tongzhi/announcement" :class="{active:$route.meta.index === 0}">
                    <div>公告</div>
                </router-link>
                <router-link tag="li" to="/tongzhi/news" :class="{active:$route.meta.index === 1}">
                    <div>消息</div>
                </router-link>
                <router-link tag="li" to="/tongzhi/push" :class="{active:$route.meta.index === 2}">
                    <div>推送</div>
                </router-link>
            </ul>
            <div class="main-container-navigation-right">
                <p @click="$router.go(-1)" v-if="$route.meta.hasBack">返回</p>
            </div>
        </div>
        <router-view class="main-container-view"></router-view>
    </div>
</template>

<script>
export default {}
</script>