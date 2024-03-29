<template>
	<div class="my-container animate__animated animate__zoomInUp">
		<div class="left">
			<p class="title">个人信息</p>
			<div class="avatar">
				<img :src="imgUrl(userInfo.user_image)" alt="" />
			</div>
			<div class="name">{{ userInfo.name }}</div>
			<div class="data">
				<div class="data-item">
					<div class="text">文章</div>
					<div class="number" @click="() => changeList('blog')">
						{{ 0 }}
					</div>
				</div>
				<div class="data-item">
					<div class="text">关注</div>
					<div class="number" @click="() => changeList('following')">
						{{ userInfo.user_focus }}
					</div>
				</div>
				<div class="data-item">
					<div class="text">粉丝</div>
					<div class="number" @click="() => changeList('follower')">
						{{ userInfo.user_fans }}
					</div>
				</div>
			</div>
		</div>
		<div class="right">
			<div class="top">
				<div class="item">{{ title }}</div>
				<!-- <div class="collect" @click="changeBlog('collect')">收藏</div>
				<div class="like" @click="changeBlog('like')">点赞</div> -->
			</div>
			<div class="main">
				<div v-infinite-scroll="loadMoreBlog">
					<div
						v-show="showBlogs && userBlog.length > 0"
						class="blog-item"
						v-for="(item, index) in userBlog"
						:key="item.id"
						@click="gotoBlogDetail(item.id)">
						<zbBlogItemRectangleMobile
							:blog="(item as Blog)"
							v-if="isMobile"></zbBlogItemRectangleMobile>
						<blogItem
							:blog="(item as Blog)"
							v-if="!isMobile"></blogItem>
					</div>
				</div>
				<div
					v-show="showFollow && followingList.length > 0"
					class="blog-item"
					v-for="(item, index) in followingList"
					:key="item.id"
					@click="gotoUserDetail(item.id)">
					<userItem :user="item"></userItem>
				</div>
				<div
					v-show="showFans && followerList.length > 0"
					class="blog-item"
					v-for="(item, index) in followerList"
					:key="item.id"
					@click="gotoUserDetail(item.id)">
					<userItem :user="item"></userItem>
				</div>
				<div v-show="isShowEmpty">
					<zb-empty :height="500"></zb-empty>
				</div>
				<!-- <zb-loadMore
					direction="center"
					:isLoading="isLoading"></zb-loadMore> -->
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import blogItem from './components/blogItem.vue';
	import { useUserStore } from '@/store/user';
	import { storeToRefs } from 'pinia';
	import { computed, onMounted, ref } from 'vue';
	import userItem from './components/userItem.vue';
	import zbEmpty from '@/components/common/zb-empty.vue';
	import zbBlogItemRectangleMobile from '@/pages/home/components/blogItem-rectangle-mobile.vue';
	import { useCommonStore } from '@/store/common';
	import useIsMobile from '@/hooks/useIsMobile';
	import { imgUrl } from '@/utils/common';
	import useStore from '@/store';
	import { Blog } from '@/types';

	const router = useRouter();

	// 获取设备
	useIsMobile();
	const commonStore = useCommonStore();
	const { isMobile } = storeToRefs(commonStore);

	const userStore = useUserStore();
	const { userInfo, followerList, followingList } = storeToRefs(userStore);
	const getUserInfo = async () => {
		await userStore.getUserProfile();
	};

	onMounted(async () => {
		await getUserInfo();
		await getFollowList();
		isShowEmpty.value = !userBlog.value.length;
	});

	const currentPage = ref(1);
	const { user } = useStore();
	const { userBlog } = storeToRefs(user);

	const currentBlog = ref<'collect' | 'like'>('collect');
	const isLoading = ref(false);
	// 切换文章列表
	const changeBlog = async (type: 'collect' | 'like') => {
		console.log('changeBlog执行了');
		currentBlog.value = type;
		currentPage.value = 1;
		loadMoreBlog();
	};
	// 加载更多
	const loadMoreBlog = async () => {
		console.log('执行了');
		isLoading.value = true;
		if (currentBlog.value === 'collect') {
			await getCollectBlogList();
		} else {
			await getLikeBlogList();
		}
	};
	// 获取收藏文章列表
	const getCollectBlogList = async () => {
		await user.getUserCollect(currentPage.value, 3);
		currentPage.value += 1;
		isLoading.value = false;
	};
	// 获取点赞文章列表
	const getLikeBlogList = async () => {
		await user.getUserLike(currentPage.value, 3);
		currentPage.value += 1;
		isLoading.value = false;
	};

	// 获取用户关注列表和粉丝列表
	const getFollowList = async () => {
		await userStore.getUserFollowingList(1, 999);
		await userStore.getUserFollowerList(1, 999);
	};

	// 跳转到文章详情
	const gotoBlogDetail = (id?: number) => {
		if (!id) return;
		router.push('/blog/detail?id=' + id);
	};

	// 显示粉丝列表
	const showFans = ref(false);
	// 显示关注列表
	const showFollow = ref(false);
	// 显示文章列表
	const showBlogs = ref(true);
	// 是否显示空状态
	const isShowEmpty = ref(false);
	// 切换列表
	const changeList = (type: string) => {
		isShowEmpty.value = false;
		switch (type) {
			case 'blog':
				showBlogs.value = true;
				showFans.value = false;
				showFollow.value = false;
				if (!userBlog.value.length) isShowEmpty.value = true;
				break;
			case 'following':
				showFollow.value = true;
				showBlogs.value = false;
				showFans.value = false;
				if (!followingList.value.length) isShowEmpty.value = true;
				break;
			case 'follower':
				showFans.value = true;
				showBlogs.value = false;
				showFollow.value = false;
				if (!followerList.value.length) isShowEmpty.value = true;
				break;
		}
	};
	const title = computed(() => {
		if (showBlogs.value) return '文章';
		if (showFollow.value) return '关注';
		if (showFans.value) return '粉丝';
		return '';
	});
	//跳转到用户
	const gotoUserDetail = (id: number) => {
		console.log(id);
	};
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.my-container {
			flex-direction: column;
		}
		.left {
			gap: 15px !important;
			height: 250px;
			padding: 30px 0 !important;
		}
	}
	.my-container {
		display: flex;
		justify-content: space-between;
		gap: 20px;
		// align-items: center;
		margin: 15px;

		.left {
			background: var(--card-reset-bg);
			border-radius: 20px;
			flex-basis: 40%;
			height: 600px;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			gap: 30px;

			.title {
				// color: $themeColor;
				font-weight: 600;
				font-size: 18px;
				margin-bottom: 50px;
			}

			.avatar {
				width: 200px;
				height: 200px;
				border-radius: 50%;
				overflow: hidden;
				img {
					width: 100%;
					height: 100%;
				}
			}

			.name {
				font-size: 25px;
				font-weight: 800;
				margin-top: 10px;
			}

			.data {
				display: flex;
				justify-content: space-around;
				align-items: center;
				gap: 40px;

				.data-item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					gap: 6px;
					.text {
						font-weight: 500;
					}

					.number {
						font-weight: 600;
					}

					.number:hover {
						color: var(--theme-active-color);
						cursor: pointer;
						font-weight: 600;
					}
				}
			}
		}

		.right {
			flex-basis: 60%;
			background: var(--card-reset-bg);
			border-radius: 20px;

			.top {
				height: 50px;
				display: flex;
				justify-content: space-between;
				border-bottom: 2px solid #ccc;
				.item {
					font-weight: 700;
					line-height: 50px;
					padding-left: 20px;
				}
			}

			.main {
				margin-top: 10px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				gap: 10px;
				padding: 0 10px;
				.blog-item {
					width: 100%;
				}
			}
		}
	}
</style>
