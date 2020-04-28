<template>
    <div class="vip">
        <div class="left">
            <ul>
                <li class="head">功能特权</li>
                <li>精品透视</li>
                <li>黑号/标签查询</li>
                <li>卡首屏/魔搜</li>
                <li>流量</li>
                <li>直通车托管</li>
                <li>试用补单</li>
            </ul>
        </div>
        <div class="center">
            <ul>
                <li class="head head-vip">
                    <img src="~@/assets/img/recommend.png" class="recommend">
                    <p><i class="vip-icon"></i>超级会员</p>
                    <span @click="dialogVisible = true">开通会员</span>
                </li>
                <li>无限使用</li>
                <li>无限使用</li>
                <li>无限使用</li>
                <li>赠送5000积分</li>
                <li>1对1出计划优先</li>
                <li>体验发布</li>
            </ul>
        </div>
        <div class="right">
            <ul>
                <li class="head head-vip head-vip-2">
                    <p><i class="vip-icon2"></i>普通会员</p>
                    <span @click="dialogVisible = true">开通会员</span>
                </li>
                <li>免费日查询宝贝≤3个</li>
                <li>免费日查询账号≤30个</li>
                <li>不限制</li>
                <li>赠送200积分</li>
                <li>免费微调</li>
                <li>体验发布</li>
            </ul>
        </div>
        <div class="right right2">
            <ul>
                <li class="head head-vip head-vip-2">
                    <p>游客</p>
                </li>
                <li>免费日查询宝贝≤3个</li>
                <li>免费日查询账号≤30个</li>
                <li>不限制</li>
                <li>赠送200积分</li>
                <li>免费微调</li>
                <li>体验发布</li>
            </ul>
        </div>
        <vip v-model="dialogVisible" v-if="dialogVisible"></vip>
    </div>
</template>

<script>

import vip from "@/components/others/joinVip";

export default {
    components: { vip },
    data() {
        return {
            dialogVisible: false,
        }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");

.vip {
    padding-top: 25px;
    .left,
    .center,
    .right {
        .fl;
        border: 1px solid rgba(211, 209, 208, 1);
        .tc;
        li {
            .l-h(55px);
            &:nth-child(2n) {
                background: rgba(251, 249, 248, 1);
            }
        }
        .head {
            padding-top: 40px;
            font-size: 20px;
            height: 130px;
        }
        .head-vip {
            .rel;
            height: 132px;
            .recommend {
                .abs;
                top: 0;
                left: 0;
            }
            .vip-icon {
                background: url("~@/assets/icon/vip.png") no-repeat;
                .dib;
                width: 28px;
                height: 26px;
                vertical-align: -5px;
                margin-right: 10px;
            }
            .vip-icon2 {
                background: url("~@/assets/icon/vip2.png") no-repeat;
                .dib;
                width: 28px;
                height: 26px;
                vertical-align: -5px;
                margin-right: 10px;
            }
            p {
                color: #ff0a01;
            }
            span {
                .db;
                background: linear-gradient(
                    180deg,
                    rgba(233, 34, 10, 1),
                    rgba(250, 93, 81, 1)
                );
                border-radius: 18px;
                font-size: 16px;
                color: #fff;
                width: 122px;
                .l-h(33px);
                margin: 0 auto;
                cursor: pointer;
            }
        }
        .head-vip-2 {
            p {
                color: #333;
            }
            span {
                .l-h(34px);
                background: #fff;
                border:1px solid #FF6C00;
                color: #FF6C00;
            }
        }
    }
    .left {
        width: 26%;
    }
    .center {
        width: 28%;
        padding-bottom: 4px;
        border: 1px solid rgba(254, 69, 62, 1);
        margin-top: -2px;
        li {
            &:nth-child(2n) {
                background: rgba(251, 249, 248, 1);
            }
        }
    }
    .right {
        width: 24%;
        border-left: 0;
    }
    .right2 {
        width: 20%;
    }
}
</style>