import { createRouter, createWebHashHistory } from 'vue-router';
import store from '../store';
// const routes = [];

const routes = [
    {
        name: 'HomePage',
        path: '/',
        component: () => import('@/views/HomeView'),
    },
    {
        name: 'LoginPage',
        path: '/login',
        component: () => import('@/views/LoginView'),
    },
    {
        name: 'RegisterPage',
        path: '/register',
        component: () => import('@/views/RegisterView'),
    },
    {
        name: 'NewBookmarkPage',
        path: '/new',
        component: () => import('@/views/NewBookmarkView'),
    },
    {
        name: 'Favorites',
        path: '/favorites',
        meta: {
            componentName: 'appBookmarkList',
        },
        component: () => import('@/views/AccountView'),
    },
    {
        name: 'Likes',
        path: '/likes',
        meta: {
            componentName: 'appBookmarkList',
        },
        component: () => import('@/views/AccountView'),
    },
    {
        name: 'Settings',
        path: '/settings',
        meta: {
            componentName: 'userSettings',
        },
        component: () => import('@/views/AccountView'),
    },
];

const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

router.beforeEach((to, _, next) => {
    const authRequiredRoutes = ['HomePage'];
    const authNotRequiredRoutes = ['LoginPage', 'RegisterPage'];
    const _isAuthenticated = store.getters._isAuthenticated;

    if (authNotRequiredRoutes.indexOf(to.name) > -1 && _isAuthenticated) next(false);

    if (authRequiredRoutes.indexOf(to.name) > -1) {
        if (_isAuthenticated) next();
        else next({ name: 'LoginPage' });
    } else {
        next();
    }
});

export default router;
