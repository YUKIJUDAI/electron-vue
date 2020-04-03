<template>
    <div class="article-detail">
        <p class="article-detail-title">{{article.title}}</p>
        <p class="article-detail-msg">
            <i class="views"></i>
            <span>{{article.views}} 阅读量</span>
            <!-- <i class="share"></i>
            <span> 分享</span> -->
        </p>
        <div v-html="article.content" class="article-detail-content"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            article: {}
        }
    },
    created() {
        this.getArticle();
    },
    methods: {
        async getArticle() {
            var res = await this.$fetch.post("/ganhuo/getArticle", { article_id: this.$route.params.id });
            0 === res.code && (this.article = res.data);
        }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");
.article-detail {
    margin: 33px 20px;
    .article-detail-title {
        font-size: 16px;
        font-weight: bold;
        color: #333;
        margin-top: 20px;
        margin-bottom: 13px;
    }
    .article-detail-msg {
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
    .article-detail-content {
        margin-top: 40px;
        font-size: 14px;
        line-height: 20px;
    }
}
</style>