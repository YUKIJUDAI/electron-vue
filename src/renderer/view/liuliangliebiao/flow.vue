<template>
    <div :is="temp[index]" :id="id" @changeIndex="changeIndex"></div>
</template>

<script>
import liuliangList from "@/components/liuliang/liuliangList";
import detail from "@/components/liuliang/detail";

export default {
    components: { liuliangList, detail },
    data() {
        return {
            temp: [liuliangList, detail],
            index: 0,
            id: ""
        }
    },
    methods: {
        changeIndex(val, id) {
            this.index = val;
            this.id = id;
        }
    }
}
</script>

<style lang="less" scoped>
</style>