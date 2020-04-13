<template>
    <div class="main-container">
        <div class="main-container-navigation">
            <ul class="main-container-navigation-ul">
                <router-link tag="li" to="/heihao/search" :class="{active:$route.meta.index === 0}">
                    <div>深度黑号查询</div>
                </router-link>
                <router-link tag="li" to="/heihao/report" :class="{active:$route.meta.index === 1}">
                    <div>举报黑号</div>
                </router-link>
                <router-link tag="li" to="/heihao/reportHistory" :class="{active:$route.meta.index === 2}">
                    <div>举报记录</div>
                </router-link>
            </ul>
        </div>
        <router-view class="main-container-view"></router-view>
    </div>
</template>

<script>

export default {}
</script>