import { getUserInfo } from '@/http/user';
import { GetUserInfoResType } from '@/types';
import { imgEnvironment } from '@/types/enum';
import { getImgBaseUrl } from '@/utils/imgUrl';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
	const userInfo = ref<GetUserInfoResType>({
		id: 0,
		user_name: '游客',
		is_admin: false,
		name: '游客',
		description: '这个人很懒，什么都没有留下',
		user_image: '@/static/images/test_blog_img.png',
		user_focus: 0,
		user_fans: 0
	});
	const type = ref<string>('read');

	const getUserProfile = async () => {
		const { data: res } = await getUserInfo();
		if (res.code === 200) {
			userInfo.value = res.data;
			// 处理用户头像
			userInfo.value.user_image =
				getImgBaseUrl(imgEnvironment.dev) + userInfo.value.user_image;
		}
	};
	return { userInfo, type, getUserProfile };
});
