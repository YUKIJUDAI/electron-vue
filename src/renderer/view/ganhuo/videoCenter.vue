<template>
    <div class="video-center">
        <div class="video-top">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span class="card-title">补单教程</span>
                    <el-button style="float: right; padding: 3px 0" type="text">查看更多></el-button>
                </div>
                <ul>
                    <li>
                        <p class="li-title">如何在30天内追上竞品目标</p>
                        <span class="li-reading">阅读量 9,410 </span>
                        <br />
                        <p class="li-content">近几年微软系统中标志性的磁贴设计似乎无迹可寻，开始菜单来了个...</p>
                    </li>
                    <li>
                        <p class="li-title">如何在30天内追上竞品目标</p>
                        <span class="li-reading">阅读量 9,410 </span>
                        <br />
                        <p class="li-content">近几年微软系统中标志性的磁贴设计似乎无迹可寻，开始菜单来了个...</p>
                    </li>
                    <li>
                        <p class="li-title">如何在30天内追上竞品目标</p>
                        <span class="li-reading">阅读量 9,410 </span>
                        <br />
                        <p class="li-content">近几年微软系统中标志性的磁贴设计似乎无迹可寻，开始菜单来了个...</p>
                    </li>
                </ul>
            </el-card>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span class="card-title">权重提升</span>
                    <el-button style="float: right; padding: 3px 0" type="text">查看更多></el-button>
                </div>
                <ul>
                    <li>
                        <p class="li-title">如何在30天内追上竞品目标</p>
                        <span class="li-reading">阅读量 9,410 </span>
                        <br />
                        <p class="li-content">近几年微软系统中标志性的磁贴设计似乎无迹可寻，开始菜单来了个...</p>
                    </li>
                    <li>
                        <p class="li-title">如何在30天内追上竞品目标</p>
                        <span class="li-reading">阅读量 9,410 </span>
                        <br />
                        <p class="li-content">近几年微软系统中标志性的磁贴设计似乎无迹可寻，开始菜单来了个...</p>
                    </li>
                    <li>
                        <p class="li-title">如何在30天内追上竞品目标</p>
                        <span class="li-reading">阅读量 9,410 </span>
                        <br />
                        <p class="li-content">近几年微软系统中标志性的磁贴设计似乎无迹可寻，开始菜单来了个...</p>
                    </li>
                </ul>
            </el-card>
        </div>
        <div class="tutor">
            <ul class="tutor-ul">
                <li>
                    <p class="p-1">王雪莉</p>
                    <p class="p-2">电商企业的资深运营专业讲师, 独家授课，参与自营店铺平台 运作拥有丰富的行业经验。</p>
                    <span class="span-1">免费咨询</span>
                </li>
                <li>
                    <p class="p-1">王雪莉</p>
                    <p class="p-2">电商企业的资深运营专业讲师, 独家授课，参与自营店铺平台 运作拥有丰富的行业经验。</p>
                    <span class="span-1">免费咨询</span>
                </li>
                <li>
                    <p class="p-1">王雪莉</p>
                    <p class="p-2">电商企业的资深运营专业讲师, 独家授课，参与自营店铺平台 运作拥有丰富的行业经验。</p>
                    <span class="span-1">免费咨询</span>
                </li>
                <li class="tutor-title">
                    <p class="p-3">导师中心</p>
                    <span class="span-2">查看更多></span>
                </li>
            </ul>
        </div>
        <div class="video-list">
            <ul>
                <li class="video-list-title">
                    <p class="p-1">爆款中心</p>
                    <span class="span-1">查看更多></span>
                </li>
                <li>
                    <img>
                    <p class="p-2">2020国家公安部直属单位招录 考试-备考资料领取</p>
                    <span class="span-2">播放量 12,740</span>
                </li>
                <li>
                    <img>
                    <p class="p-2">2020国家公安部直属单位招录 考试-备考资料领取</p>
                    <span class="span-2">播放量 12,740</span>
                </li>
                <li>
                    <img>
                    <p class="p-2">2020国家公安部直属单位招录 考试-备考资料领取</p>
                    <span class="span-2">播放量 12,740</span>
                </li>
                <li>
                    <img>
                    <p class="p-2">2020国家公安部直属单位招录 考试-备考资料领取</p>
                    <span class="span-2">播放量 12,740</span>
                </li>
            </ul>
        </div>
        <el-dialog :visible.sync="detialPlayVideo" class="video-dialog">
            <iframe src="http://open.iqiyi.com/developer/player_js/coopPlayerIndex.html?vid=a03350837334a7b060f105ae9fc0a73b&tvId=10803949100&accessToken=2.f22860a2479ad60d8da7697274de9346&appKey=3955c3425820435e86d0f4cdfe56f5e7&appId=1368&height=100%&width=100%" frameborder="0" allowfullscreen="true" width="100%" height="100%"></iframe>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            detialPlayVideo: false
        }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");

.video-center {
    margin-top: 15px;
    padding: 0 20px;
    .video-top {
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
                border: 1px solid rgba(255, 105, 2, 1);
                color: rgba(255, 105, 2, 1);
                border-radius: 13px;
                .tc;
                font-size: 14px;
                cursor: pointer;
            }
            .span-2 {
                font-size: 14px;
                color: rgba(255, 105, 2, 1);
                cursor: pointer;
            }
        }
    }
    .video-list {
        margin-top: 30px;
        ul {
            display: flex;
        }
        li {
            width: 190px;
            padding-right: 30px;
            img {
                width: 190px;
                height: 105px;
            }
        }
        .video-list-title {
            .tl;
            width: 140px;
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
            color: rgba(255, 105, 2, 1);
        }
        .span-2 {
            font-size: 12px;
            color: #999;
        }
    }
}
</style>
<style lang="less">
.video-dialog {
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