<template>
    <div class="realstuff-center">
        <div class="realstuff-top">
            <el-card class="box-card" v-for="(value,index) in articles" :key="index">
                <div slot="header" class="clearfix">
                    <span class="card-title">{{value.title}}</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="$router.push('/ganhuo/articleCenter/' + value.class_id)">查看更多></el-button>
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
        <div class="tutor">
            <ul class="tutor-ul">
                <li v-for="(item,i) in tutor" :key="i">
                    <p class="p-1">{{item.mentor_name}}</p>
                    <p class="p-2">{{item.mentor_desc}}</p>
                    <span class="span-1">免费咨询</span>
                </li>
                <li class="tutor-title">
                    <p class="p-3">导师中心</p>
                    <router-link to="/ganhuo/tutorCenter" tag="span" class="span-2">查看更多></router-link>
                </li>
            </ul>
        </div>
        <div class="realstuff-list">
            <ul v-for="(value,index) in video" :key="index">
                <li class="realstuff-list-title">
                    <p class="p-1">{{value.title}}</p>
                    <router-link tag="span" class="span-1" :to="'/ganhuo/videoCenter/' + value.class_id">查看更多></router-link>
                </li>
                <li v-for="(item,i) in value.items">
                    <img :src="item.cover_url" @click="playVideo(item.url)">
                    <p class="p-2">{{item.title}}</p>
                    <span class="span-2">播放量 {{item.views}}</span>
                </li>
            </ul>
        </div>
        <el-dialog :visible.sync="detialPlay" class="realstuff-dialog">
            <iframe :src="videoUrl" frameborder="0" allowfullscreen="true" width="100%" height="100%"></iframe>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            detialPlay: false,
            videoUrl: "",
            video: [],
            articles: [],
            tutor: []
        }
    },
    created() {
        this.getRecVideos();
        this.getArticles();
        this.getTutor();
    },
    methods: {
        // 视频
        async getRecVideos() {
            var res = await this.$fetch.post("/ganhuo/getRecVideos");
            0 === res.code && (this.video = res.data);
        },
        // 文章
        async getArticles() {
            var res = await this.$fetch.post("/index/getIndexArticles");
            0 === res.code && (this.articles = res.data);
        },
        // 导师
        async getTutor() {
            var res = await this.$fetch.post("/ganhuo/getVideoRecMentor");
            0 === res.code && (this.tutor = res.data && res.data.length > 4 ? res.data.slice(0, 3) : res.data);
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

.realstuff-center {
    .realstuff-top {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .box-card {
            width: 49%;
            margin-bottom: 20px;
        }
        .card-title {
            font-size: 15px;
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
    .tutor {
        padding: 12px 30px;
        border: 1px solid #ccc;
        .tutor-ul {
            display: flex;
            li {
                width: 25%;
                padding-right: 50px;
            }
            .tutor-title {
                margin: 25px 0;
                border-left: 1px solid #ddd;
                .tc;
                padding-right: 0;
            }
            .p-1 {
                font-size: 20px;
                color: #666;
                font-weight: bold;
                line-height: 20px;
            }
            .p-2 {
                font-size: 12px;
                margin-top: 13px;
                margin-bottom: 11px;
                height: 60px;
                color: #666;
                line-height: 20px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
            }
            .p-3 {
                font-size: 20px;
                padding: 15px 0;
                color: #333;
                font-weight: bold;
                line-height: 20px;
            }
            .span-1 {
                padding: 2px 10px;
                .l-h(28px);
                background: rgba(255, 255, 255, 1);
                border: 1px solid var(--themeColor);
                color: var(--themeColor);
                border-radius: 13px;
                .tc;
                font-size: 14px;
                cursor: pointer;
            }
            .span-2 {
                font-size: 14px;
                color: var(--themeColor);
                cursor: pointer;
            }
        }
    }
    .realstuff-list {
        margin-top: 30px;
        ul {
            display: flex;
            margin-bottom: 26px;
        }
        li {
            padding-right: 30px;
            flex: 1;
            img {
                width: 190px;
                height: 105px;
            }
        }
        .realstuff-list-title {
            .tl;
            flex: 0.7;
        }
        .p-1 {
            margin-top: 40px;
            margin-bottom: 20px;
            font-size: 20px;
            color: #666;
            font-weight: bold;
            line-height: 20px;
        }
        .p-2 {
            color: #333;
            font-size: 14px;
            padding: 2px 0;
        }
        .span-1 {
            font-size: 14px;
            color: var(--themeColor);
            cursor: pointer;
        }
        .span-2 {
            font-size: 12px;
            color: #999;
        }
    }
}
</style>
<style lang="less">
.realstuff-dialog {
    .el-dialog__header {
        display: none;
    }
    .el-dialog__body {
        width: 800px;
        height: 500px;
        padding: 0;
    }
}
</style>