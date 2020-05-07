<template>
    <div class="main-container home">
        <div class="swiper-container banner" id="swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,i) in banner" :key="i">
                    <img :src="item.pic" class="banner-img">
                </div>
            </div>
        </div>
        <div class="recommend">
            <p class="title">推荐工具</p>
            <ul>
                <li v-for="(item,i) in recommend" :key="i" v-if="item.is_recommend === 1">
                    <div class="recommend-top clearfix">
                        <img :src="item.icon">
                        <div class="recommend-msg">
                            <p class="recommend-title">{{item.function_name}}</p>
                            <p class="recommend-desc">{{item.function_desc}}</p>
                        </div>
                    </div>
                    <div class="recommend-foot">
                        <i class="recomment-person"></i>
                        <span>{{item.people}}</span>
                        <i class="recomment-video-2" @click="playVideo(item.video_url)"></i>
                        <span>视频教程</span>
                        <div class="recommend-open" v-if="item.is_uphold === 0" @click="open(item.route)">打开</div>
                        <div class="recommend-open recommend-unopen" v-else>维护中</div>
                    </div>
                </li>
            </ul>
        </div>
        <el-dialog :visible.sync="detialPlay" class="realstuff-dialog">
            <iframe :src="videoUrl" frameborder="0" allowfullscreen="true" width="100%" height="100%"></iframe>
        </el-dialog>
    </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
import { isEmpty } from "@/util/util";
import { openUrl } from "@/util/electronFun";

export default {
    data() {
        return {
            banner: [],
            recommend: [],
            detialPlay: false,
            videoUrl: "",
            swiper: ""
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
    },
    methods: {
        // 打开
        open(url) {
            if (this.notLogining) {
                this.$emit("goLogin");
            } else {
                this.$router.push(url);
            }
        },
        // 轮播图
        getBanner() {
            this.$fetch.post("/index/getBanner", { server_name: "bsearch.lethink.net" }).then(res => {
                if (0 === res.code) {
                    this.banner = res.data;
                    this.$nextTick(() => {
                        this.swiper = new Swiper("#swiper", {
                            autoplay: {
                                delay: 6000
                            },
                            on: {
                                click: () => {
                                    var url = this.banner[this.swiper.realIndex].url;
                                    url.includes("http") ? openUrl(url) : this.open(url);
                                }
                            }
                        });
                    })
                }
            });
        },
        // 推荐列表
        getRecFunctions() {
            this.$fetch.post("/index/getRoleFunctions").then(res => {
                if (0 === res.code) {
                    this.recommend = res.data;
                    this.$store.dispatch("set_menu_info", res.data);
                    var o = {};
                    res.data.forEach(item => {
                        o[item.route] = { id: item.id, vip_level: item.vip_level, functions_time: item.functions_time };
                    });
                    this.$store.dispatch("set_authority_info", o);
                }
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
.home {
    padding: 0 20px;
    .banner-img {
        width: 100%;
        height: auto;
    }
    .recommend {
        margin-top: 24px;
        .title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 20px;
        }
        ul {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            margin-left: -20px;
        }
        li {
            margin-bottom: 20px;
            margin-left: 20px;
            width: 226px;
            height: 136px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(255, 195, 154, 1);
            border-radius: 4px;
        }
        .recommend-top {
            padding-top: 24px;
            height: 60px;
            img {
                .fl;
                .wh(40px);
                margin-left: 12px;
            }
            .recommend-msg {
                .fl;
                width: 150px;
                margin-left: 12px;
                .recommend-title {
                    font-size: 14px;
                    font-weight: bold;
                }
                .recommend-desc {
                    font-size: 12px;
                    line-height: 20px;
                    color: #999;
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }
        }
        .recommend-foot {
            padding: 13px 14px;
            .recomment-video-2 {
                .dib;
                background: url("~@/assets/icon/recomment-video-2.png");
                .wh(16px);
                cursor: pointer;
                vertical-align: -3px;
            }
            .recomment-person {
                .dib;
                background: url("~@/assets/icon/person.png");
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
                .tc;
                width: 50px;
                height: 24px;
                line-height: 24px;
                color: #fff;
                background: @color;
                font-size: 12px;
                border-radius: 4px;
                cursor: pointer;
            }
            .recommend-unopen {
                background: #eee;
                color: #333;
            }
        }
    }
}
</style>