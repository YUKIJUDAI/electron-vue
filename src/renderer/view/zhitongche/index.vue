<template>
    <div class="zhitongche">
        <div class="page-1 clearfix">
            <div class="msg">
                <span class="p-1">核心优势</span>
                <p class="p-2">直通车</p>
                <p class="p-3">专业的直通车关键词评估，针对性投放，<br />精准的展现在搜索买家面前，<br />实现精准营销。</p>
            </div>
            <div class="ad">
                <img src="~@/assets/img/ztc-1.png" class="img-1">
                <p class="p-4"><span>疑难咨询</span></p>
                <p class="p-5">常见疑难问题解答，包括不仅限于<br />PPC ROI 黑科技 等</p>
                <img src="~@/assets/img/ztc-btn.png" class="img-2">
            </div>
            <div class="ad">
                <img src="~@/assets/img/ztc-2.png" class="img-1">
                <p class="p-4"><span>免费诊断</span></p>
                <p class="p-5">3年以上车手点对点免费诊断计划<br />给出实质性解决方案</p>
                <img src="~@/assets/img/ztc-btn.png" class="img-2">
            </div>
            <div class="ad">
                <img src="~@/assets/img/ztc-3.png" class="img-1">
                <p class="p-4"><span>全案制定</span></p>
                <p class="p-5">单独车神团队沟通定制全套推广方案<br />直通车 钻展 超推 拼多多等</p>
                <img src="~@/assets/img/ztc-btn.png" class="img-2">
            </div>
        </div>
        <div class="page-2">
            <div class="swiper-container" id="swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,i) in tutor">
                        <div class="tutor-list clearfix">
                            <div class="tutor-left">
                                <img :src="item.mentor_avatar">
                            </div>
                            <div class="tutor-right">
                                <p class="tutor-name">{{item.mentor_name}}</p>
                                <p class="tutor-text">{{item.mentor_desc}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-3">
            <el-carousel height="120px" direction="vertical" :interval="20000">
                <el-carousel-item v-for="(item,i) in recArticle" :key="i">
                    <router-link tag="div" :to="'/ganhuo/articleDetail/' + item.id" class="page-3-title">
                        {{item.title}}
                        <span>{{item.class}}</span>
                    </router-link>
                    <div class="page-3-txt">
                        {{item.content}}
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="page-4">
            <el-card class="box-card" v-for="(value,index) in articles" :key="index">
                <div slot="header" class="clearfix">
                    <span class="card-title">{{value.title}}</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="$route.push('/ganhuo/articleCenter/' + value.class_id)">查看更多></el-button>
                </div>
                <ul>
                    <li v-for="(item,i) in value.items" :key="i">
                        <router-link tag="p" class="li-title" :to="'/ganhuo/articleDetail/' + item.id">{{item.title}}</router-link>
                        <span class="li-reading">阅读量 {{item.views}}</span>
                        <br />
                        <p class="li-content">{{item.content}}</p>
                    </li>
                </ul>
            </el-card>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';

export default {
    data() {
        return {
            articles: [],
            recArticle: [],
            tutor: []
        }
    },
    mounted() {
        this.getArticles();
        this.getTutor();
        this.getRecArticle();
    },
    methods: {
        // 文章
        getArticles() {
            this.$http.post("/index/getIndexArticles").then(res => {
                0 === res.code && (this.articles = res.data);
            });
        },
        // 导师
        getTutor() {
            this.$http.post("/ganhuo/getVideoRecMentor").then(res => {
                if (0 === res.code) {
                    this.tutor = res.data;
                    this.$nextTick((res => {
                        this.swiper = new Swiper("#swiper", {
                            slidesPerView: 3,
                            spaceBetween: 16,
                            autoplay: {
                                delay: 12000
                            }
                        });
                    }))
                }
            });
        },
        // 推荐文章
        getRecArticle() {
            this.$http.post("/ganhuo/getZtcRecArticle").then(res => {
                0 === res.code && (this.recArticle = res.data);
            });
        },
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");
.zhitongche {
    min-height: calc(~"87vh");
    .page-1 {
        overflow: hidden;
        padding: 23px;
        .msg {
            .fl;
            .p-1 {
                .dib;
                margin-top: 27px;
                padding: 5px 0;
                font-size: 14px;
                color: #333;
                border-bottom: 4px solid #ff6801;
            }
            .p-2 {
                font-size: 24px;
                color: #333;
                padding: 21px 0;
            }
            .p-3 {
                font-size: 12px;
                line-height: 20px;
                color: #333;
            }
        }
        .ad {
            .fl;
            .tc;
            width: 250px;
            height: 220px;
            padding-top: 20px;
            .p-4 {
                font-size: 24px;
                padding: 13px 0;
                span {
                    color: #ff6801;
                }
            }
            .p-5 {
                font-size: 14px;
                color: #666;
                padding-bottom: 21px;
            }
            &:hover {
                box-shadow: 0px 0px 8px 0px rgba(42, 42, 42, 0.12);
                border-radius: 8px;
            }
        }
    }
    .page-2 {
        .bg-c(#f5f5f5);
        padding: 12px 12px;
        .tutor-list {
            background: #fff;
            height: 170px;
            border-radius: 8px;
        }
        .tutor-left {
            .fl;
            img {
                margin-left: 24px;
                margin-top: 14px;
                .dib;
                .wh(50px);
                border-radius: 50%;
            }
        }
        .tutor-right {
            .fl;
            margin-left: 10px;
            width: calc(~"100% - 90px");
            .tutor-name {
                font-size: 15px;
                margin-top: 10px;
                color: #333;
            }
            .tutor-text {
                margin: 14px 0;
                font-size: 14px;
                color: #666;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
            }
        }
    }
    .page-3 {
        .page-3-title {
            padding: 21px 36px;
            font-size: 16px;
            color: #333;
            cursor: pointer;
            span {
                font-size: 12px;
                color: #fff;
                padding: 1px 5px;
                background-color: #ff6500;
            }
        }
        .page-3-txt {
            margin: 0 36px 21px 36px;
            font-size: 14px;
            color: #666;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        border-bottom: 14px solid #f5f5f5;
    }
    .page-4 {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin: 0 25px;
        .el-card {
            box-shadow: none;
            border: 0;
        }
        .box-card {
            width: 49%;
            margin-bottom: 20px;
        }
        .card-title {
            font-size: 20px;
            color: #666;
        }
        li {
            padding-top: 20px;
            &:first-child {
                padding-top: 0;
            }
        }
        .li-title {
            .fl;
            width: 80%;
            font-weight: bold;
            font-size: 15px;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
        }
        .li-reading {
            line-height: 20px;
            font-size: 12px;
            .fr;
            color: #999;
        }
        .li-content {
            padding-top: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 15px;
            color: #666;
        }
    }
}
</style>