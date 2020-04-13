<template>
    <div class="main-container">
        <div class="main-container-navigation clearfix">
            <ul class="main-container-navigation-ul">
                <router-link tag="li" to="/liuliangliebiao/flow" :class="{active:$route.meta.index === 0}">
                    <div>任务日志</div>
                </router-link>
            </ul>
            <div class="main-container-navigation-right">
                <router-link tag="p" to="/liuliang/flow">发布任务</router-link>
            </div>
        </div>
        <router-view class="main-container-view"></router-view>
    </div>
</template>

<script>
export default {}
</script>