<template>
    <div class="main">
        <heisou-title ref="heisouTitle"></heisou-title>
        <div class="body">
            <div class="banner">
                <el-carousel :interval="6000">
                    <el-carousel-item v-for="(item,i) in banner" :key="i">
                        <img :src="item.pic" class="banner-img">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="recommend">
                <ul>
                    <li v-for="(item,i) in recommend" :key="i">
                        <div class="recommend-title">
                            <img :src="item.icon">
                            <p>{{item.function_name}}</p>
                            <i class="recomment-video-1" @click="playVideo(item.video_url)"></i>
                        </div>
                        <p class="recommend-con">{{item.function_desc}}</p>
                        <div class="recommend-foot">
                            <i class="recomment-video-2" @click="playVideo(item.video_url)"></i>
                            <span>视频教程</span>
                            <el-button type="primary" class="recommend-open" @click="open(item.route)">打开</el-button>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="video">
                <ul>
                    <li v-for="(item,i) in video" :key="i">
                        <img :src="item.cover_url" @click="playVideo(item.url)">
                        <p class="video-title">{{item.video_desc}}</p>
                        <span class="video-playback">播放量 {{item.views}}</span>
                    </li>
                </ul>
            </div>
            <div class="article">
                <div class="article-list" v-for="(value,index) in articles" :key="index">
                    <div class="article-title">
                        {{value.title}}
                        <router-link tag="span" :to="'/ganhuo/articleCenter/' + value.class_id" class="more">查看更多></router-link>
                    </div>
                    <ul>
                        <li v-for="(item,i) in value.items" :key="i">
                            <router-link tag="p" class="p-1" :to="'/ganhuo/articleDetail/' + item.id">{{item.title}}</router-link>
                            <p class="p-2">阅读量 {{item.views}}</p>
                        </li>
                    </ul>
                </div>
            </div>
            <el-dialog :visible.sync="detialPlay" class="realstuff-dialog">
                <iframe :src="videoUrl" frameborder="0" allowfullscreen="true" width="100%" height="100%"></iframe>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import heisouTitle from "@/components/others/title";
import { isEmpty } from "@/util/util";

export default {
    components: { heisouTitle },
    data() {
        return {
            banner: [],
            recommend: [],
            video: [],
            articles: [],
            detialPlay: false,
            videoUrl: ""
        }
    },
    computed: {
        notLogining() {
            return isEmpty(this.$store.state.userInfo.token);
        }
    },
    created() {
        this.getBanner();
        this.getRecFunctions();
        this.getVideo();
        this.getArticles();
    },
    methods: {
        // 打开
        open(url) {
            if (this.notLogining) {
                this.$refs.heisouTitle.goLogin();
            } else {
                this.$router.push(url);
            }
        },
        // 轮播图
        getBanner() {
            this.$http.post("/index/getBanner", { server_name: "bsearch.lethink.net" }).then(res => {
                0 === res.code && (this.banner = res.data);
            });
        },
        // 推荐列表
        getRecFunctions() {
            this.$http.post("/index/getRecFunctions").then(res => {
                0 === res.code && (this.recommend = res.data);
            });
        },
        // 视频
        getVideo() {
            this.$http.post("/index/getIndexVideos").then(res => {
                0 === res.code && (this.video = res.data);
            });
        },
        // 文章
        getArticles() {
            this.$http.post("/index/getIndexArticles").then(res => {
                0 === res.code && (this.articles = res.data);
            });
        },
        // 视频播放
        playVideo(url) {
            this.detialPlay = true;
            this.videoUrl = url;
        }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");
.body {
    margin-top: 60px;
    padding: 27px 32px;
    .banner-img {
        width: 100%;
        height: auto;
    }
    .recommend {
        margin-top: 35px;
        ul {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
        li {
            margin-bottom: 20px;
            width: 230px;
            box-shadow: 0px 4px 11px 1px rgba(42, 42, 42, 0.15);
        }
        .recommend-title {
            .rel;
            background-color: red;
            img {
                .db;
                width: 100%;
                height: auto;
                min-height: 142px;
            }
            p {
                .abs;
                top: 13px;
                left: 12px;
                font-size: 20px;
                color: #fff;
                font-weight: bold;
            }
            .recomment-video-1 {
                background: url("~@/assets/icon/recomment-video-1.png");
                .abs;
                left: 12px;
                bottom: 10px;
                .wh(20px);
                cursor: pointer;
            }
        }
        .recommend-con {
            padding: 25px 16px;
            font-size: 13px;
            color: #666;
            line-height: 18px;
        }
        .recommend-foot {
            padding: 0 14px 15px 14px;
            .recomment-video-2 {
                .dib;
                background: url("~@/assets/icon/recomment-video-2.png");
                .wh(16px);
                cursor: pointer;
                vertical-align: -3px;
            }
            span {
                font-size: 12px;
                color: #666;
            }
            .recommend-open {
                .fr;
                width: 60px;
                height: 26px;
                line-height: 1px;
                background: rgba(255, 104, 1, 1);
                border-radius: 2px;
                font-size: 14px;
            }
        }
    }
    .video {
        margin-top: 30px;
        ul {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
        li {
            width: 190px;
            img {
                width: 100%;
                height: auto;
                min-height: 106px;
                cursor: pointer;
            }
            .video-title {
                font-size: 14px;
                line-height: 20px;
                color: #333;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .video-playback {
                font-size: 12px;
                color: #999;
                line-height: 20px;
            }
        }
    }
    .article {
        margin: 50px 0;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .article-list {
            flex: 0.48;
            .article-title {
                font-size: 20px;
                padding-bottom: 13px;
                font-weight: bold;
                color: #666;
                border-bottom: 1px solid #ddd;
                span {
                    font-size: 12px;
                    font-weight: normal;
                    .fr;
                    padding-top: 10px;
                    cursor: pointer;
                }
            }
        }
        li {
            padding-top: 18px;
            height: 14px;
        }
        .p-1 {
            .fl;
            width: 80%;
            font-size: 14px;
            color: #333;
            white-space: nowrap;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            overflow: hidden;
            cursor: pointer;
        }
        .p-2 {
            .fr;
            font-size: 12px;
            color: #999;
        }
    }
}
</style>