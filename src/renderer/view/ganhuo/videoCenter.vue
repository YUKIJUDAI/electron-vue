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
    </div>
</template>

<script>
export default {

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
}
</style>