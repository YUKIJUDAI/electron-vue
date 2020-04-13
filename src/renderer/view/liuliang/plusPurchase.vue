<template>
    <div class="flow">
        <el-form label-width="80px" label-position="left">
            <el-form-item label="活动类型">
                <ul class="flow-select">
                    <li class="flow-select-btn" :class="{'flow-select-btn-active':type === 11}" @click="changeBtn(11)">
                        <i class="iconfont icon-sousuo"></i>
                        <span>搜索加购</span>
                    </li>
                    <li class="flow-select-btn" :class="{'flow-select-btn-active':type === 10}" @click="changeBtn(10)">
                        <i class="iconfont icon-gouwuche"></i>
                        <span>直接加购</span>
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
            type: 11
        }
    },
    methods: {
        changeBtn(index) {
            this.type !== index && (this.type = index);
        }
    }
}
</script>