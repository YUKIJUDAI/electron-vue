<template>
    <div class="heihao-report">
        <div class="heihao-form">
            <el-form :model="formData" label-width="120px">
                <!-- <el-form-item label="举报奖励：">
                    <span style="color:@color">5点数</span>
                </el-form-item> -->
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
                    <img :src="qnUrl + item" class="avatar" v-for="(item,i) in formData.images" @click="formData.images.splice(i, 1)">
                    <el-upload action="" list-type="picture-card" class="up-upload" :http-request="upload" :action="url" :show-file-list="false">
                        <i class="el-icon-plus up-upload-icon"></i>
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
import { qnUrl } from "@/config/config";

export default {
    data() {
        return {
            // 举报提交表单
            formData: { images: [], content: [] },
            // 七牛token
            token: "",
            // 七牛上传url
            url: "",
            // 七牛地址
            qnUrl
        }
    },
    created() {
        this.getQiniuToken();
    },
    methods: {
        // 获取七牛数据
        async getQiniuToken() {
            var res = await this.$fetch.post("/upload/getQiniuToken");
            0 === res.code && ([this.token, this.url] = [res.data.token, res.data.url]);
        },
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
            formData.append('token', this.token);

            this.$fetch.post(this.url, formData, { headers: { "Content-Type": "multipart/form-data" } }).then(res => {
                this.formData.images.push(res.key);
                this.$message.success("上传成功");
            }).catch(error => {
                this.$message.error("上传失败");
            });
        },
        // 提交表单
        async submit() {
            var data = JSON.parse(JSON.stringify(this.formData));
            data.content = data.content.join(",");
            data.images = data.images.join(",");
            var res = await this.$fetch.post("/heisou/addReport", data);
            0 === res.code ? (this.$message.success(res.msg), this.formData = { images: [], content: [] }) : this.$message.error(res.msg);
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
        margin-top: 20px;
        .fl;
    }
    .up-upload .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .up-upload .el-upload:hover {
        border-color: #409eff;
    }
    .up-upload-icon {
        font-size: 28px;
        color: #8c939d;
        width: 148px;
        height: 148px;
        line-height: 148px;
        text-align: center;
    }
    .avatar {
        width: 148px;
        height: 148px;
        cursor: pointer;
        .fl;
        margin-top: 20px;
        margin-right: 20px;
    }
}
</style>