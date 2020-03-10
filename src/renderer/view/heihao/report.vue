<template>
    <div class="heihao-report">
        <div class="heihao-form">
            <el-form :model="formData" label-width="120px">
                <el-form-item label="举报奖励：">
                    <span style="color:#ff6801">5点数</span>
                </el-form-item>
                <el-form-item label="违规旺旺：">
                    <el-input v-model="formData.wangwang" placeholder="输入要举报的旺旺号" style="width:380px"></el-input>
                </el-form-item>
                <el-form-item label="违规微信：">
                    <el-input v-model="formData.weixin" placeholder="没有可不填" style="width:380px"></el-input>
                </el-form-item>
                <el-form-item label="违规QQ：">
                    <el-input v-model="formData.qq" placeholder="没有可不填" style="width:380px"></el-input>
                </el-form-item>
                <el-form-item label="违规截图：">
                    <p class="up-prompt">请至少上传1张截图，证据不足举报可能会被驳回</p>
                    <el-upload action="" list-type="picture-card" class="up-upload" :http-request="upload" action="upInfo.host" :show-file-list="false">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="举报类型：">
                    <el-checkbox-group v-model="formData.content" :max="3">
                        <el-checkbox label="pd">跑单</el-checkbox>
                        <el-checkbox label="qz">敲诈</el-checkbox>
                        <el-checkbox label="pz">骗子</el-checkbox>
                        <el-checkbox label="dj">打假</el-checkbox>
                        <el-checkbox label="cp">差评</el-checkbox>
                        <el-checkbox label="tk">淘客</el-checkbox>
                        <el-checkbox label="pt">P图</el-checkbox>
                    </el-checkbox-group>
                    <span>（最多选三个）</span>
                </el-form-item>
                <el-form-item label="受害经历：">
                    <el-input v-model="formData.experience" placeholder="描述被坑的经历，让黑号无处可藏" type="textarea" :rows="4" maxlength="200" show-word-limit style="width:700px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="submit" @click="submit">提交举报</el-button>
                    <p class="warn">注：请提交真实有效的证据截图，我们将于3天内审核完成，举报成功可获得点数奖励！若恶意举报可能会被禁止打标</p>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { rand } from "@/util/util";

export default {
    data() {
        return {
            formData: { images: "123456", content: [] },
            token: ""
        }
    },
    created() {
        this.$fetch.post("/upload/getQiniuToken").then(res => {
            0 === res.code && (this.token = res.data.token);
        });
    },
    methods: {
        // 上传主图
        upload(content) {
            if (content.file.type !== 'image/jpeg' && content.file.type !== 'image/png') {
                this.$message.error('上传图片只能是JPG和PNG格式!');
                return;
            }
            if (content.file.size / 1024 / 1024 > 0.5) {
                this.$message.error('上传头像图片大小不能超过500k!');
                return;
            }
            if (this.formData.images.length >= 3) {
                this.$message.error('最多上传三张图片!');
                return;
            }
            const name = content.file.name;
            let formData = new FormData();
            formData.append('file', content.file);
            formData.append('key', new Date().getTime() + rand());
            formData.append('token', this.upInfo.token);

            this.$axios.post("", formData, { headers: { "Content-Type": "multipart/form-data" } }).then(res => {
                this.formData.images.push({ url: res.key, name });
                this.$message.success("上传成功");
            }).catch(error => {
                this.$message.error("上传失败");
            });
        },
        submit() {
            var { wangwang, weixin, qq, images, content, experience } = this.formData;
            content = content.join(",");
            this.$fetch.post("/heisou/addReport", { wangwang, weixin, qq, images, content, experience }).then(res => {
                0 === res.code ? this.$message.success(res.msg) : this.$message.error(res.msg);
            });
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
    .up-upload {
        margin-top: 10px;
    }
}
</style>