<template>
    <div class="heihao-search">
        <div class="search">
            <el-form :inline="true" :model="searchData" label-width="80px" label-position="left">
                <el-form-item label="用户旺旺">
                    <el-input v-model="searchData.title" size="small" style="width:495px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">立即查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="info">
            <div class="info-con">
                <div class="info-title">
                    <p class="info-title-p1">用户常规信息<span>（免费查询）</span></p>
                    <p class="info-title-p2">查询时间</p>
                </div>
                <ul class="info-ul">
                    <li>
                        <p>旺旺：<span></span></p>
                    </li>
                    <li>
                        <p>是否实名：<span></span></p>
                    </li>
                    <li>
                        <p>周单均数：<span></span></p>
                    </li>
                    <li>
                        <p>单数：<span></span></p>
                    </li>
                    <li>
                        <p>性别：<span></span></p>
                    </li>
                    <li>
                        <p>买家信誉：<span></span></p>
                    </li>
                    <li>
                        <p>月单均值：<span></span></p>
                    </li>
                    <li>
                        <p>中差评价：<span></span></p>
                    </li>
                    <li>
                        <p>地区：<span></span></p>
                    </li>
                    <li>
                        <p>会员等级：<span></span></p>
                    </li>
                    <li>
                        <p>注册时间：<span></span></p>
                    </li>
                    <li>
                        <p>好评数：<span></span></p>
                    </li>
                    <li>
                        <p>淘龄：<span></span></p>
                    </li>
                    <li>
                        <p>超级会员：<span></span></p>
                    </li>
                    <li>
                        <p>最后登录：<span></span></p>
                    </li>
                    <li>
                        <p>好评率：<span></span></p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="msg">
            <div class="msg-title">
                <p class="msg-title-p1">用户打标情况<span>（深度付费查询）</span></p>
                <p class="msg-title-p2">【这个是黑号，我有证据，我要举报】</p>
            </div>
            <el-table :data="tableData" border style="width: 100%" :header-cell-style="{'text-align':'center','background':'#FF6801','border-color':'#FF6801','color':'#fff'}">
                <el-table-column prop="" label="跑单">
                </el-table-column>
                <el-table-column prop="" label="敲诈">
                </el-table-column>
                <el-table-column prop="" label="骗子">
                </el-table-column>
                <el-table-column prop="" label="打假">
                </el-table-column>
                <el-table-column prop="" label="差评">
                </el-table-column>
                <el-table-column prop="" label="P图">
                </el-table-column>
                <el-table-column prop="" label="降权">
                </el-table-column>
            </el-table>
            <p class="msg-result">此账号不是黑号，此次查询不消耗次数和VIP日查询次数</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchData: {},
            tableData: []
        }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");

.heihao-search {
    padding: 0 20px;
    .search {
        .tl;
        font-size: 0;
        padding-top: 40px;
    }
    .info {
        margin-top: 25px;
        background: rgba(255, 248, 243, 1);
        border-radius: 20px;
        .info-con {
            padding: 34px;
        }
        .info-title {
            font-size: 0;
            height: 30px;
        }
        .info-title-p1 {
            .l-h(30px);
            .fl;
            font-size: 16px;
            font-weight: bold;
            color: #333;
            span {
                font-weight: normal;
                color: #999;
            }
        }
        .info-title-p2 {
            .fl;
            margin-left: 45px;
            .l-h(30px);
            font-size: 14px;
            color: #666;
        }
        .info-ul {
            font-size: 14px;
            height: 170px;
            padding-top: 36px;
            li {
                .fl;
                padding-bottom: 25px;
                width: 25%;
            }
            p {
                font-size: 14px;
                color: #666;
                span {
                    color: #333;
                    font-weight: bold;
                }
            }
        }
    }
    .msg {
        margin-top: 25px;
        .msg-title {
            font-size: 0;
            height: 30px;
            margin-bottom: 28px;
        }
        .msg-title-p1 {
            .l-h(30px);
            .fl;
            font-size: 16px;
            font-weight: bold;
            color: #333;
            span {
                font-weight: normal;
                color: #999;
            }
        }
        .msg-title-p2 {
            .fl;
            margin-left: 45px;
            .l-h(30px);
            font-size: 14px;
            font-weight: bold;
            color: #ff6801;
            text-decoration: underline;
        }
        .msg-result {
            margin-top: 18px;
            padding-bottom: 30px;
            font-size: 14px;
            color: #666;
        }
    }
}
</style>