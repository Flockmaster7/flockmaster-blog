import {
	createRouter,
	createWebHistory,
	RouterOptions,
	RouteRecordRaw
} from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: () => import('../pages/home/index.vue'),
		children: [
			{
				path: '/login',
				name: 'Login',
				component: () => import('../pages/login/index.vue')
			},
			{
				path: '/my',
				name: 'My',
				component: () => import('../pages/my/index.vue')
			}
		]
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
} as RouterOptions);

export default router;
