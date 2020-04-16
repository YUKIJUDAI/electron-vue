<template>
    <div class="dataCollection">
        <el-dialog title="查看评论和买家秀" :visible.sync="commentDialog" width="90%">
            <div class="comment-btn">
                <el-button type="primary" size="small">下载评论</el-button>
                <el-button type="primary" size="small">下载图片</el-button>
                <el-button type="primary" size="small">下载评论加图片</el-button>
            </div>
            <el-table stripe style="width: 100%" :data="comments_list" height="500px">
                <el-table-column label="SKU" align="center" prop="sku"></el-table-column>
                <el-table-column label="旺旺名" align="center" prop="wangwang"></el-table-column>
                <el-table-column label="初次评语" align="center" prop="firstrate"></el-table-column>
                <el-table-column label="初次评语时间" align="center" prop="firstratetime"></el-table-column>
                <el-table-column label="服务评语" align="center" prop="servicerate"></el-table-column>
                <el-table-column label="初次商家回复" align="center" prop="sellerreply"></el-table-column>
                <el-table-column label="追加评语" align="center" prop="appendrate"></el-table-column>
                <el-table-column label="追加评语时间" align="center" prop="appendratetime"></el-table-column>
                <el-table-column label="追加商家回复" align="center" prop="appendsellerreply"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background layout="prev, pager, next" :page-count="comments_total_pages" :current-page.sync="comments_pages" @current-change="getCommentsList">
                </el-pagination>
            </div>
        </el-dialog>
        <el-dialog title="查看问大家" :visible.sync="buyersShowDialog" width="90%" height="500px">
            <div class="comment-type">
                <ul>
                    <li class="active">全部</li>
                    <li>正品</li>
                    <li>多久</li>
                </ul>
            </div>
            <div class="comment-btn">
                <el-button type="primary" size="small">导出数据</el-button>
            </div>
            <el-table stripe style="width: 100%" :data="data">
                <el-table-column label="时间" align="center"></el-table-column>
                <el-table-column label="问题" align="center">
                    <template slot-scope="scope">
                        <div class="show">
                            <img src="" alt="">
                            <div class="show-right">
                                <p>别***年：</p>
                                <p>请问姐妹们是正品嘛</p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="回答" align="center"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background layout="prev, pager, next" :page-count="total_pages" :current-page.sync="page" @current-change="getList">
                </el-pagination>
            </div>
        </el-dialog>
        <div class="search-form">
            <el-input size="small" style="width:450px" placeholder="输入目标商品的链接"></el-input>
            <el-button type="primary" style="margin-left:20px">开始采集</el-button>
        </div>
        <div class="data-form">
            <el-table border :data="data">
                <el-table-column label="商品信息" width="320px" align="center">
                    <template slot-scope="scope">
                        <div class="goods-info">
                            <div class="goods-info-left">
                                <img src="" alt="">
                            </div>
                            <div class="goods-info-right">
                                <p class="p1">亿健旗舰款室内春秋复古...<span>复制标题</span></p>
                                <p class="p2"><span>复制宝贝链接</span></p>
                                <p class="p3">天猫 ID：606517465529</p>
                                <p class="p4">自然宝宝旗舰店</p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="总评数 align=" center""></el-table-column>
                <el-table-column label="好评" align="center"></el-table-column>
                <el-table-column label="中评" align="center"></el-table-column>
                <el-table-column label="差评" align="center"></el-table-column>
                <el-table-column label="图片" align="center"></el-table-column>
                <el-table-column label="视频" align="center"></el-table-column>
                <el-table-column label="问大家" align="center"></el-table-column>
                <el-table-column label="视频+主图" align="center" width="100px">
                    <template slot-scope="scope">
                        <span>下载</span>
                    </template>
                </el-table-column>
                <el-table-column label="评论+买家秀" align="center" width="100px">
                    <template slot-scope="scope">
                        <span @click="getCommentsList">查看</span>
                    </template>
                </el-table-column>
                <el-table-column label="问大家" align="center">
                    <template slot-scope="scope">
                        <span @click="buyersShowDialog = true">查看</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-popconfirm title="确定要删除吗？">
                            <span slot="reference">删除</span>
                        </el-popconfirm>
                    </template>
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
    filters: {
        strOver(val) {
            return val ? "" : val.substring(0, 11);
        }
    },
    data() {
        return {
            buyersShowDialog: false,
            data: [{}],
            page: 1,
            total_pages: 1,

            // 评论
            comments_list: [],
            commentDialog: false,
            comments_total_pages: 1,
            comments_pages: 1,
        }
    },
    created() {
        this.getList();
    },
    methods: {
        getList() { },
        async getCommentsList() {
            var res = await this.$fetch.post("/collect/allComments", { goodsId: 575736011178, currentPageNum: this.comments_pages, pageSize: 10 });
            if (0 === res.code) {
                this.commentDialog = true;
                this.comments_list = res.data.commentlist;
                this.comments_total_pages = res.data.pages;
            } else {
                this.$message.error(res.msg);
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");

.dataCollection {
    .comment-btn {
        margin-bottom: 20px;
    }
    .comment-type {
        ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            .active {
                background: rgba(255, 104, 1, 1);
                color: #fff;
            }
            li {
                .tc;
                width: 54px;
                .l-h(28px);
                background: rgba(255, 220, 204, 1);
                border-radius: 14px;
                font-size: 14px;
                color: #333;
                cursor: pointer;
                margin: 6px;
            }
        }
    }
    .show {
        display: flex;
        img {
            .wh(40px);
        }
        .show-right {
            .tl;
            margin-left: 6px;
            p {
                line-height: 21px;
                &:nth-child(2) {
                    color: #333;
                }
            }
        }
    }
    .search-form {
        margin-top: 15px;
    }
    .data-form {
        margin-top: 20px;
        span {
            color: #399fff;
            cursor: pointer;
        }
    }
    .goods-info {
        display: flex;
        .goods-info-left {
            img {
                .db;
                .wh(74px);
            }
        }
        .goods-info-right {
            margin-left: 8px;
            .tl;
            p {
                line-height: 19px;
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