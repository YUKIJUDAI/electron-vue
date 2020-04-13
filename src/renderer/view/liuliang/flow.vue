<template>
    <div class="flow">
        <el-form label-width="80px" label-position="left">
            <el-form-item label="活动类型">
                <ul class="flow-select">
                    <li class="flow-select-btn" :class="{'flow-select-btn-active':type === 0}" @click="changeBtn(0)">
                        <i class="iconfont icon-shouji"></i>
                        <span>APP流量</span>
                    </li>
                    <li class="flow-select-btn" :class="{'flow-select-btn-active':type === 1}" @click="changeBtn(1)">
                        <i class="iconfont icon-qiantai"></i>
                        <span>PC流量</span>
                    </li>
                    <li class="flow-select-btn" :class="{'flow-select-btn-active':type === 2}" @click="changeBtn(2)">
                        <i class="iconfont icon-lianjie"></i>
                        <span>直访流量</span>
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
            type: 0
        }
    },
    methods: {
        changeBtn(index) {
            this.type !== index && (this.type = index);
        }
    }
}
</script>