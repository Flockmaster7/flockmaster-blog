import { ElMessage } from 'element-plus';
import cache from './cache';
import router from '@/router/index';
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

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
	// 清除用户信息
	userInfo.value = {
		id: 0,
		user_name: '游客',
		is_admin: false,
		name: '游客',
		description: '这个人很懒，什么都没有留下',
		user_image: '/70819f913636cc5b697a88c00.jpg',
		user_focus: 0,
		user_fans: 0
	};
	ElMessage({
		type: 'success',
		message: '退出登录成功'
	});
	// 清除用户信息
	cache.removeCache(import.meta.env.VITE_USERINFO);
	// 跳转
	router.replace({
		path: '/login'
	});
};
