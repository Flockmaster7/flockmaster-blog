<template>
	<div class="container">
		<div class="tool-card">
			<div
				:class="{ 'tool-item': true, active: blogStatus.like }"
				@click="likeBlog">
				点赞
			</div>
			<div
				:class="{ 'tool-item': true, active: blogStatus.collect }"
				@click="collectBlog">
				收藏
			</div>
			<!-- <div class="tool-item">评论</div> -->
		</div>
		<el-card>
			<div class="blog-info">
				<div class="top">
					<div class="title">{{ blogDeatil.title }}</div>
					<div class="createdAt">{{ blogDeatil.createdAt }} 发布</div>
				</div>
				<div class="bottom">
					<div class="author">作者：{{ blogDeatil.author }}</div>
					<div class="data">
						<div class="data-item">
							<!-- <el-icon><View /></el-icon> -->
							<span class="text"
								>阅读：{{ blogDeatil.blog_read }}</span
							>
						</div>
						<div class="data-item">
							<!-- <el-icon><View /></el-icon> -->
							<span class="text"
								>点赞：{{ blogDeatil.blog_like }}</span
							>
						</div>
						<div class="data-item">
							<!-- <el-icon><Star /></el-icon> -->
							<span class="text">
								收藏：{{ blogDeatil.blog_collect }}
							</span>
						</div>
					</div>
				</div>
			</div>
			<div class="mainImg">
				<img
					:src="getImgBaseUrl(imgEnvironment) + blogDeatil.blog_image"
					alt="" />
			</div>
			<div id="markdown"></div>
			<v-md-preview :text="content"></v-md-preview>
		</el-card>
	</div>
</template>

<script setup lang="ts">
	import { onBeforeUnmount, onMounted, onUnmounted, ref, toRaw } from 'vue';
	import { useBlogStore } from '@/store/blog';
	import { storeToRefs } from 'pinia';
	import { useRoute } from 'vue-router';
	import { useUserStore } from '@/store/user';
	import { getImgBaseUrl } from '@/utils/imgUrl';
	import { imgEnvironment } from '@/constant/index';

	const blogStore = useBlogStore();
	const userStore = useUserStore();
	const { blogDeatil, blogStatus } = storeToRefs(blogStore);
	const { userInfo } = storeToRefs(userStore);
	const route = useRoute();

	const content = ref('');
	const id = route.query.id!;

	onMounted(() => {
		// 获取状态
		blogStore.isBlogLike(Number(id));
		blogStore.isBlogCOllect(Number(id));
		if (!blogStatus.value.read) {
			blogStore.addBlogRead(Number(id));
			blogStatus.value.read = true;
		}
		// 获取信息
		blogStore.getBlogDetail(Number(id));
		setTimeout(() => {
			content.value = blogDeatil.value.content_html;
		}, 150);
	});

	onBeforeUnmount(() => {
		blogStatus.value.read = false;
	});

	// 点赞
	const likeBlog = async () => {
		if (!blogStatus.value.like) {
			await blogStore.blogLike();
		} else {
			await blogStore.blogUnlike();
		}
		blogStore.getBlogDetail(Number(id));
	};

	// 收藏
	const collectBlog = async () => {
		if (!blogStatus.value.collect) {
			await blogStore.blogCollect();
		} else {
			await blogStore.blogUncollect();
		}
		await blogStore.getBlogDetail(Number(id));
	};
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		:deep(.el-card__body) {
			padding: 0 !important;
		}

		.bottom {
			gap: 10px !important;
		}

		.title {
			font-size: 28px !important;
		}

		.author {
			font-size: 14px;
		}
	}
	.container {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin: 15px;
		position: relative;
	}

	.active {
		background-color: $themeColor !important;
	}

	.tool-card {
		position: absolute;
		top: 20px;
		left: -75px;
		display: flex;
		flex-direction: column;
		gap: 20px;

		.tool-item {
			width: 60px;
			height: 60px;
			border-radius: 50%;
			background-color: $white;
			line-height: 60px;
			text-align: center;
			font-size: 15px;
			transition: 0.6s;
		}

		.tool-item:hover {
			width: 60px;
			height: 60px;
			background-color: $themeColor;
			cursor: pointer;
		}
	}

	.blog-info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 25px;
		padding: 16px 32px 32px;
		.top {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 10px;
			.title {
				font-size: 35px;
				font-weight: 700;
			}

			.createdAt {
				font-size: 16px;
				color: $gray;
			}
		}

		.bottom {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 20px;
			.author {
				font-size: 18px;
				font-weight: 500;
			}

			.data {
				display: flex;
				justify-content: center;
				align-items: center;
				gap: 15px;

				&-item {
					.text {
						font-size: 13px;
						height: 20px;
						line-height: 20px;
						text-align: center;
						margin-left: 5px;
						color: $grayWhite;
					}
				}
			}
		}
	}

	.mainImg {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 30px;

		img {
			width: 100%;
			border-radius: 5px;
		}
	}
</style>
