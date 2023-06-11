import {
	createRouter,
	createWebHistory,
	RouterOptions,
	RouteRecordRaw
} from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/home'
	},
	{
		path: '/',
		name: 'Layout',
		component: () => import('@/components/layout/index.vue'),
		children: [
			{
				path: '/main',
				name: 'Main',
				component: () => import('@/components/main/index.vue'),
				children: [
					{
						path: '/home',
						name: 'Home',
						component: () => import('@/pages/home/index.vue')
					},
					{
						path: '/show',
						name: 'Show',
						component: () => import('@/pages/show/index.vue')
					},
					{
						path: '/work',
						name: 'Work',
						component: () => import('@/pages/work/index.vue')
					},
					{
						path: '/service',
						name: 'Service',
						component: () => import('@/pages/service/index.vue')
					},
					{
						path: '/about',
						name: 'About',
						component: () => import('@/pages/about/index.vue')
					}
				]
			},
			{
				path: '/login',
				name: 'Login',
				component: () => import('@/pages/login/index.vue')
			},
			{
				path: '/my',
				name: 'My',
				component: () => import('@/pages/my/index.vue')
			},
			{
				path: '/blog/detail',
				name: 'Detail',
				component: () => import('@/pages/blog/index.vue')
			}
		]
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
	// scrollBehavior(to, from, savedPosition) {
	// 	return { top: 0 };
	// }
} as RouterOptions);

export default router;
