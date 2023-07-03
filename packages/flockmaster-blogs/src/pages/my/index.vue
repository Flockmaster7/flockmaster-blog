<template>
	<div class="container">
		<div class="left">
			<p class="title">个人信息</p>
			<!-- <zbInfoItem :info="userInfo" /> -->
			<div class="avatar">
				<img :src="userInfo.user_image" alt="" />
			</div>
			<div class="name">{{ userInfo.name }}</div>
			<div class="data">
				<div class="data-item">
					<div class="text">文章</div>
					<div class="number" @click="() => changeList('blog')">
						{{ blogTotal }}
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
			</div>
			<div class="main">
				<div
					v-show="showBlogs && blogList.length > 0"
					class="blog-item"
					v-for="(item, index) in blogList"
					:key="item.id"
					@click="gotoBlogDetail(item.id)">
					<blogItem :blog="item"></blogItem>
				</div>
				<div
					v-show="showFollow && followingList.length > 0"
					class="blog-item"
					v-for="(item, index) in followingList"
					:key="item.id"
					@click="gotoBlogDetail(item.id)">
					<userItem :user="item"></userItem>
				</div>
				<div
					v-show="showFans && followerList.length > 0"
					class="blog-item"
					v-for="(item, index) in followerList"
					:key="item.id"
					@click="gotoBlogDetail(item.id)">
					<userItem :user="item"></userItem>
				</div>
				<div v-show="isShowEmpty">
					<zb-empty></zb-empty>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import blogItem from './blogItem.vue';
	import { useBlogStore } from '@/store/blog';
	import { useUserStore } from '@/store/user';
	import { storeToRefs } from 'pinia';
	import { computed, onMounted, ref } from 'vue';
	import userItem from './userItem.vue';
	import zbEmpty from '@/components/common/zb-empty.vue';

	const router = useRouter();

	const userStore = useUserStore();
	const { userInfo, followerList, followingList } = storeToRefs(userStore);
	const getUserInfo = async () => {
		await userStore.getUserProfile();
	};

	onMounted(async () => {
		await getUserInfo();
		await getBlogListByUser();
		await getFollowList();
	});

	const blogStore = useBlogStore();
	const { blogList, blogTotal } = storeToRefs(blogStore);
	// 获取用户列表
	const getBlogListByUser = async () => {
		await blogStore.getBlogList(1, 9, { user_id: userInfo.value.id });
	};
	// 获取用户关注列表和粉丝列表
	const getFollowList = async () => {
		await userStore.getUserFollowingList(1, 9);
		await userStore.getUserFollowerList(1, 9);
	};
	// 跳转到文章详情
	const gotoBlogDetail = (id: number) => {
		router.push('/blog/detail?id=' + id);
	};

	// 显示粉丝列表
	const showFans = ref(false);
	// 显示关注列表
	const showFollow = ref(false);
	// 显示文章列表
	const showBlogs = ref(true);
	// 切换列表
	const changeList = (type: string) => {
		switch (type) {
			case 'blog':
				showBlogs.value = true;
				showFans.value = false;
				showFollow.value = false;
				break;
			case 'following':
				showFollow.value = true;
				showBlogs.value = false;
				showFans.value = false;
				break;
			case 'follower':
				showFans.value = true;
				showBlogs.value = false;
				showFollow.value = false;
				break;
		}
	};
	const title = computed(() => {
		if (showBlogs.value) return '文章';
		if (showFollow.value) return '关注';
		if (showFans.value) return '粉丝';
	});
	const isShowEmpty = computed(() => {
		if (showBlogs) {
			if (!blogList.value.length) return true;
		}
		if (showFans) {
			if (!followerList.value.length) return true;
		}
		if (showFollow) {
			if (!followingList.value.length) return true;
		}
		return false;
	});
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		justify-content: space-between;
		gap: 20px;
		// align-items: center;
		margin: 15px;

		.left {
			background-color: $white;
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
						color: $themeColor;
						cursor: pointer;
						font-weight: 600;
					}
				}
			}
		}

		.right {
			flex-basis: 60%;
			background-color: $white;
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
				}
			}
		}
	}
</style>
