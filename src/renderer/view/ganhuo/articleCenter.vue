<template>
    <div class="article-center">
        <ul class="article-center-tab">
            <li :class="{active:tabIndex === item.id}" @click="changeTab(item.id)" v-for="(item,i) in tabs" :key="i">{{item.title}}</li>
        </ul>
        <div class="article">
            <ul>
                <li v-for="(item,i) in articles" :key="i">
                    <p class="article-title">{{item.title}}</p>
                    <router-link tag="p" class="article-content" :to="'/ganhuo/articleDetail/' + item.id">{{item.content}}</router-link>
                    <p>
                        <i class="views"></i>
                        <span>{{item.views}} 阅读量</span>
                        <!-- <i class="share"></i>
                        <span> 分享</span> -->
                    </p>
                </li>
            </ul>
        </div>
        <div class="pagination">
            <el-pagination background layout="prev, pager, next" :page-count="total_pages" :current-page.sync="page" @current-change="getArticlesByClass">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tabIndex: "",
            tabs: [],
            articles: [],
            total_pages: 1,
            page: 1,
        }
    },
    mounted() {
        this.getVideosClasses();
        if (this.$route.params.id) {
            this.tabIndex = this.$route.params.id;
            this.getArticlesByClass();
        }
    },
    methods: {
        changeTab(id) {
            this.$router.push("/ganhuo/articleCenter/" + id);
        },
        // 获取文章分类
        getVideosClasses() {
            this.$http.post("/ganhuo/getArticlesClasses").then(res => {
                if (0 === res.code) {
                    this.tabs = res.data;
                    !this.$route.params.id && res.data && res.data.length > 1 && this.$router.push("/ganhuo/articleCenter/" + res.data[0].id);
                }
            })
        },
        // 通过分类id获取文章
        getArticlesByClass() {
            this.$http.post("/ganhuo/getArticlesByClass", { class_id: this.tabIndex }).then(res => {
                if (0 === res.code) {
                    this.articles = res.data.items;
                    this.total_pages = res.data.total_pages;
                }
            })
        },
    },
    watch: {
        "$route.params"(val, oldVal) {
            if (val.id && val.id !== oldVal.id) {
                this.tabIndex = val.id;
                this.total_pages = 1;
                this.page = 1;
                this.getArticlesByClass();
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");
.article-center {
    margin: 0 20px;
    .article-center-tab {
        padding: 22px 0 14px 0;
        display: flex;
        justify-content: flex-start;
        border-bottom: 1px solid #eee;
        margin-top: 1px;
        li {
            padding: 0 12px;
            cursor: pointer;
            font-size: 14px;
            color: #666;
            .l-h(30px);
            margin-right: 40px;
        }
        .active {
            background: rgba(255, 254, 254, 1);
            border: 1px solid rgba(255, 104, 1, 1);
            border-radius: 15px;
        }
    }
    .article {
        li {
            padding-bottom: 16px;
            border-bottom: 1px solid #eee;
        }
        .article-title {
            font-size: 16px;
            font-weight: bold;
            color: #333;
            margin-top: 20px;
            margin-bottom: 30px;
        }
        .article-content {
            font-size: 14px;
            margin-bottom: 16px;
            cursor: pointer;
            overflow: hidden;
            color: #666;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            padding-right: 50px;
        }
        .views {
            background: url("~@/assets/icon/views.png");
            background-size: cover;
            .dib;
            width: 24px;
            height: 17px;
            vertical-align: -3px;
        }
        span {
            font-size: 14px;
            color: #999;
            padding-right: 30px;
        }
        .share {
            background: url("~@/assets/icon/share.png");
            background-size: cover;
            .dib;
            width: 20px;
            height: 20px;
            vertical-align: -4px;
            cursor: pointer;
        }
    }
    .pagination {
        overflow: hidden;
        padding-top: 20px;
        text-align: center;
    }
}
</style>