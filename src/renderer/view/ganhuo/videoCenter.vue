<template>
    <div class="video-center">
        <ul class="video-center-tab">
            <li :class="{active:tabIndex === item.id}" @click="changeTab(item.id)" v-for="(item,i) in tabs" :key="i">{{item.title}}</li>
        </ul>
        <div class="video">
            <ul>
                <li v-for="(item,i) in video" :key="i">
                    <img :src="item.cover_url" @click="playVideo(item.url)">
                    <p class="video-title">{{item.video_desc}}</p>
                    <span class="video-playback">播放量 {{item.views}}</span>
                </li>
            </ul>
        </div>
        <div class="pagination">
            <el-pagination background layout="prev, pager, next" :page-count="total_pages" :current-page.sync="page" @current-change="getVideosByClass">
            </el-pagination>
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
            tabIndex: "",
            tabs: [],
            video: [],
            total_pages: 1,
            page: 1,
            detialPlay: false,
            videoUrl: ""
        }
    },
    created() {
        this.getVideosClasses();
        if (this.$route.params.id) {
            this.tabIndex = this.$route.params.id;
            this.getVideosByClass();
        }
    },
    methods: {
        changeTab(id) {
            this.$router.push("/ganhuo/videoCenter/" + id);
        },
        // 获取视频分类
        async getVideosClasses() {
            var res = await this.$fetch.post("/ganhuo/getVideosClasses");
            if (0 === res.code) {
                this.tabs = res.data;
                !this.$route.params.id && res.data && res.data.length > 1 && this.$router.push("/ganhuo/videoCenter/" + res.data[0].id);
            }
        },
        // 通过分类id获取视频
        async getVideosByClass() {
            var res = await this.$fetch.post("/ganhuo/getVideosByClass", { class_id: this.tabIndex, page: this.page });
            if (0 === res.code) {
                this.video = res.data.items;
                this.total_pages = res.data.total_pages;
            }
        },
        // 视频播放
        playVideo(url) {
            this.detialPlay = true;
            this.videoUrl = url;
        }
    },
    watch: {
        "$route.params"(val, oldVal) {
            if (val.id && val.id !== oldVal.id) {
                this.tabIndex = val.id;
                this.total_pages = 1;
                this.page = 1;
                this.getVideosByClass();
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");
.video-center {
    .video-center-tab {
        padding: 0 0 14px 0;
        display: flex;
        justify-content: flex-start;
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
    .video {
        ul {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            flex-flow: wrap;
            margin-left: -16px;
        }
        li {
            margin: 20px 16px 0;
            width: 190px;
            img {
                width: 100%;
                height: auto;
                min-height: 106px;
                cursor: pointer;
                border-radius: 4px;
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
    .pagination {
        overflow: hidden;
        padding-top: 20px;
        text-align: center;
    }
}
</style>