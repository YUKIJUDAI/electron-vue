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
                            meta: { index: 0 }
                        },
                        {
                            path: "monitor",
                            component: require("@/view/heisou/monitor").default,
                            meta: { index: 1 }
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
