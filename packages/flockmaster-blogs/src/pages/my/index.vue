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
					<div class="number">2</div>
				</div>
				<div class="data-item">
					<div class="text">关注</div>
					<div class="number">{{ userInfo.user_focus }}</div>
				</div>
				<div class="data-item">
					<div class="text">粉丝</div>
					<div class="number">{{ userInfo.user_fans }}</div>
				</div>
			</div>
		</div>
		<div class="right">
			<div class="top">
				<div class="item">文章</div>
			</div>
			<div class="main">
				<div
					class="blog-item"
					v-for="(item, index) in blogList"
					:key="item.id"
					@click="gotoBlogDetail(item.id)">
					<blogItem :blog="item"></blogItem>
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
	import { onMounted, ref } from 'vue';

	const router = useRouter();

	const userStore = useUserStore();
	const { userInfo } = storeToRefs(userStore);
	const getUserInfo = async () => {
		await userStore.getUserProfile();
	};

	onMounted(async () => {
		await getUserInfo();
		await getBlogListByUser();
	});

	const blogStore = useBlogStore();
	const { blogList, blogTotal } = storeToRefs(blogStore);
	const getBlogListByUser = async () => {
		await blogStore.getBlogList(1, 9, { author: userInfo.value.name });
	};
	// 跳转到文章详情
	const gotoBlogDetail = (id: number) => {
		router.push('/blog/detail?id=' + id);
	};
	// getBlogListParams.value.author = userInfo.value.name;
	// console.log(getBlogListParams.value);
	// const { pageNum, pageSize, handleSizeChange, handleCurrentChange } =
	// 	usePagination(getBlogListParams.value, blogStore.getBlogList);
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
				.blog-item {
				}
			}
		}
	}
</style>
