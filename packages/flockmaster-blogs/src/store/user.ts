import { cancelFollowUser, followUser, isFollow } from './../http/user';
import { getFansList, getFollowList, getUserInfo } from '@/http/user';
import { GetUserInfoResType } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
	const userInfo = ref<GetUserInfoResType>({
		id: 0,
		user_name: '游客',
		is_admin: false,
		name: '游客',
		description: '这个人很懒，什么都没有留下',
		user_image: '/70819f913636cc5b697a88c00.jpg',
		user_focus: 0,
		user_fans: 0
	});
	// 关注列表
	const followingList = ref<GetUserInfoResType[]>([]);
	// 粉丝列表
	const followerList = ref<GetUserInfoResType[]>([]);
	const type = ref<string>('read');

	// 获取用户信息
	const getUserProfile = async () => {
		const { data: res } = await getUserInfo();
		if (res.code === 200) {
			userInfo.value = res.data;
			// 处理用户头像
			// userInfo.value.user_image =
			// 	imgUrl(imgEnvironment) + userInfo.value.user_image;
		}
	};
	// 获取用户关注列表
	const getUserFollowingList = async (pageNum: number, pageSize: number) => {
		const { data: res } = await getFollowList(pageNum, pageSize);
		if (res.code === 200) {
			followingList.value = res.data.rows;
		}
	};
	// 获取用户粉丝列表
	const getUserFollowerList = async (pageNum: number, pageSize: number) => {
		const { data: res } = await getFansList(pageNum, pageSize);
		if (res.code === 200) {
			console.log(res.data.rows);
			followerList.value = res.data.rows;
		}
	};
	// 关注用户
	const follow = async (user_id: number) => {
		const { data: res } = await followUser(user_id);
		if (res.code === 200) {
			return Promise.resolve('success');
		}
	};
	// 取消关注用户
	const cancelFollow = async (
		user_id: number
	): Promise<string | undefined> => {
		const { data: res } = await cancelFollowUser(user_id);
		if (res.code === 200) {
			return Promise.resolve('success');
		}
	};
	// 是否关注用户
	const isFollowUser = async (follow_id: number): Promise<boolean> => {
		const { data: res } = await isFollow(follow_id);
		return res.data;
	};
	return {
		userInfo,
		followerList,
		followingList,
		type,
		getUserProfile,
		getUserFollowingList,
		getUserFollowerList,
		follow,
		cancelFollow,
		isFollowUser
	};
});
