<template>
    <div class="heihao-report">
        <div class="heihao-form">
            <el-form :model="formData" label-width="120px">
                <el-form-item label="举报奖励：">
                    <span style="color:#ff6801">5点数</span>
                </el-form-item>
                <el-form-item label="违规旺旺：">
                    <el-input v-model="formData.name" placeholder="输入要举报的旺旺号" style="width:380px"></el-input>
                </el-form-item>
                <el-form-item label="违规微信：">
                    <el-input v-model="formData.name" placeholder="没有可不填" style="width:380px"></el-input>
                </el-form-item>
                <el-form-item label="违规QQ：">
                    <el-input v-model="formData.name" placeholder="没有可不填" style="width:380px"></el-input>
                </el-form-item>
                <el-form-item label="违规截图：">
                    <p class="up-prompt">请至少上传1张截图，证据不足举报可能会被驳回</p>
                    <ul class="upload-ul clearfix">
                        <li v-for="(item,i) in uploadList" :key="i">
                            <div class="upload">
                                <div>
                                    <i></i>
                                    <span>点击上传</span>
                                </div>
                                <div class="upload-img">
                                    <img src="">
                                    <i class="upload-del"></i>
                                </div>
                                <p>{{item.title}}</p>
                                <span>查看案例</span>
                            </div>
                        </li>
                    </ul>
                </el-form-item>
                <el-form-item label="举报类型：">
                    <el-checkbox-group v-model="formData.arr">
                        <el-checkbox label="跑单"></el-checkbox>
                        <el-checkbox label="敲诈"></el-checkbox>
                        <el-checkbox label="骗子"></el-checkbox>
                        <el-checkbox label="打假"></el-checkbox>
                        <el-checkbox label="差评"></el-checkbox>
                        <el-checkbox label="淘客"></el-checkbox>
                        <el-checkbox label="P图"></el-checkbox>
                    </el-checkbox-group>
                    <span>（最多选三个）</span>
                </el-form-item>
                <el-form-item label="受害经历：">
                    <el-input v-model="formData.name" placeholder="描述被坑的经历，让黑号无处可藏" type="textarea" :rows="4" maxlength="200" show-word-limit style="width:700px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="submit">提交举报</el-button>
                    <p class="warn">注：请提交真实有效的证据截图，我们将于3天内审核完成，举报成功可获得点数奖励！若恶意举报可能会被禁止打标</p>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formData: { name: "", arr: [] },
            uploadList: [
                { id: 1, title: "聊天记录" },
                { id: 2, title: "打款页面" },
                { id: 3, title: "被拉黑截图" },
                { id: 4, title: "微信资料页" },
                { id: 5, title: "退款举证" },
                { id: 6, title: "第三方打标" }
            ]
        }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");

.heihao-report {
    padding-top: 20px;
    .heihao-form {
        margin: 0 20px;
        overflow: hidden;
    }
    .submit {
        width: 200px;
        height: 35px;
        margin: 10px 0;
    }
    .warn {
        font-size: 12px;
        color: red;
    }
    .upload-ul {
        li {
            .fl;
            margin-right: 50px;
            width: 80px;
        }
        .upload {
            div {
                .wh(78px);
                cursor: pointer;
                border: 1px solid #dbdbdb;
                i {
                    background: url("~@/assets/icon/add.png") no-repeat center
                        center;
                    .wh(20px);
                    .db;
                    margin: 0 auto;
                    margin-top: 20px;
                }
                span {
                    .db;
                    margin: 0 auto;
                    color: #dbdbdb;
                    .tc;
                }
            }
            .upload-img {
                .rel;
                &:hover {
                    .bg-c(rgba(0, 0, 0, 0.3));
                    i {
                        .db;
                    }
                }
                img {
                    .db;
                    .wh(80px);
                }
                i {
                    .abs;
                    top: 0;
                    left: 24px;
                    background: url("~@/assets/icon/trash.png") no-repeat center
                        center;
                    .wh(32px);
                    .dn;
                    margin: 0 auto;
                    margin-top: 20px;
                }
            }
            p {
                .l-h(20px);
                font-size: 13px;
                .bg-c(#ff6801);
                color: #fff;
                .tc;
            }
            span {
                cursor: pointer;
                .db;
                font-size: 12px;
                color: #999;
                .tc;
            }
        }
    }
}
</style>