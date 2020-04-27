import Vue from "vue";
import Router from "vue-router";
import { getGlobal } from "@/util/electronFun";
import store from "@/store";

Vue.use(Router);

var routes = new Router({
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
                            meta: { index: 0, hasAuthority: true },
                        },
                    ],
                },
                {
                    path: "dabiao",
                    component: require("@/view/dabiao/index").default,
                    redirect: "dabiao/speedMarking",
                    children: [
                        // 超级打标
                        {
                            path: "speedMarking",
                            component: require("@/view/dabiao/speedMarking").default,
                            meta: { index: 0, hasAuthority: true },
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
                            meta: { index: 0, hasAuthority: true },
                        },
                    ],
                },
                {
                    path: "heisou-features",
                    component: require("@/view/heisouFeatures/index").default,
                    children: [
                        // 竞品监控
                        {
                            path: "monitor",
                            component: require("@/view/heisouFeatures/monitor").default,
                            meta: { index: 0, hasAuthority: true },
                        },
                        // 竞品分析
                        {
                            path: "analysis",
                            component: require("@/view/heisouFeatures/analysis").default,
                            meta: { index: 1, hasAuthority: true },
                        },
                    ],
                },
                {
                    path: "heisou",
                    component: require("@/view/heisou/index").default,
                    redirect: "heisou/binding",
                    children: [
                        // 生意参谋绑定
                        {
                            path: "binding",
                            component: require("@/view/heisou/binding").default,
                            meta: { index: 0, hasAuthority: true },
                            beforeEnter(to, from, next) {
                                const tbInfo = getGlobal("tbInfo") as any;
                                if (tbInfo) {
                                    if (tbInfo.hasOwnProperty("runAsShopId") && tbInfo.runAsShopId !== "") {
                                        next("/heisou-features/monitor");
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
                            meta: { index: 0, hasAuthority: true },
                        },
                        // 举报黑号
                        {
                            path: "report",
                            component: require("@/view/heihao/report").default,
                            meta: { index: 1, hasAuthority: true },
                        },
                        // 举报记录
                        {
                            path: "reportHistory",
                            component: require("@/view/heihao/reportHistory").default,
                            meta: { index: 2, hasAuthority: true },
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
                            meta: { index: 0, hasAuthority: true },
                        },
                        // 收藏
                        {
                            path: "favorite",
                            component: require("@/view/liuliang/favorite").default,
                            meta: { index: 1, hasAuthority: true },
                        },
                        // 加购
                        {
                            path: "plusPurchase",
                            component: require("@/view/liuliang/plusPurchase").default,
                            meta: { index: 2, hasAuthority: true },
                        },
                    ],
                },
                {
                    path: "liuliang-liebiao",
                    component: require("@/view/liuliangliebiao/index").default,
                    children: [
                        // 流量
                        {
                            path: "flow",
                            component: require("@/view/liuliangliebiao/flow").default,
                            meta: { index: 0, hasAuthority: true },
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
                            meta: { index: 0, hasAuthority: true },
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
                            meta: { index: 0, hasAuthority: true },
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
                            meta: { index: 0 },
                        },
                        // 视频
                        {
                            path: "videoCenter/:id?",
                            component: require("@/view/ganhuo/videoCenter").default,
                            meta: { index: 1 },
                        },
                        // 文章
                        {
                            path: "articleCenter/:id?",
                            component: require("@/view/ganhuo/articleCenter").default,
                            meta: { index: 2 },
                        },
                        // 文章详情
                        {
                            path: "articleDetail/:id",
                            component: require("@/view/ganhuo/articleDetail").default,
                            meta: { index: 2, hasBack: true },
                        },
                        // 导师中心
                        {
                            path: "tutorCenter",
                            component: require("@/view/ganhuo/tutorCenter").default,
                            meta: { index: 3 },
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
                            meta: { index: 0 },
                        },
                        // 邀请有奖
                        {
                            path: "Invitation",
                            component: require("@/view/geren/invitation").default,
                            meta: { index: 1 },
                        },
                        // 积分明细
                        {
                            path: "goldCoinDetails",
                            component: require("@/view/geren/goldCoinDetails").default,
                            meta: { index: 2 },
                        },
                        // 账户设置
                        {
                            path: "accountSettings",
                            component: require("@/view/geren/accountSettings").default,
                            meta: { index: 3 },
                        },
                        // vip充值
                        {
                            path: "vip",
                            component: require("@/view/geren/vip").default,
                            meta: { index: 4 },
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

routes.beforeResolve((to, from, next) => {
    if (to.meta.hasAuthority) {
        to.meta.authorityInfo = store.state.authorityInfo[to.fullPath.split("/")[1].split("-")[0]];
    }
    next();
});

export default routes;
