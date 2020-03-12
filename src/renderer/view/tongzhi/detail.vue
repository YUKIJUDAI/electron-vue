<template>
    <div class="detail">
        <div class="title">{{data.title}}</div>
        <div class="time">{{data.create_time}}</div>
        <div class="content" v-html="data.content"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: {}
        }
    },
    mounted() {
        this.$fetch.post("/message/getMessageDetail", { id: this.$route.params.id }).then(res => {
            0 === res.code && (this.data = res.data);
        })
    }
}
</script>

<style lang="less" scoped>
.detail {
    padding: 0 20px;
    .title {
        font-size: 16px;
        color: #333;
        margin-top: 40px;
    }
    .time {
        font-size: 14px;
        color: #999;
        margin-top: 17px;
    }
    .content {
        font-size: 14px;
        color: #666;
        margin-top: 45px;
    }
}
</style>