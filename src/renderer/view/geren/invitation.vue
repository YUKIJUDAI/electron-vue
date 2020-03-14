<template>
    <div class="invitation">
        <img src="~@/assets/img/invitation.jpg" class="img">
        <div class="info">
            <ul class="clearfix">
                <li>
                    <img src="~@/assets/icon/p-1.png" class="p">
                    <p class="p-5">累计邀请人数</p>
                    <p class="p-6">45<span>人</span></p>
                </li>
                <li>
                    <img src="~@/assets/icon/m-1.png" class="m">
                    <p class="p-5">累计获得奖励 (积分)</p>
                    <p class="p-6">45<span>个</span></p>
                </li>
                <li class="no-border">
                    <img src="~@/assets/icon/v-1.png" class="v">
                    <p class="p-5">累计获得VIP天数</p>
                    <p class="p-6">45<span>天</span></p>
                </li>
                <li class="no-border last-li">
                    <el-button size="small" type="primary" class="invite">立即邀请</el-button>
                </li>
            </ul>
        </div>
        <div class="invitation-table">
            <el-table border style="width: 100%">
                <el-table-column prop="" label="注册时间" align="center">
                </el-table-column>
                <el-table-column prop="" label="好友昵称" align="center">
                </el-table-column>
                <el-table-column prop="" label="发布任务" align="center">
                </el-table-column>
                <el-table-column prop="" label="奖励积分" align="center">
                </el-table-column>
                <el-table-column prop="" label="奖励VIP天数" align="center">
                </el-table-column>
                <el-table-column prop="" label="奖励状态" align="center">
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination background layout="prev, pager, next" :page-count="total_pages" :current-page.sync="page" @current-change="getList">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            total_pages: 1,
            page: 1
        }
    },
    methods: {
        getList() { }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");

.invitation {
    padding: 0 20px;
    .img {
        width: 100%;
        height: auto;
        margin-top: 12px;
    }
    .info {
        margin-top: 30px;
        border: 1px solid #fe9f12;
        overflow: hidden;
        ul {
            margin: 27px 0;
        }
        li {
            .fl;
            width: 22%;
            padding: 0 3%;
            border-right: 1px solid #ffcc80;
            .p-5 {
                font-size: 14px;
                color: #666;
            }
            .p-6 {
                font-size: 24px;
                color: #ff6801;
                margin-top: 10px;
                span {
                    font-size: 14px;
                    color: #666;
                }
            }
        }
        .no-border {
            border: 0;
        }
        .last-li {
            width: 5%;
            padding: 0;
        }
        .p,
        .m,
        .v {
            .fl;
            margin-right: 20px;
            margin-top: 10px;
        }
        .invite {
            margin-top: 15px;
            width: 110px;
            height: 34px;
            font-size:16px;
        }
    }
    .invitation-table {
        margin-top: 20px;
    }
    .pagination {
        overflow: hidden;
        padding-top: 20px;
        text-align: center;
    }
}
</style>