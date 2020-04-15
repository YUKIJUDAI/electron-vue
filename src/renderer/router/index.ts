import Vue from "vue";
import Router from "vue-router";
import { getGlobal } from "@/util/electronFun";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: require("@/view/home").default,
            redirect: "/index",
            children: [
                {
                    path: "index",
                    name: "index",
                    component: require("@/view/home/index").default,
                },
                {
                    path: "tongzhi",
                    name: "name",
                    component: require("@/view/tongzhi/index").default,
                    children: [
                        // 公告
                        {
                            path: "announcement",
                            component: require("@/view/tongzhi/announcement").default,
                            meta: { index: 0 },
                        },
                        // 消息
                        {
                            path: "news",
                            component: require("@/view/tongzhi/news").default,
                            meta: { index: 1 },
                        },
                        // 推送
                        {
                            path: "push",
                            component: require("@/view/tongzhi/push").default,
                            meta: { index: 2 },
                        },
                        // 详情
                        {
                            path: "detail/:id",
                            component: require("@/view/tongzhi/detail").default,
                            meta: { index: 0, hasBack: true },
                            beforeEnter(to, from, next) {
                                to.meta.index = from.meta.index;
                                next();
                            },
                        },
                    ],
                },
                {
                    path: "mosou",
                    component: require("@/view/mosou/index").default,
                    redirect: "mosou/limit",
                    children: [
                        // 魔搜卡首屏
                        {
                            path: "limit",
                            component: require("@/view/mosou/limit").default,
                            meta: { index: 0, function_name: "魔搜卡首屏" },
                        },
                    ],
                },
                {
                    path: "batu",
                    component: require("@/view/batu/index").default,
                    redirect: "batu/dataCollection",
                    children: [
                        // 一键扒图
                        {
                            path: "dataCollection",
                            component: require("@/view/batu/dataCollection").default,
                            meta: { index: 0, function_name: "一键扒图/评论/问大家" },
                        },
                    ],
                },
                {
                    path: "heisou",
                    component: require("@/view/heisou/index").default,
                    children: [
                        // 竞品监控
                        {
                            path: "monitor",
                            component: require("@/view/heisou/monitor").default,
                            meta: { index: 0, function_name: "竞品透视" },
                        },
                        // 竞品分析
                        {
                            path: "analysis",
                            component: require("@/view/heisou/analysis").default,
                            meta: { index: 1, function_name: "竞品透视" },
                        },
                    ],
                },
                {
                    path: "heisoubinding",
                    component: require("@/view/heisoubinding/index").default,
                    redirect: "heisoubinding/binding",
                    children: [
                        // 生意参谋绑定
                        {
                            path: "binding",
                            component: require("@/view/heisoubinding/binding").default,
                            meta: { index: 0, function_name: "竞品透视" },
                            beforeEnter(to, from, next) {
                                const tbInfo = getGlobal("tbInfo") as any;
                                if (tbInfo) {
                                    if (tbInfo.hasOwnProperty("runAsShopId") && tbInfo.runAsShopId !== "") {
                                        next("/heisou/monitor");
                                    } else {
                                        next();
                                    }
                                } else {
                                    next();
                                }
                            },
                        },
                    ],
                },
                {
                    path: "heihao",
                    component: require("@/view/heihao/index").default,
                    redirect: "heihao/search",
                    children: [
                        // 黑号查询
                        {
                            path: "search",
                            component: require("@/view/heihao/search").default,
                            meta: { index: 0, function_name: "查黑号" },
                        },
                        // 举报黑号
                        {
                            path: "report",
                            component: require("@/view/heihao/report").default,
                            meta: { index: 1, function_name: "查黑号" },
                        },
                        // 举报记录
                        {
                            path: "reportHistory",
                            component: require("@/view/heihao/reportHistory").default,
                            meta: { index: 2, function_name: "查黑号" },
                        },
                    ],
                },
                {
                    path: "liuliang",
                    component: require("@/view/liuliang/index").default,
                    redirect: "liuliang/flow",
                    children: [
                        // 流量
                        {
                            path: "flow",
                            component: require("@/view/liuliang/flow").default,
                            meta: { index: 0, function_name: "淘宝流量" },
                        },
                        // 收藏
                        {
                            path: "favorite",
                            component: require("@/view/liuliang/favorite").default,
                            meta: { index: 1, function_name: "淘宝流量" },
                        },
                        // 加购
                        {
                            path: "plusPurchase",
                            component: require("@/view/liuliang/plusPurchase").default,
                            meta: { index: 2, function_name: "淘宝流量" },
                        },
                    ],
                },
                {
                    path: "liuliangliebiao",
                    component: require("@/view/liuliangliebiao/index").default,
                    children: [
                        // 流量
                        {
                            path: "flow",
                            component: require("@/view/liuliangliebiao/flow").default,
                            meta: { index: 0, function_name: "淘宝流量" },
                        },
                    ],
                },
                {
                    path: "zhitongche",
                    component: require("@/view/zhitongche/index").default,
                    meta: { index: 0 },
                },
                {
                    path: "budan",
                    component: require("@/view/budan/index").default,
                    children: [
                        // 补单中心
                        {
                            path: "securitySupplement",
                            component: require("@/view/budan/securitySupplement").default,
                            meta: { index: 0 },
                        },
                    ],
                },
                {
                    path: "zhuanhua",
                    component: require("@/view/zhuanhua/index").default,
                    redirect: "/zhuanhua/dataChange",
                    children: [
                        {
                            path: "dataChange",
                            component: require("@/view/zhuanhua/dataChange").default,
                            meta: { index: 0, function_name: "指数转实数" },
                        },
                    ],
                },
                {
                    path: "ganhuo",
                    component: require("@/view/ganhuo/index").default,
                    redirect: "ganhuo/realstuffCenter",
                    children: [
                        // 干货
                        {
                            path: "realstuffCenter",
                            component: require("@/view/ganhuo/realstuffCenter").default,
                            meta: { index: 0, function_name: "干货分享" },
                        },
                        // 视频
                        {
                            path: "videoCenter/:id?",
                            component: require("@/view/ganhuo/videoCenter").default,
                            meta: { index: 1, function_name: "干货分享" },
                        },
                        // 文章
                        {
                            path: "articleCenter/:id?",
                            component: require("@/view/ganhuo/articleCenter").default,
                            meta: { index: 2, function_name: "干货分享" },
                        },
                        // 文章详情
                        {
                            path: "articleDetail/:id",
                            component: require("@/view/ganhuo/articleDetail").default,
                            meta: { index: 2, function_name: "干货分享", hasBack: true },
                        },
                        // 导师中心
                        {
                            path: "tutorCenter",
                            component: require("@/view/ganhuo/tutorCenter").default,
                            meta: { index: 3, function_name: "干货分享" },
                        },
                    ],
                },
                {
                    path: "geren",
                    component: require("@/view/geren/index").default,
                    children: [
                        // 个人中心
                        {
                            path: "personCenter",
                            component: require("@/view/geren/personCenter").default,
                            meta: { index: 0, function_name: "个人中心" },
                        },
                        // 邀请有奖
                        {
                            path: "Invitation",
                            component: require("@/view/geren/invitation").default,
                            meta: { index: 1, function_name: "个人中心" },
                        },
                        // 积分明细
                        {
                            path: "goldCoinDetails",
                            component: require("@/view/geren/goldCoinDetails").default,
                            meta: { index: 2, function_name: "个人中心" },
                        },
                        // 账户设置
                        {
                            path: "accountSettings",
                            component: require("@/view/geren/accountSettings").default,
                            meta: { index: 3, function_name: "个人中心" },
                        },
                        // vip充值
                        {
                            path: "vip",
                            component: require("@/view/geren/vip").default,
                            meta: { index: 4, function_name: "个人中心" },
                        },
                    ],
                },
            ],
        },
        {
            path: "*",
            redirect: "/",
        },
    ],
});
