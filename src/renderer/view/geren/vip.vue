<template>
    <div class="vip">
        <table class="tg" style="undefined;table-layout: fixed; width: 1010px">
            <colgroup>
                <col style="width: 130px">
                <col style="width: 130px">
                <col style="width: 340px">
                <col style="width: 150px">
                <col style="width: 150px">
            </colgroup>
            <thead>
                <tr>
                    <th class="tg-dycb" colspan="3">工具箱VIP权益</th>
                    <th class="tg-b6nh">
                        <div class="hy">
                            <img src="~@/assets/img/tj.png" alt="">
                            <p>会员</p>
                            <span @click="dialogVisible = true">开通会员</span>
                        </div>
                    </th>
                    <th class="tg-yq3l">游客</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="tg-yk2c" rowspan="4">竞品透视工具</td>
                    <td class="tg-xzex">关键词透视</td>
                    <td class="tg-xzex">行业/竞品 蓝海词/词根/补单词分析</td>
                    <td class="tg-azfi" rowspan="4"><i class="el-icon-check"></i></td>
                    <td class="tg-tawq" rowspan="4"><i class="el-icon-check"></i></td>
                </tr>
                <tr>
                    <td class="tg-dsfu">流量透视</td>
                    <td class="tg-dsfu">行业/竞品 流量构成分析</td>
                </tr>
                <tr>
                    <td class="tg-glja">补单计划表</td>
                    <td class="tg-glja">黑搜计划表：UV产值/收藏加购率/转化/单量/关键词</td>
                </tr>
                <tr>
                    <td class="tg-dsfu">实时监控</td>
                    <td class="tg-dsfu">监控10+竞品数据 超车必备</td>
                </tr>
                <tr>
                    <td class="tg-yk2c" rowspan="4">黑科技工具</td>
                    <td class="tg-xzex">指数转实数</td>
                    <td class="tg-xzex">转译生意参谋指数变真实数据</td>
                    <td class="tg-azfi" rowspan="4"><i class="el-icon-close"></i></td>
                    <td class="tg-d9dk" rowspan="4">每天体验三次</td>
                </tr>
                <tr>
                    <td class="tg-dsfu">魔搜首屏</td>
                    <td class="tg-dsfu">低权重/无展现关键词手淘搜索置顶</td>
                </tr>
                <tr>
                    <td class="tg-glja">超级打标</td>
                    <td class="tg-glja">给指定旺旺强行扭转兴趣点/猜你喜欢</td>
                </tr>
                <tr>
                    <td class="tg-dsfu">查标签/权重</td>
                    <td class="tg-dsfu">查询旺旺号对应的标签信息以及对应类目的权重分</td>
                </tr>
                <tr>
                    <td class="tg-yk2c" rowspan="4">前台工具</td>
                    <td class="tg-xzex">查黑号</td>
                    <td class="tg-xzex">查询旺旺号是否：黑号/诈骗/打假/跑单等行为</td>
                    <td class="tg-azfi" rowspan="4"><i class="el-icon-check"></i></td>
                    <td class="tg-bsi4" rowspan="4">每天体验三次</td>
                </tr>
                <tr>
                    <td class="tg-dsfu">一键扒图</td>
                    <td class="tg-dsfu">一键下载竞品优质主图/详情页等</td>
                </tr>
                <tr>
                    <td class="tg-xzex">评价/问大家下载</td>
                    <td class="tg-xzex">一键下载竞品评价文案、视频、问大家内容</td>
                </tr>
                <tr>
                    <td class="tg-dsfu">订单预警</td>
                    <td class="tg-dsfu">预警淘客订单/实时查询订单安全性/质量/诈骗等</td>
                </tr>
                <tr>
                    <td class="tg-yk2c" rowspan="6">执行工具</td>
                    <td class="tg-glja">补流量</td>
                    <td class="tg-glja">真实淘宝、拼多多、抖音等人工搜索/收藏/加购，快速拉升热度</td>
                    <td class="tg-azfi"><i class="el-icon-check"></i></td>
                    <td class="tg-tawq"><i class="el-icon-close"></i></td>
                </tr>
                <tr>
                    <td class="tg-dsfu">洋淘买家秀</td>
                    <td class="tg-dsfu">高质量红人达人图片/小视频/洋淘发布</td>
                    <td class="tg-azfi"><i class="el-icon-check"></i></td>
                    <td class="tg-tawq"><i class="el-icon-check"></i></td>
                </tr>
                <tr>
                    <td class="tg-xzex">直播达人</td>
                    <td class="tg-xzex">2000+主播/直播间选择 可代播 可投放</td>
                    <td class="tg-azfi"><i class="el-icon-check"></i></td>
                    <td class="tg-tawq"><i class="el-icon-check"></i></td>
                </tr>
                <tr>
                    <td class="tg-dsfu">小视频达人</td>
                    <td class="tg-dsfu">000+抖音、快手等一线平台视频投放/橱窗投放</td>
                    <td class="tg-azfi"><i class="el-icon-check"></i></td>
                    <td class="tg-tawq"><i class="el-icon-check"></i></td>
                </tr>
                <tr>
                    <td class="tg-xzex">直通车诊断托管</td>
                    <td class="tg-xzex">金牌车手1对1手动诊断/免费托管试用，效果付费</td>
                    <td class="tg-azfi"><i class="el-icon-check"></i></td>
                    <td class="tg-tawq"><i class="el-icon-check"></i></td>
                </tr>
                <tr>
                    <td class="tg-wek7">试用补单 </td>
                    <td class="tg-wek7">可选标签/叠词进店/智能派单/多天操作/安全无降权</td>
                    <td class="tg-azfi"><i class="el-icon-check"></i></td>
                    <td class="tg-tawq"><i class="el-icon-check"></i></td>
                </tr>
            </tbody>
        </table>
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
            list: [{}, {}, {}]
        }
    },
    created() {
        this.memberRecharge();
    },
    methods: {
        async memberRecharge() {
            var res = await this.$fetch.post("/price/memberRecharge");
            0 === res.code && (this.list = res.data);
        }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");

.vip {
    padding-top: 25px !important;
    .el-icon-check {
        font-size: 20px;
        color: #ff6801;
    }
    .el-icon-close {
        font-size: 20px;
        color: red;
    }
    .tg {
        border-collapse: collapse;
        border-spacing: 0;
    }
    .tg td {
        border-color: black;
        border-style: solid;
        border-width: 1px;
        font-family: "微软雅黑";
        font-size: 14px;
        overflow: hidden;
        padding: 10px 5px;
        word-break: normal;
    }
    .tg th {
        border-color: black;
        border-style: solid;
        border-width: 1px;
        font-family: "微软雅黑";
        font-size: 14px;
        font-weight: normal;
        overflow: hidden;
        padding: 10px 5px;
        word-break: normal;
    }
    .tg .tg-bsi4 {
        background-color: #f2f2f2;
        border-color: #e2e2e2;
        font-size: 14px;
        text-align: center;
        vertical-align: middle;
    }
    .tg .tg-yq3l {
        background-color: #c5c2c6;
        border-color: #e2e2e2;
        color: #666666;
        font-size: 20px;
        text-align: center;
        display: block;
        width: 156px;
        margin-top: -125px;
        height: 53px;
        padding-top: 20px;
        border-radius: 25px 25px 0 0;
        margin-left: 168px;
    }
    .tg .tg-dycb {
        border-color: #e2e2e2;
        color: #91694d;
        font-size: 24px;
        text-align: center;
        vertical-align: top;
    }
    .tg .tg-yk2c {
        background-color: #fafafa;
        border-color: #e2e2e2;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        vertical-align: middle;
        writing-mode: vertical-lr;
    }
    .tg .tg-d9dk {
        background-color: #f2f2f2;
        border-color: #e2e2e2;
        text-align: center;
        vertical-align: middle;
    }
    .tg .tg-b6nh {
        background-color: #da1422;
        border-color: #e2e2e2;
        color: #ffffff;
        font-size: 20px;
        text-align: center;
        display: block;
        margin-top: -20px;
        padding-bottom: 50px;
        border-radius: 25px 25px 0 0;
        .hy {
            position: relative;
            img {
                position: absolute;
                top: -20px;
                left: 10px;
            }
            p {
                margin-top: 10px;
            }
            span {
                cursor: pointer;
                border-radius: 10px;
                background: #000;
                font-size: 13px;
                padding: 2px 8px;
            }
        }
    }
    .tg .tg-xzex {
        background-color: #fafafa;
        border-color: #e2e2e2;
        color: #666666;
        text-align: left;
        vertical-align: top;
    }
    .tg .tg-azfi {
        background-color: #ffffff;
        border-color: #e2e2e2;
        text-align: center;
        vertical-align: middle;
    }
    .tg .tg-tawq {
        background-color: #f2f2f2;
        border-color: #e2e2e2;
        text-align: center;
        vertical-align: middle;
    }
    .tg .tg-dsfu {
        background-color: #ffffff;
        border-color: #e2e2e2;
        color: #666666;
        text-align: left;
        vertical-align: top;
    }
    .tg .tg-glja {
        background-color: #fafafa;
        border-color: #e2e2e2;
        color: #ff6801;
        text-align: left;
        vertical-align: top;
    }
    .tg .tg-wek7 {
        background-color: #ffffff;
        border-color: #e2e2e2;
        color: #ff6801;
        text-align: left;
        vertical-align: top;
    }
}
</style>