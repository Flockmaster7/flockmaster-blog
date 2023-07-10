import {
	createRouter,
	createWebHistory,
	RouterOptions,
	RouteRecordRaw,
	RouteLocationNormalized,
	NavigationGuardNext,
	createWebHashHistory
} from 'vue-router';
import { ElMessage } from 'element-plus';
import { isLogin } from '@/utils/login';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/home',
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
					},
					{
						path: '/pigeonhole',
						name: 'Pigeonhole',
						component: () => import('@/pages/pigeonhole/index.vue')
					},
					{
						path: '/tag',
						name: 'Tag',
						component: () => import('@/pages/tag/index.vue')
					},
					{
						path: '/leaveWord',
						name: 'LeaveWord',
						component: () => import('@/pages/leaveWord/index.vue')
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
	history: createWebHashHistory(),
	routes
	// scrollBehavior(to, from, savedPosition) {
	// 	return { top: 0 };
	// }
} as RouterOptions);

// 设置全局路由守卫
router.beforeEach(
	(
		to: RouteLocationNormalized,
		_: RouteLocationNormalized,
		next: NavigationGuardNext
	) => {
		next();
		// if (to.path === '/login') {
		// 	next();
		// } else {
		// 	// 还没登录
		// 	if (!isLogin()) {
		// 		ElMessage({
		// 			message: '请先登录',
		// 			type: 'error'
		// 		});
		// 	} else {
		// 		next();
		// 	}
		// }
	}
);

export default router;
