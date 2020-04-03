<template>
    <div class="message">
        <ul>
            <router-link tag="li" :to="'/tongzhi/detail/' + item.id" v-for="(item,i) in list" :key="i">
                <p class="title">{{item.title}}</p>
                <div class="clearfix li-div">
                    <p class="content" v-html="item.content"></p>
                    <p class="time">{{item.create_time}}</p>
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
    props: ["type"],
    data() {
        return {
            list: [],
            page: 1,
            total_pages: 1,
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        async getList() {
            var res = await this.$fetch.post("/message/getMessageList", { page: this.page, type: this.type });
            0 === res.code && (this.list = res.data.items, this.total_pages = res.data.total_pages);
        }
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