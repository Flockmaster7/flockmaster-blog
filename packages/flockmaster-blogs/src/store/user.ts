import { getUserInfo } from '@/http/user';
import { GetUserInfoResType } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
	const userInfo = ref<GetUserInfoResType>({
		id: 0,
		user_name: '游客',
		is_admin: false,
		name: '游客',
		description: '这个人很懒，什么都没有留下'
	});
	const type = ref<string>('read');

	const getUserProfile = async () => {
		const { data: res } = await getUserInfo();
		if (res.code === 200) {
			userInfo.value = res.data;
		}
	};
	return { userInfo, type, getUserProfile };
});
