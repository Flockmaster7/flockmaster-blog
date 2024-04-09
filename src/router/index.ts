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
import { routers as newRouters } from './newRouter';

import { ElMessageBox } from 'element-plus';
import { isLogin } from '@/utils/login';

const routes: Array<RouteRecordRaw> = newRouters;

const router = createRouter({
	history: createWebHashHistory(),
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (to.meta.scrollTop) return { top: 0 };
	}
} as RouterOptions);

// 设置全局路由守卫
router.beforeEach(
	(
		to: RouteLocationNormalized,
		_: RouteLocationNormalized,
		next: NavigationGuardNext
	) => {
		if (to.meta.loginRequest && !isLogin()) {
			ElMessageBox.confirm(
				'此内容需要登录才可操作，是否登录',
				'Warning',
				{
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}
			).then(() => {
				// 跳转到登录页
				router.push({
					path: '/login',
					query: { from: router.currentRoute.value.fullPath }
				});
				next();
			});
		} else {
			if (to.meta.hasVisit) {
				router.replace('/home');
			}
			startProgress();
			next();
		}
	}
);

router.afterEach(() => {
	closeProgress();
});

export default router;
