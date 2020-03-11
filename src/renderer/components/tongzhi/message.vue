<template>
    <div class="message">
        <ul>
            <router-link tag="li" to="/tongzhi/detail">
                <p class="title">有哪些诗句第一眼打动了你？</p>
                <div class="clearfix li-div">
                    <p class="content">文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案</p>
                    <p class="time">2020-01-13</p>
                </div>
            </router-link>
        </ul>
        <div class="pagination">
            <el-pagination background layout="prev, pager, next" :page-count="total_pages" :current-page.sync="page" @current-change="getList">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            page: 1,
            total_pages: 1,
        }
    },
    methods: {
        getList() { }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");

.message {
    ul {
        padding: 20px;
    }
    li {
        border-bottom: 1px solid #eee;
        cursor: pointer;
        .title {
            font-size: 16px;
            color: #333;
            padding-top: 19px;
            padding-bottom: 17px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .li-div {
            overflow: hidden;
            padding-bottom: 11px;
        }
        .content {
            .fl;
            width: 80%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 14px;
            color: #666;
        }
        .time {
            .fr;
            font-size: 14px;
            color: #333;
        }
    }
    .pagination {
        overflow: hidden;
        padding-top: 20px;
        text-align: center;
    }
}
</style>