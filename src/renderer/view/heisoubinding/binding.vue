<template>
    <div class="binding">
        <ul class="binding-list">
            <li class="binding-list-li" v-for="(item,i) in list" :key="i">
                <img src="~@/assets/icon/binding-del.png" class="del" @click="del(item.id)">
                <img src="~@/assets/icon/binding-shop.png" class="shop">
                <p class="shop-name">{{item.tb_account}}</p>
                <div class="start" @click="opensycm(item.tb_account,item.tb_password)">启动</div>
            </li>
            <li class="binding-list-add" @click="opensycm">
                <img src="~@/assets/icon/binding-add.png" class="add">
                <p class="bind">绑定生参账号</p>
            </li>
        </ul>
        <el-dialog title="请绑定生意参谋" :visible.sync="bindingFlag" width="450px" class="bingding-flag">
            <p>一键分析本店以及竞品</p>
            <p>流量/词根/转化率/金额/客单等真实数据</p>
            <p>深度透视需购买 市场洞察标准版</p>
            <el-button type="primary" @click="opensycm" class="bingding-btn">立即绑定</el-button>
        </el-dialog>
        <div class="swiper-container bg" id="swiper" v-show="bindingFlag">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,i) in picList">
                    <img :src="item.pic" style="width:100%;height:100%">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const { ipcRenderer } = require("electron");
import axios from "axios";
import Swiper from 'swiper';

export default {
    data() {
        return {
            list: [],
            bindingFlag: false,
            swiper: "",
            picList: []
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        getList() {
            var a = this.$fetch.post("/user/getRelateTbList");
            var b = this.$fetch.post("/index/getFunctionPic");

            axios.all([a,b]).then(res => {
                if (0 === res[0].code && 0 === res[1].code) {
                    this.list = res[0].data;
                    this.picList = res[1].data;

                    if (res[0].data.length === 0) {
                        this.bindingFlag = true;
                        this.$nextTick(() => {
                            this.swiper = new Swiper("#swiper", {
                                autoplay: {
                                    delay: 4000
                                }
                            });
                        })
                    }
                }
            })
        },
        del(id) {
            this.$confirm('是否删除该账号?', '确认删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$fetch.post("/user/deleteRelate", { id }).then(res => {
                    if (0 === res.code) {
                        this.getList();
                        this.$message.success('删除成功!');
                    }
                })
            }).catch(() => {
                this.$message('已取消删除');
            });
        },
        // 打开生意参谋
        opensycm(account, pwd) {
            ipcRenderer.send("open-sycm", account, pwd);
        }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");
.binding {
    margin: 0 15px;
    margin-top: 20px;
    .bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }
    ul {
        display: flex;
        flex-wrap: wrap;
    }
    .binding-list-li {
        &:hover {
            border: 1px solid rgba(255, 202, 103, 1);
            .del {
                .db;
            }
            .start {
                background: rgba(255, 166, 0, 1);
                color: #fff;
            }
        }
    }
    .binding-list-add {
        border: 1px dashed rgba(215, 215, 215, 1);
    }
    li {
        .rel;
        margin-top: 15px;
        margin-right: 40px;
        width: 208px;
        height: 247px;
        border: 1px solid rgba(215, 215, 215, 1);
        .tc;
        .del {
            .abs;
            .dn;
            top: 0;
            right: 0;
            cursor: pointer;
        }
        .add {
            margin-top: 90px;
            cursor: pointer;
        }
        .bind {
            margin-top: 23px;
            font-size: 16px;
            color: #666;
        }
        .shop {
            margin-top: 34px;
        }
        .shop-name {
            margin-top: 20px;
        }
        .account-name {
            margin-top: 7px;
        }
        .start {
            width: 120px;
            .l-h(34px);
            border: 1px solid rgba(255, 166, 0, 1);
            margin: 0 auto;
            font-size: 14px;
            color: #ffa600;
            margin-top: 30px;
            cursor: pointer;
        }
    }
    .bingding-flag {
        p {
            font-size: 16px;
            color: #999;
            line-height: 30px;
        }
        .bingding-btn {
            margin-top: 20px;
            margin-left: 300px;
        }
    }
}
</style>