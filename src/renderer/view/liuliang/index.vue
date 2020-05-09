<template>
    <div class="main-container">
        <div class="main-container-navigation clearfix">
            <ul class="main-container-navigation-ul">
                <router-link tag="li" to="/liuliang/flow" :class="{active:$route.meta.index === 0}">
                    <div>流量任务</div>
                </router-link>
                <router-link tag="li" to="/liuliang/favorite" :class="{active:$route.meta.index === 1}">
                    <div>收藏任务</div>
                </router-link>
                <router-link tag="li" to="/liuliang/plusPurchase" :class="{active:$route.meta.index === 2}">
                    <div>加购任务</div>
                </router-link>
            </ul>
            <div class="main-container-navigation-right">
                <router-link tag="p" to="/liuliang-liebiao/flow">任务管理</router-link>
            </div>
        </div>
        <router-view class="main-container-view"></router-view>
    </div>
</template>

<script>
export default {}
</script>

<style lang="less">
@import url("~@/assets/less/commom.less");
.flow {
    padding-bottom: 0 !important;
    .flow-select-btn {
        .fl;
        cursor: pointer;
        width: 120px;
        .l-h(34px);
        margin-right: 16px;
        color: #666;
        background: rgba(241, 245, 248, 1);
        border: 1px solid rgba(210, 210, 210, 1);
        span {
            margin-left: 5px;
            font-size: 14px;
        }
    }
    .icon-sousuo,
    .icon-dianpu,
    .icon-gouwuche {
        color: #666;
        margin-left: 15px;
    }
    .icon-shouji,
    .icon-qiantai,
    .icon-lianjie {
        color: #666;
        margin-left: 15px;
    }
    .icon-shouji {
        font-size: 18px;
        vertical-align: -2px;
    }
    .icon-lianjie {
        font-size: 20px;
        vertical-align: -2px;
    }
    .icon-gouwuche {
        font-size: 18px;
        vertical-align: -2px;
    }
    .icon-sousuo {
        font-size: 18px;
        vertical-align: -2px;
    }
    .icon-dianpu {
        font-size: 18px;
        vertical-align: -2px;
    }
    .flow-select-btn-active {
        background: var(--themeColor);
        color: #fff;
        i {
            color: #fff;
        }
    }
}
</style>