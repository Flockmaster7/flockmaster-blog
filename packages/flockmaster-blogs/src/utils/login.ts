import { ElMessage } from 'element-plus';
import cache from './cache';
import router from '@/router/index';

// 判断是否登录
export const isLogin = (): boolean => {
	if (cache.getCache(import.meta.env.VITE_ACCESS_TOKEN)) {
		return true;
	} else {
		return false;
	}
};

// token过期，重定向到登录
export const redirectToLogin = (path: string) => {
	router.replace({
		path: path
	});
};

// 退出登录
export const logout = () => {
	cache.removeCache(import.meta.env.VITE_ACCESS_TOKEN);
	router.replace({
		path: '/login'
	});
	ElMessage({
		type: 'success',
		message: '退出登录成功'
	});
	// 清除用户信息
	cache.removeCache(import.meta.env.VITE_USERINFO);
};
