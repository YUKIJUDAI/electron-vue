import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: require('@/view/home').default,
            redirect: "/heisou/video",
            children: [
                {
                    path: "heisou",
                    component: require("@/view/heisou/index").default,
                    children: [
                        {
                            path: "video",
                            component: require("@/view/heisou/video").default,
                            meta: { menuIndex: 0, index: 0 }
                        },
                        {
                            path: "monitor",
                            component: require("@/view/heisou/monitor").default,
                            meta: { menuIndex: 0, index: 1 }
                        }
                    ]
                },
                {
                    path: "heihao",
                    component: require("@/view/heihao/index").default,
                    children: [
                        {
                            path: "search",
                            component: require("@/view/heihao/search").default,
                            meta: { menuIndex: 1, index: 0 }
                        }
                    ]
                }
            ]
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
