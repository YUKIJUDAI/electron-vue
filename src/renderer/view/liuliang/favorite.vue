<template>
    <div class="flow">
        <el-form label-width="80px" label-position="left">
            <el-form-item label="活动类型">
                <ul class="flow-select">
                    <li class="flow-select-btn" :class="{'flow-select-btn-active':type === 9}" @click="changeBtn(9)">
                        <i class="iconfont icon-sousuo"></i>
                        <span>搜索收藏</span>
                    </li>
                    <li class="flow-select-btn" :class="{'flow-select-btn-active':type === 7}" @click="changeBtn(7)">
                        <i class="iconfont icon-dianpu"></i>
                        <span>商品收藏</span>
                    </li>
                </ul>
            </el-form-item>
        </el-form>
        <liuliang-temp-first :type="type" />
    </div>
</template>

<script>
import liuliangTempFirst from "@/components/liuliang/liuliangTempFirst";

export default {
    components: { liuliangTempFirst },
    data() {
        return {
            type: 9
        }
    },
    methods: {
        changeBtn(index) {
            this.type !== index && (this.type = index);
        }
    }
}
</script>