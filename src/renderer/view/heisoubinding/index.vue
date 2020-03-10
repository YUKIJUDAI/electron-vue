<template>
    <div class="heishoubinding-index">
        <div class="heishoubinding-index-navigation">
            <ul class="heishoubinding-index-navigation-ul">
                <router-link tag="li" to="/heisoubinding/binding" :class="{active:$route.meta.index === 0}">
                    <div>生参账号</div>
                </router-link>
            </ul>
        </div>
        <router-view class="heisou-main"></router-view>
    </div>
</template>

<script>

export default {
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");
.heishoubinding-index {
    padding-top: 15px;
    min-height: calc(~"87vh - 15px");
    .heishoubinding-index-navigation {
        margin: 0 20px;
        border-bottom: 1px solid #d5d5d5;
        height: 45px;
        .heishoubinding-index-navigation-ul {
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
    }
    .heisou-main {
        padding-bottom: 20px;
    }
}
</style>