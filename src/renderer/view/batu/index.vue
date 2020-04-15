<template>
    <div class="main-container">
        <div class="main-container-navigation">
            <ul class="main-container-navigation-ul">
                <router-link tag="li" to="/batu" :class="{active:$route.meta.index === 0}">
                    <div>数据采集</div>
                </router-link>
            </ul>
        </div>
        <router-view class="main-container-view"></router-view>
    </div>
</template>

<script>

export default {}
</script>