<template>
    <div class="invitation">
        <img src="~@/assets/img/invitation.jpg" class="img">
        <div class="info">
            <ul class="clearfix">
                <li class="no-border">
                    <img src="~@/assets/icon/p-1.png" class="p">
                    <p class="p-5">累计邀请人数</p>
                    <p class="p-6">{{total_items}}<span>人</span></p>
                </li>
                <li>
                    <img src="~@/assets/icon/m-1.png" class="m">
                    <p class="p-5">累计获得奖励 (积分)</p>
                    <p class="p-6">0<span>个</span></p>
                </li>
                <li class="no-border">
                    <img src="~@/assets/icon/v-1.png" class="v">
                    <p class="p-5">累计获得VIP天数</p>
                    <p class="p-6">0<span>天</span></p>
                </li>
                <li class="no-border last-li">
                    <el-button size="small" type="primary" class="invite">立即邀请</el-button>
                </li>
            </ul>
        </div>
        <div class="invitation-table">
            <el-table border style="width: 100%" :data="list">
                <el-table-column prop="register_time" label="注册时间" align="center">
                </el-table-column>
                <el-table-column prop="b_phone" label="好友昵称" align="center">
                </el-table-column>
                <el-table-column label="发布任务" align="center">
                    <template slot-scope="scope">
                        {{["未发布","已发布"][+scope.row.bonus_status]}}
                    </template>
                </el-table-column>
                <el-table-column prop="bonus" label="奖励积分" align="center">
                </el-table-column>
                <el-table-column prop="vip_days" label="奖励VIP天数" align="center">
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
            list: [],
            total_pages: 1,
            total_items: 0,
            page: 1
        }
    },
    mounted(){
        this.getList();
    },
    methods: {
        getList() {
            this.$fetch.post("/user/getInviteList", { page: this.page }).then(res => {
                0 == res.code && (this.list = res.data.items, this.total_pages = res.data.total_pages, this.total_items = res.data.total_items);
            });
        }
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
            font-size: 16px;
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