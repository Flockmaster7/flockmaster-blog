import { ElMessage } from 'element-plus';
import cache from './cache';
import router from '@/router/index';
import { storeToRefs } from 'pinia';
import useStore from '@/store';
import { DIANZAN_LEAVEWORD } from '@/constant';

const { user, circleFriend, leaveWord } = useStore();
const { userInfo } = storeToRefs(user);
const { dianzanList } = storeToRefs(leaveWord);

const { userDianzanList } = storeToRefs(circleFriend);

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

// 清除信息
export const clearInfo = () => {
	cache.removeCache(import.meta.env.VITE_ACCESS_TOKEN);
	// 清除用户信息
	userInfo.value = {
		id: 0,
		user_name: '游客',
		is_admin: false,
		name: '游客',
		description: '这个人很懒，什么都没有留下',
		user_image:
			'https://ggkt-atguigu-1313888024.cos.ap-guangzhou.myqcloud.com/flockmaster-blogs/images/ed37644d426c7bcd4f9ca5c00.png',
		user_focus: 0,
		user_fans: 0
	};
	// 清除点赞
	userDianzanList.value = [];
	// 清除用户信息
	cache.removeCache(import.meta.env.VITE_USERINFO);
	// cache.removeCache(DIANZAN_LEAVEWORD);
	dianzanList.value = [];
};

// 退出登录
export const logout = () => {
	clearInfo();
	ElMessage({
		type: 'success',
		message: '退出登录成功'
	});
	// 跳转
	router.replace({
		path: '/login'
	});
};

// 退出登录
export const newLogout = () => {
	clearInfo();
	ElMessage({
		type: 'success',
		message: '退出登录成功'
	});
};
