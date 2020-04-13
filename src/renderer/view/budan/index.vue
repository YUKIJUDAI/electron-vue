<template>
    <div class="main-container">
        <div class="main-container-navigation">
            <ul class="main-container-navigation-ul">
                <router-link tag="li" to="/budan/securitySupplement" :class="{active:$route.meta.index === 0}">
                    <div>安全补单</div>
                </router-link>
            </ul>
        </div>
        <router-view class="main-container-view"></router-view>
    </div>
</template>

<script>

export default {}
</script>