import { ADMIN, defaultUserInfo } from '@/constant';
import {
	adminInfo,
	cancelFollowUser,
	followUser,
	getCollectList,
	getLikeList,
	isFollow
} from './../http/user';
import { getFansList, getFollowList, getUserInfo } from '@/http/user';
import { AdminInfo, Blog, UserInfo } from '@/types';
import cache from '@/utils/cache';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
	const admin = ref<AdminInfo>({
		id: 0,
		user_name: '登录',
		is_admin: false,
		name: '登录',
		description: '这个人很懒，什么都没有留下',
		user_image:
			'https://ggkt-atguigu-1313888024.cos.ap-guangzhou.myqcloud.com/flockmaster-blogs/images/ed37644d426c7bcd4f9ca5c00.png',
		user_focus: 0,
		user_fans: 0,
		tagNum: 0,
		blogNum: 0,
		workNum: 0
	});
	const userInfo = ref<UserInfo>(defaultUserInfo);

	// 关注列表
	const followingList = ref<UserInfo[]>([]);
	// 粉丝列表
	const followerList = ref<UserInfo[]>([]);
	const type = ref<string>('read');
	// 用户个人文章
	const userBlog = ref<Partial<Blog>[]>([]);

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

	// 获取管理员信息
	const getAdminInfo = async () => {
		const { data: res } = await adminInfo();
		if (res.code === 200) {
			admin.value = res.data;
			cache.setCache(ADMIN, res.data);
		}
	};

	// 获取用户收藏文章
	const getUserCollect = async (pageNum: number, pageSize: number) => {
		const { data: res } = await getCollectList(pageNum, pageSize);
		if (res.code === 200) {
			userBlog.value = res.data.rows;
		}
	};

	// 获取用户点赞文章
	const getUserLike = async (pageNum: number, pageSize: number) => {
		const { data: res } = await getLikeList(pageNum, pageSize);
		if (res.code === 200) {
			userBlog.value = res.data.rows;
		}
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
		isFollowUser,
		getAdminInfo,
		admin,
		userBlog,
		getUserCollect,
		getUserLike
	};
});
