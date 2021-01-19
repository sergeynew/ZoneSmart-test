import Vue from 'vue';
import Router from 'vue-router'
import OrdersPage from '@/pages/OrdersPage.vue'
import LoginPage from '@/pages/LoginPage.vue'

Vue.use(Router);

const publicPagesUrls = [
    '/login'
]

export const router = new Router({
    mode: 'history',
    routes: [
        { path: '/orders', component: OrdersPage },
        { path: '/login', component: LoginPage },
        { path: '*', redirect: '/orders' }
    ]
});

router.beforeEach((to, from, next) => {
    // redirect to login page if user not logged in.
    const authRequired = !publicPagesUrls.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    return next();
})
