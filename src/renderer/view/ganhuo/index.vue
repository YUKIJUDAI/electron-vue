<template>
    <div class="main-container">
        <div class="main-container-navigation">
            <ul class="main-container-navigation-ul">
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