/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: implementation of routes and related constrains
*/

import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/store'
import Dashboard from '../views/Dashboard'
import { IS_USER_AUTHENTICATED_GETTER } from '../store/storeconstants'

const routes = [{
    path: '',
    component: Dashboard,
    children: [{
            path: '',
            component: () =>
                import ('../views/Home.vue'),
            meta: { auth: false }
        },
        {
            path: 'login',
            component: () =>
                import ('../views/Login.vue'),
            meta: { auth: false }
        },
        {
            path: 'newaccount',
            component: () =>
                import ('../views/Newaccount.vue'),
            meta: { auth: false }
        },
        {
            path: 'account',
            component: () =>
                import ('../views/Account.vue'),
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: 'users',
            component: () =>
                import ('../views/Users.vue'),
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: 'newdevice',
            component: () =>
                import ('../views/Newdevice.vue'),
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: 'apiaries',
            component: () =>
                import ('../views/Apiaries.vue'),
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: 'newapiary',
            component: () =>
                import ('../views/Newapiary.vue'),
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: 'editapiary',
            component: () =>
                import ('../views/Editapiary.vue'),
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: 'newdevice',
            component: () =>
                import ('../views/Newdevice.vue'),
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: 'interventions',
            component: () =>
                import ('../views/Interventions.vue'),
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: 'newintervention',
            component: () =>
                import ('../views/Newintervention.vue'),
            meta: {
                requiresAuth: true,
            }
        },
    ]
}]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.getters[`auth/${IS_USER_AUTHENTICATED_GETTER}`]) {
        next({
            path: 'login',
            query: {
                redirectTo: to.path
            }
        })
    } else {
        next()
    }
})

export default router