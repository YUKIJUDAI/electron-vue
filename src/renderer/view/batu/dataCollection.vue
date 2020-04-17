<template>
    <div class="dataCollection">
        <el-dialog title="查看评论和买家秀" :visible.sync="commentDialog" width="90%">
            <div class="comment-btn">
                <span style="margin-right:10px">选择下载区间</span>
                <el-select v-model="comments_download_index" style="margin-right:60px">
                    <el-option v-for="(item,i) in comments_download" :key="i" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <el-button type="primary" size="small" @click="downloadComments('1')">下载评论</el-button>
                <el-button type="primary" size="small" @click="downloadComments('2')">下载图片</el-button>
                <el-button type="primary" size="small" @click="downloadComments('3')">下载评论加图片</el-button>
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
        <el-dialog title="数据下载" :visible.sync="progressDialog" width="400px" height="200px">
            <p class="progress">数据下载中请稍后。。。</p>
            <el-progress :text-inside="true" :stroke-width="26" :percentage="percentage"></el-progress>
        </el-dialog>
        <div class="search-form">
            <el-input size="small" style="width:450px" placeholder="输入目标商品的链接" v-model="collectForm.url"></el-input>
            <el-select size="small" v-model="collectForm.platform">
                <el-option value="1" label="淘宝"></el-option>
                <el-option value="2" label="天猫"></el-option>
            </el-select>
            <el-button type="primary" style="margin-left:20px" @click="collectAll">开始采集</el-button>
        </div>
        <div class="data-form">
            <el-table border :data="data">
                <el-table-column label="商品信息" width="320px" align="center">
                    <template slot-scope="scope">
                        <div class="goods-info">
                            <div class="goods-info-left">
                                <img :src="scope.row.goodsImage" alt="">
                            </div>
                            <div class="goods-info-right">
                                <p class="p1">{{scope.row.goodsTitle | strOver}}<span @click="copy(scope.row.goodsTitle)">复制标题</span></p>
                                <p class="p2"><span @click="copy(scope.row.goodsUrl)">复制宝贝链接</span></p>
                                <p class="p3">{{["","淘宝","天猫"][+scope.row.goodsPlatform]}} ID：{{scope.row.goodsId}}</p>
                                <p class="p4">{{scope.row.shopName}}</p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="commentsTotal" label="总评数" align="center"></el-table-column>
                <el-table-column prop="commentsGood" label="好评" align="center"></el-table-column>
                <el-table-column prop="commentsNormal" label="中评" align="center"></el-table-column>
                <el-table-column prop="commentsBad" label="差评" align="center"></el-table-column>
                <el-table-column prop="allPicture" label="图片" align="center"></el-table-column>
                <el-table-column prop="allVideo" label="视频" align="center"></el-table-column>
                <el-table-column label="视频+主图" align="center" width="100px">
                    <template slot-scope="scope">
                        <span @click="collectGoodsImage(scope.row.goodsUrl)">下载</span>
                    </template>
                </el-table-column>
                <el-table-column label="评论+买家秀" align="center" width="100px">
                    <template slot-scope="scope">
                        <span @click="getCommentsList(scope.row.goodsId)">查看</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="问大家" align="center">
                    <template slot-scope="scope">
                        <span @click="buyersShowDialog = true">查看</span>
                    </template>
                </el-table-column> -->
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <span slot="reference" @click="del(scope.row.goodsId)">删除</span>
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
import copy from "clipboard-copy";
import qs from "qs";
import { Loading } from 'element-ui';

import { download, downloadSchedule, downloadSuccess } from "@/util/electronFun";
import { baseUrl } from "@/config/config";

export default {
    filters: {
        strOver(val) {
            return val ? val.substring(0, 11) + "..." : "";
        }
    },
    data() {
        return {
            goodsId: "",
            collectForm: { platform: "1" },
            buyersShowDialog: false,
            data: [],
            page: 1,
            total_pages: 1,
            // 进度条
            progressDialog: false,
            percentage: 0,

            // 评论
            comments_list: [],
            commentDialog: false,
            comments_total_pages: 1,
            comments_pages: 1,
            comments_download_index: 1,
            limit: 1000,
            comments_download: []
        }
    },
    created() {
        // 启动下载进度条
        downloadSchedule(this);
        downloadSuccess(this);

        this.getList();
    },
    methods: {
        // 复制
        copy(url) {
            copy(url);
            this.$message("复制成功");
        },
        // 获取列表
        async getList() {
            var res = await this.$fetch.post("/collect/collectList", { currentPageNum: this.page, pageSize: 10 });
            0 === res.code && (this.data = res.data.data, this.total_pages = res.data.pages);
        },
        // 采集数据
        async collectAll() {
            if (this.collectForm.url.indexOf("http") < 0) {
                this.$message.error("请输入正确的网址");
                return;
            }
            let loadingInstance = Loading.service({ background: 'rgba(0,0,0,.1)', text: "数据量过大，加载较慢，请耐心等待！" });
            var res = await this.$fetch.post("/collect/collectAll", this.collectForm);
            loadingInstance.close();
            0 === res.code && this.getList();
        },
        // 下载主图和视频
        collectGoodsImage(url) {
            this.progressDialog = true;
            this.$fetch.post("/collect/collectGoodsImage", { goodsId: qs.parse(url.split("?")[1]).id }).then(res => {
                if (0 === res.code) {
                    download(res.data);
                } else {
                    this.progressDialog = false;
                    this.$message.error("下载失败");
                }
            }).catch(err => {
                this.progressDialog = false;
                this.$message.error("下载失败");
            });
        },
        // 评论下载
        downloadComments(type) {
            this.progressDialog = true;
            this.$fetch.post("/collect/downloadComments", { type, goodsId: this.goodsId, limit: this.limit, page: this.comments_download_index }).then(res => {
                if (0 === res.code) {
                    download(res.data);
                } else {
                    this.progressDialog = false;
                    this.$message.error("下载失败");
                }
            }).catch(err => {
                this.progressDialog = false;
                this.$message.error("下载失败");
            });
        },
        // 删除数据
        del(goodsid) {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$fetch.post("/collect/delCollect", { goodsid }).then(res => {
                    if (0 === res.code) {
                        this.$message.success(res.msg);
                        this.getList();
                    } else {
                        this.$message.error(res.msg);
                    }
                });
            }).catch(() => {
                this.$message('已取消删除');
            });
        },
        // 获取评论列表
        async getCommentsList(goodsId) {
            goodsId && (this.goodsId = goodsId);
            var res = await this.$fetch.post("/collect/allComments", { goodsId: this.goodsId, currentPageNum: this.comments_pages, pageSize: 10 });
            if (0 === res.code) {
                this.comments_list = res.data.commentlist;
                this.comments_total_pages = res.data.pages;
                var index = Math.floor(res.data.total / this.limit);
                var arr = [];
                for (let i = 1; i <= index; i++) {
                    arr.push({ value: i, label: `第${(i - 1) * this.limit + 1}个~第${i * this.limit}个` });
                }
                arr.push({ value: index + 1, label: `第${index * this.limit + 1}个~第${res.data.total}个` });
                this.comments_download = arr;
                this.commentDialog = true;
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
    .progress {
        .tc;
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