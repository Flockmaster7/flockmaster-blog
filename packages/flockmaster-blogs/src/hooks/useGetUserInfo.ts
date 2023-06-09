import { getUserInfo } from '@/http/user';
import { GetUserInfoResType } from '@/types';
import cache from '@/utils/cache';
import { ref } from 'vue';

// 获取用户信息
export default async function () {
	const userInfo = ref<GetUserInfoResType>({
		id: 0,
		user_name: '',
		is_admin: false,
		name: '',
		description: ''
	});
	const { data: res } = await getUserInfo();
	if (res.code === 200) {
		userInfo.value = res.data;
		cache.setCache<GetUserInfoResType>(
			import.meta.env.VITE_USERINFO,
			res.data
		);
	}
	return userInfo;
}
