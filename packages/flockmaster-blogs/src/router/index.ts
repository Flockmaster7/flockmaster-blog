import {
	createRouter,
	RouterOptions,
	RouteRecordRaw,
	RouteLocationNormalized,
	NavigationGuardNext,
	createWebHashHistory
} from 'vue-router';
import { closeProgress, startProgress } from '@/utils/progress';
import { routers } from './router';

const routes: Array<RouteRecordRaw> = routers;

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
		startProgress();
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

router.afterEach(() => {
	closeProgress();
});

export default router;
