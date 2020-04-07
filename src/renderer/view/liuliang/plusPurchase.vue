<template>
    <div class="flow">
        <div class="flow-form">
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

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");
.flow-form {
    margin-top: 15px;
    padding: 0 20px;
    overflow: hidden;
    .flow-select-btn {
        .fl;
        cursor: pointer;
        width: 120px;
        .l-h(34px);
        margin-right: 16px;
        color: #666;
        background: rgba(241, 245, 248, 1);
        border: 1px solid rgba(210, 210, 210, 1);
        span {
            margin-left: 5px;
            font-size: 14px;
        }
    }
    .icon-sousuo,
    .icon-gouwuche {
        color: #666;
        margin-left: 15px;
    }
    .icon-gouwuche {
        font-size: 18px;
        vertical-align: -2px;
    }
    .icon-sousuo {
        font-size: 18px;
        vertical-align: -2px;
    }
    .flow-select-btn-active {
        background: rgba(255, 104, 1, 1);
        color: #fff;
        i {
            color: #fff;
        }
    }
}
</style>