import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true,
            requiresVisitore: false
        },
    },
    {
        path: '/history',
        name: 'History',
        component: () => import('../views/History.vue'),
        meta: {
            requiresAuth: true,
            requiresVisitore: false
        },
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue'),
        meta: {
            requiresAuth: false,
            requiresVisitore: false
        },
    },
    {
        path: '/result',
        name: 'Result',
        component: () => import('../views/Result.vue'),
        meta: {
            requiresAuth: true,
            requiresVisitore: false
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/auth/Login'),
        meta: {
            requiresAuth: false,
            requiresVisitore: true
        },
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next();
            return;
        }
        next({
            name: "Login",
            query: {redirect: to.fullPath}
        });
    } else if (to.matched.some(record => record.meta.requiresVisitore)) {
        if (!store.getters.isLoggedIn) {
            next();
            return;
        }
        next({name: "Home"});
    } else {
        next();
    }
});
export default router
