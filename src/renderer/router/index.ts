import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/main",
            name: "main",
            component: require("@/view/main").default
        },
        {
            path: "/",
            name: "home",
            component: require("@/view/home").default,
            redirect: "/main",
            children: [
                {
                    path: "heisou",
                    component: require("@/view/heisou/index").default,
                    children: [
                        // 竞品监控
                        {
                            path: "monitor",
                            component: require("@/view/heisou/monitor").default,
                            meta: { menuIndex: 0, index: 0 }
                        },
                        // 竞品分析
                        {
                            path: "analysis",
                            component: require("@/view/heisou/analysis").default,
                            meta: { menuIndex: 0, index: 1 }
                        }
                    ]
                },
                {
                    path: "heihao",
                    component: require("@/view/heihao/index").default,
                    children: [
                        // 黑号查询
                        {
                            path: "search",
                            component: require("@/view/heihao/search").default,
                            meta: { menuIndex: 1, index: 0 }
                        },
                        // 举报黑号
                        {
                            path: "report",
                            component: require("@/view/heihao/report").default,
                            meta: { menuIndex: 1, index: 1 }
                        },
                        // 举报记录
                        {
                            path: "reportHistory",
                            component: require("@/view/heihao/reportHistory").default,
                            meta: { menuIndex: 1, index: 2 }
                        }
                    ]
                },
                {
                    path: "liuliang",
                    component: require("@/view/liuliang/index").default,
                    children: [
                        // 流量
                        {
                            path: "flow",
                            component: require("@/view/liuliang/flow").default,
                            meta: { menuIndex: 2, index: 0 }
                        },
                        // 收藏
                        {
                            path: "favorite",
                            component: require("@/view/liuliang/favorite").default,
                            meta: { menuIndex: 2, index: 1 }
                        },
                        // 加购
                        {
                            path: "plusPurchase",
                            component: require("@/view/liuliang/plusPurchase").default,
                            meta: { menuIndex: 2, index: 2 }
                        }
                    ]
                },
                {
                    path: "liuliangliebiao",
                    component: require("@/view/liuliangliebiao/index").default,
                    children: [
                        // 流量
                        {
                            path: "flow",
                            component: require("@/view/liuliangliebiao/flow").default,
                            meta: { menuIndex: 2, index: 0 }
                        },
                        // 收藏
                        {
                            path: "favorite",
                            component: require("@/view/liuliangliebiao/favorite").default,
                            meta: { menuIndex: 2, index: 1 }
                        },
                        // 加购
                        {
                            path: "plusPurchase",
                            component: require("@/view/liuliangliebiao/plusPurchase").default,
                            meta: { menuIndex: 2, index: 2 }
                        }
                    ]
                },
                {
                    path: "zhitongche",
                    component: require("@/view/zhitongche/index").default,
                    meta: { menuIndex: 3, index: 0 }
                },
                {
                    path: "budan",
                    component: require("@/view/budan/index").default,
                    children: [
                        // 补单中心
                        {
                            path: "securitySupplement",
                            component: require("@/view/budan/securitySupplement").default,
                            meta: { menuIndex: 4, index: 0 }
                        }
                    ]
                },
                {
                    path: "ganhuo",
                    component: require("@/view/ganhuo/index").default,
                    children: [
                        // 干货
                        {
                            path: "realstuffCenter",
                            component: require("@/view/ganhuo/realstuffCenter").default,
                            meta: { menuIndex: 5, index: 0 }
                        },
                        // 视频
                        {
                            path: "videoCenter/:id?",
                            component: require("@/view/ganhuo/videoCenter").default,
                            meta: { menuIndex: 5, index: 1 }
                        },
                        // 文章
                        {
                            path: "articleCenter/:id?",
                            component: require("@/view/ganhuo/articleCenter").default,
                            meta: { menuIndex: 5, index: 2 }
                        },
                        // 文章详情
                        {
                            path: "articleDetail/:id",
                            component: require("@/view/ganhuo/articleDetail").default,
                            meta: { menuIndex: 5, index: 2, hasBack: true }
                        },
                        // 导师中心
                        {
                            path: "tutorCenter",
                            component: require("@/view/ganhuo/tutorCenter").default,
                            meta: { menuIndex: 5, index: 3 }
                        }
                    ]
                },
                {
                    path: "geren",
                    component: require("@/view/geren/index").default,
                    children: [
                        // 个人中心
                        {
                            path: "personCenter",
                            component: require("@/view/geren/personCenter").default,
                            meta: { menuIndex: 6, index: 0 }
                        },
                        // 邀请有奖
                        {
                            path: "Invitation",
                            component: require("@/view/geren/invitation").default,
                            meta: { menuIndex: 6, index: 1 }
                        },
                        // 金币明细
                        {
                            path: "goldCoinDetails",
                            component: require("@/view/geren/goldCoinDetails").default,
                            meta: { menuIndex: 6, index: 2 }
                        },
                        // 账户设置
                        {
                            path: "accountSettings",
                            component: require("@/view/geren/accountSettings").default,
                            meta: { menuIndex: 6, index: 3 }
                        }
                    ]
                }
            ]
        },
        {
            path: "*",
            redirect: "/"
        }
    ]
});
