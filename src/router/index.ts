// Created by Sean L. on Aug. 9.
// Last Updated by Sean L. on Aug. 9.
// 
// TeaCharlie-User-Web
// src/router/index.ts
// 
// Makabaka1880, 2025. All rights reserved.

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import { isAuthenticated } from '@/auth';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'home',
		component: DashboardView,
		meta: { requiresAuth: true },
	},
	{
		path: '/login',
		name: 'login',
		component: LoginView,
		meta: { requiresAuth: false },
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach(async (to, from, next) => {
	const authenticated = await isAuthenticated();
	if (to.meta.requiresAuth && !authenticated) {
		next({ name: "login" });
	} else if (authenticated && to.name === 'login') {
		next({ name: "home" });
	} else {
		next();
	}
})

export default router;