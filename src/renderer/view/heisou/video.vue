<template>
    <div class="heisou-video">
        <div class="part-1">任意竞品 透视分析</div>
        <div class="part-2">
            <div class="list">
                <div class="list-title">竞品配置监控 </div>
                <div class="list-video">
                    <video src=""></video>
                </div>
                <ul class="list-ul">
                    <li class="clearfix">
                        <p><i class="star"></i>支持查看非监控竞品<span>访客数、支付买家数、支付金额 、转化率、UV价值、客单价</span></p>
                    </li>
                    <li class="clearfix">
                        <p><i class="star"></i>支持批量导入宝贝ID查看</p>
                    </li>
                    <li class="clearfix">
                        <p><i class="star"></i>支持初次加入宝贝可以获取近<span>90天</span>数据</p>
                    </li>
                    <li class="clearfix">
                        <p><i class="star"></i>支持分类，多维度条件查询</p>
                    </li>
                    <li class="clearfix">
                        <p><i class="star"></i>支持本地存储，支持导出</p>
                    </li>
                </ul>
            </div>
            <div class="list">
                <div class="list-title">生参监控竞品数据分析</div>
                <div class="list-video">
                    <video src=""></video>
                </div>
                <ul class="list-ul">
                    <li class="clearfix">
                        <p><i class="star"></i>竞品数据源获取(人工模拟拉取数据)</p>
                    </li>
                    <li class="clearfix">
                        <p><i class="star"></i>多维度分析竞品数据，<span>生成黑搜报表</span></p>
                    </li>
                    <li class="clearfix">
                        <p><i class="star"></i>支持我的宝贝数据拉取</p>
                    </li>
                    <li class="clearfix">
                        <p><i class="star"></i>支持<span>流量词、成交词、词根、流量来源等数据分析</span></p>
                    </li>
                    <li class="clearfix">
                        <p><i class="star"></i>可视化竞品数据对比，简单方便</p>
                    </li>
                    <li class="clearfix">
                        <p><i class="star"></i>支持<span>竞品标题、主图、sku、评论等信息监控</span></p>
                    </li>
                </ul>
            </div>
            <div class="list">
                <div class="list-title">市场排行</div>
                <div class="list-video">
                    <video src=""></video>
                </div>
                <ul class="list-ul">
                    <li class="clearfix">
                        <p><i class="star"></i>一键获取类目市场排行数据</p>
                    </li>
                    <li class="clearfix">
                        <p><i class="star"></i>支持关键词筛选</p>
                    </li>
                    <li class="clearfix">
                        <p><i class="star"></i>支持查看市场排行竞品昨日数据</p>
                    </li>
                    <li class="clearfix">
                        <p><i class="star"></i>可以查看近<span>90</span>天数据</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="part-3">
            <div class="part-3-1">更多优质功能登录立即体验</div>
            <p class="part-3-2">本站采用非爬虫技术，在完全不干扰生意参谋行为的情况下，</p>
            <p class="part-3-2">简单高效的帮您转化并整理数据。避免风险的同时做到最大化方便使用。</p>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");

.heisou-video {
    .rel;
    background: url("~@/assets/img/heisou-index-bg.png") no-repeat left bottom;
    height: calc(~"100% - 44px");
    .part-1 {
        font-size: 0.96rem;
        color: #ff6801;
        padding-top: 0.7rem;
        .tc;
    }
    .part-2 {
        display: flex;
        justify-content: space-around;
        margin-top: 0.8rem;
        .list {
            width: 9.32rem;
            height: 12.6rem;
            background: rgba(255, 255, 255, 1);
            box-shadow: -4px 0px 11px 1px rgba(0, 32, 95, 0.15);
        }
        .list-title {
            .tc;
            padding: 0.6rem 0;
            border-bottom: 1px solid #eee;
            font-size: 0.4rem;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
        }
        .list-video {
            padding: 0.6rem;
            video {
                width: 100%;
                height: 100%;
            }
        }
        .list-ul {
            padding: 0 0.6rem;
            li {
                list-style: none;
                margin-bottom: 0.2rem;
            }
            i {
                .fl;
                .db;
                .wh(0.36rem);
                .bg("~@/assets/icon/star.png");
                margin-right: 0.24rem;
                margin-top: 0.1rem;
            }
            p {
                .fl;
                font-size: 0.32rem;
                color: #666;
                line-height: 0.6rem;
            }
            span {
                color: #2062e6;
            }
        }
    }
    .part-3 {
        .tc;
        color:#fff;
        .part-3-1 {
            padding: 0.56rem 0;
            font-size: 0.48rem;
        }
        .part-3-2 {
            font-size: 0.32rem;
            .l-h(0.6rem);
        }
    }
}
</style>