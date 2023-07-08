<template>
	<div class="blog-container">
		<div class="tool-card">
			<tool :id="id"></tool>
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
			<el-divider></el-divider>
			<div class="tag">
				标签：
				<div class="tag-list">
					<el-tag
						v-for="(item, index) in blogDeatil.tags"
						:key="item.id"
						>{{ item.tag_name }}</el-tag
					>
				</div>
			</div>
		</el-card>
		<el-card>
			<div class="top">
				<span class="title">评论</span>
				<div class="text-input">
					<div class="avatar">
						<img :src="userInfo.user_image" alt="" />
					</div>
					<div class="input">
						<el-input
							:rows="4"
							v-model="textarea"
							maxlength="255"
							placeholder="请输入~"
							@change="onChange"
							show-word-limit
							type="textarea" />
					</div>
				</div>
				<div class="comfirm">
					<el-button>发布</el-button>
				</div>
			</div>
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
	import tool from '@/pages/blog/tool.vue';

	const blogStore = useBlogStore();
	const userStore = useUserStore();
	const { blogDeatil, blogStatus } = storeToRefs(blogStore);
	const { userInfo } = storeToRefs(userStore);
	const route = useRoute();

	const content = ref('');
	const id = route.query.id! as string;

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

	// 评论
	const textarea = ref('');
	const onChange = (e: Event) => {
		console.log(e);
	};

	// // 点赞
	// const likeBlog = async () => {
	// 	if (!blogStatus.value.like) {
	// 		await blogStore.blogLike();
	// 	} else {
	// 		await blogStore.blogUnlike();
	// 	}
	// 	blogStore.getBlogDetail(Number(id));
	// };

	// // 收藏
	// const collectBlog = async () => {
	// 	if (!blogStatus.value.collect) {
	// 		await blogStore.blogCollect();
	// 	} else {
	// 		await blogStore.blogUncollect();
	// 	}
	// 	await blogStore.getBlogDetail(Number(id));
	// };
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		:deep(.el-card__body) {
			padding-left: 0 !important;
			padding-right: 0 !important;
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

		.tag {
			padding-left: 15px;
		}

		.top {
			.title {
				font-size: 18px !important;
			}
			.text-input {
				gap: 12px !important;
				.avatar {
					width: 50px !important;
					height: 50px !important;
				}
			}
			.comfirm {
				:deep(.el-button) {
					width: 80px !important;
				}
			}
		}
	}
	.blog-container {
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
		left: -100px;
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

	.tag {
		display: flex;
		align-items: center;

		.tag-list {
			display: flex;
			gap: 8px;
			margin-left: 10px;
		}
	}

	.top {
		display: flex;
		flex-direction: column;
		padding: 0 20px;
		// width: 100%;

		.title {
			font-size: 20px;
			font-weight: 600;
			margin: 20px;
		}

		.text-input {
			width: 100%;
			display: flex;
			gap: 20px;
			justify-content: space-around;
			align-items: center;
			padding: 10px;
			.avatar {
				width: 60px;
				border-radius: 50%;
				height: 60px;
				img {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}

			.input {
				width: 100%;
				flex: 1;
				margin-right: 14px;
				// flex-basis: 70%;
			}
		}

		.comfirm {
			margin-top: 6px !important;
			display: flex;
			justify-content: flex-end;

			margin-top: 20px;
			:deep(.el-button) {
				width: 100px;
				background-color: #a4c4b5;
				border-radius: 6px;
				transition: 1s;
			}
			:deep(.el-button:hover) {
				color: #fff;
				width: 120px;
				background-color: #84c5a7;
				border-radius: 6px;
			}
		}
	}
</style>
