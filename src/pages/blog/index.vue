<template>
	<div class="blogDetail-container">
		<!-- <div
			class="blog-header"
			:style="{
				transform: !isShowHeader
					? 'translate3d(0, -150%, 0)'
					: 'translate3d(0, 0, 0)'
			}">
			<div class="blog-header-box">
				<div class="header-title">
					{{ blogDeatil.title }}
				</div>
				<div class="header-author">
					<div class="author-name">
						{{ blogDeatil.author }}
					</div>
					<div class="author-follow">
						<el-button
							class="follow"
							type="primary"
							@click="userFollow('follow')"
							v-if="!isFollow && !isOwn"
							>关注</el-button
						>
						<el-button
							type="default"
							class="cancel-follow"
							@click="userFollow('cancel')"
							v-if="isFollow && !isOwn"
							>已关注</el-button
						>
					</div>
				</div>
			</div>
		</div> -->

		<!-- <div class="tool-list">
			<div class="tool-card">
				<tool :id="id" @toComment="toComment"></tool>
			</div>
		</div> -->

		<div class="blog-container">
			<!-- 左侧 -->
			<div class="blog-card">
				<div class="blog-detail-card">
					<blogInfo :blogDeatil="blogDeatil" />
					<div class="mainImg">
						<img v-lazy="imgUrl(blogDeatil.blog_image)" alt="" />
					</div>
					<!-- 文章预览 -->
					<MdPreview
						:editorId="previewId"
						v-model="content"
						:theme="isDark ? 'dark' : 'light'"
						:showCodeRowNumber="true" />
					<el-divider></el-divider>
					<blogFooter :blogDeatil="blogDeatil"></blogFooter>
				</div>
				<div class="blog-detail-card">
					<commentPost
						:blogId="blogDeatil.id"
						:userImage="userInfo.user_image"
						@refreshComment="getCommentList"></commentPost>
					<CommentList></CommentList>
				</div>
			</div>
		</div>

		<!-- 右侧抽屉 -->
		<el-drawer v-model="rightOpen" size="60%" title="目录" direction="rtl">
			<!-- 目录卡片 -->
			<div class="catalog-card">
				<div class="catalog-box">
					<MdCatalog
						:editorId="previewId"
						:scrollElement="scrollElement" />
				</div>
			</div>
		</el-drawer>
	</div>

	<!-- <div
		ref="scrollToTopRef"
		class="scrollToTop"
		@click="gotoTop"
		v-show="isShowScrollToTop">
		<div class="icon">
			<zb-svg-icon name="rocket" size="50"></zb-svg-icon>
		</div>
	</div> -->
</template>

<script setup lang="ts">
	import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
	import { storeToRefs } from 'pinia';
	import { useRoute } from 'vue-router';
	import { imgUrl } from '@/utils/common';
	import { ElMessage } from 'element-plus';
	import { CommentParamsType } from '@/types/index';
	import useGetPageScroll from '@/hooks/useGetPageScroll';
	import { isLogin } from '@/utils/login';

	import { MdPreview, MdCatalog } from 'md-editor-v3';
	import 'md-editor-v3/lib/style.css';
	import useStore from '@/store';
	import router from '@/router';
	import blogInfo from './blogInfo.vue';
	import blogFooter from './blogFooter.vue';
	import commentPost from './commentPost.vue';
	import CommentList from './commentList.vue';

	const { common, blog, user } = useStore();
	const { isDark, rightOpen } = storeToRefs(common);

	const { blogDeatil, blogStatus } = storeToRefs(blog);
	const { userInfo } = storeToRefs(user);
	const route = useRoute();

	const content = ref('');
	const id = route.query.id! as string;

	const scrollElement = document.documentElement;

	const previewId = ref('myPreview');

	onMounted(async () => {
		// 获取状态
		if (isLogin()) {
			blog.isBlogLike(Number(id));
			blog.isBlogCOllect(Number(id));
		}
		//增加阅读
		if (!blogStatus.value.read) {
			blog.addBlogRead(Number(id));
			blogStatus.value.read = true;
		}
		// 获取信息
		await blog.getBlogDetail(Number(id));
		nextTick(() => {
			content.value = blogDeatil.value.content_text;
		});
		// 获取评论
		getCommentList();
		// 获取推荐文章
		blog.getRecommendBlogList(Number(id));
		// 是否关注
		if (isLogin()) {
			const res = await user.isFollowUser(blogDeatil.value.user.id);
			isFollow.value = res;
		}
		// 是否是本人
		isOwn.value = userInfo.value.id === blogDeatil.value.user.id;
		window.scrollTo({
			top: 0
		});
	});

	onBeforeUnmount(() => {
		blogStatus.value.read = false;
	});

	// 获取评论
	const getCommentList = async () => {
		await blog.getComment(blogDeatil.value.id, 1, 9);
	};

	// 滚动到顶部
	// const scrollToTopRef = ref<HTMLDivElement>();
	// const gotoTop = () => {
	// 	window.scrollTo({
	// 		top: 0,
	// 		behavior: 'smooth'
	// 	});
	// };
	// const isShowScrollToTop = ref(false);

	// const { y } = useGetPageScroll(commentRef.value);
	// // 阅读进度
	// const progressDepth = ref(0);
	// const isShowHeader = ref(false);
	// // 获取高度
	// const getEndHeight = (y: number) => {
	// 	nextTick(() => {
	// 		progressDepth.value = Math.min(
	// 			(y / commentRef.value?.offsetTop!) * 100,
	// 			100
	// 		);
	// 	});
	// };
	// watch(y, (newVal) => {
	// 	getEndHeight(newVal);
	// 	if (newVal >= 600) isShowHeader.value = true;
	// 	else isShowHeader.value = false;
	// 	if (newVal >= 1000) {
	// 		isShowScrollToTop.value = true;
	// 	} else {
	// 		isShowScrollToTop.value = false;
	// 	}
	// });

	// 跳转到文章详情
	const gotoBlogDetail = async (id?: number) => {
		if (!id) return;
		// 获取状态
		if (isLogin()) {
			blog.isBlogLike(Number(id));
			blog.isBlogCOllect(Number(id));
		}
		//增加阅读
		if (!blogStatus.value.read) {
			blog.addBlogRead(Number(id));
			blogStatus.value.read = true;
		}
		// 获取信息
		await blog.getBlogDetail(Number(id));
		nextTick(() => {
			content.value = blogDeatil.value.content_text;
		});
		// 获取评论
		getCommentList();
		// 获取推荐文章
		blog.getRecommendBlogList(Number(id));
		// 是否关注
		if (isLogin()) {
			const res = await user.isFollowUser(blogDeatil.value.user.id);
			isFollow.value = res;
		}
		// 是否是本人
		isOwn.value = userInfo.value.id === blogDeatil.value.user.id;
		router.push('/blog/detail?id=' + id);
	};

	// 关注与取消
	const isFollow = ref(false);
	const isOwn = ref(false);
	const userFollow = async (type: string) => {
		const user_id = blogDeatil.value.user.id;
		if (type === 'follow') {
			await user.follow(user_id);
		} else if (type === 'cancel') {
			await user.cancelFollow(user_id);
		}
		const res = await user.isFollowUser(user_id);
		isFollow.value = res;
	};
</script>

<style lang="scss" scoped>
	// 分割线
	.el-divider--horizontal {
		margin: 9px 0 !important;
	}
	// 抽屉
	:deep(.el-drawer__header) {
		margin-bottom: 0px !important;
	}

	@media screen and (max-width: 540px) {
		:deep(.el-card__body) {
			padding-left: 0 !important;
			padding-right: 0 !important;
		}

		.bottom {
			gap: 10px !important;
		}

		.author {
			font-size: 15px !important;
		}

		.tag {
			padding-left: 15px !important;
		}

		.top {
			.title {
				font-size: 25px !important;
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

		.list {
			.title {
				font-size: 20px !important;
			}

			.comment {
				gap: 10px !important;
				.avatar {
					width: 35px !important;
					height: 35px !important;
				}

				.info {
					.name {
						font-size: 16px !important;
					}

					.time {
						font-size: 14px !important;
					}

					.reply,
					.content {
						font-size: 15px !important;
					}
				}
			}

			.secondList {
				.comment {
					gap: 10px !important;
					.avatar {
						width: 30px !important;
						height: 30px !important;
					}

					.info {
						gap: 5px;
						.name-name {
							font-size: 15px !important;
						}

						.name-reply,
						.name-replyName {
							display: none !important;
						}

						.time {
							font-size: 13px !important;
						}

						.reply,
						.content,
						.replied-content {
							font-size: 14px !important;
						}
					}
				}
			}
		}

		.scrollToTop {
			right: 60px !important;
			.icon {
				bottom: 70px !important;
				width: 40px !important;
				height: 40px !important;
				line-height: 40px !important;
			}
		}

		.right-card {
			display: none !important;
		}

		.blog-header {
			.header-title {
				font-size: 16px !important;
			}
			.header-author {
				font-size: 14px !important;
			}
		}
	}

	.blogDetail-container {
		display: flex;
		justify-content: center;
	}

	.blog-header {
		z-index: 1000;
		width: 100%;
		height: 58px;
		position: fixed;
		top: 0;
		left: 0;
		background-color: var(--theme-color);
		display: flex;
		justify-content: center;
		align-items: center;
		transition: 0.4s;

		.blog-header-box {
			padding: 20px;
			width: 1100px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			opacity: 0.7;
			.header-title {
				font-size: 20px;
				font-weight: 700;
			}

			.header-author {
				display: flex;
				align-items: center;
				gap: 8px;
				font-size: 17px;

				:deep(.el-button--primary) {
					width: 50px;
					background-color: var(--theme-active-color);
					border-radius: 6px;
					transition: 1s;
				}
				:deep(.el-button--primary:hover) {
					width: 73px;
				}

				.follow {
					padding: 4px 8px;
					border-radius: 5px;
					font-size: 14px;
				}

				.follow:hover {
					cursor: pointer;
				}
			}
		}
	}

	.scrollToTop {
		z-index: 10;
		opacity: 0.6;
		position: absolute;
		right: 100px;
		.icon {
			border-radius: 40%;
			position: fixed;
			bottom: 50px;
			width: 50px;
			height: 50px;
			text-align: center;
			line-height: 50px;
		}

		.icon:hover {
			cursor: pointer;
			animation: translate 1.2s ease-in-out infinite;
		}

		@keyframes translate {
			from {
				transform: translateY(15px);
			}

			to {
				transform: translateY(0);
			}
		}
	}

	.blog-container {
		display: flex;
		gap: 10px;
		// margin: 15px;
		padding: 30px 50px;

		.blog-card {
			display: flex;
			flex-direction: column;
			gap: 10px;
			position: relative;

			.blog-detail-card {
			}
		}
	}

	.active {
		background-color: var(--theme-color) !important;
	}

	.tool-list {
		position: relative;
		.tool-card {
			position: absolute;
			left: -75px;
			top: 140px;
		}

		.progress-card {
			position: absolute;
			left: -60px;
			// bottom: 200px;

			.progress-container {
				position: fixed;
				bottom: 100px;
			}
		}
	}

	.mainImg {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		img {
			width: 100%;
			border-radius: 5px;
		}
	}

	.list {
		padding: 0 20px;
		.title {
			font-size: 23px;
			font-weight: 700;
			height: 80px;
			line-height: 80px;
		}
		.comment {
			display: flex;
			gap: 20px;
			margin-bottom: 25px;
			justify-content: space-between;

			.avatar {
				width: 45px;
				height: 45px;
				border-radius: 50%;

				img {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}

			.box {
				flex-basis: 95%;
				.info {
					display: flex;
					flex-direction: column;
					padding-top: 4px;
					gap: 20px;
					.topInfo {
						display: flex;
						justify-content: space-between;
						align-items: center;
						.name {
							font-size: 18px;
						}
						.time {
							color: $grayWhite;
							font-size: 15px;
						}
					}

					.content {
						font-size: 16px;
						// color: $gray;
					}
				}

				.operator {
					.reply {
						color: $gray;
					}

					.reply:hover {
						cursor: pointer;
						color: $themeColor;
					}
				}

				.replyArea {
					display: flex;
					flex-direction: column;
					gap: 10px;

					.reply {
						align-self: flex-end;
					}
				}

				.secondList {
					padding: 15px 15px 0;
					background-color: $whiteCard;

					.name {
						display: flex;
						justify-content: center;
						align-items: center;
						gap: 15px;
						.name-reply {
							display: inline-block;
							color: $gray;
							font-size: 16px;
						}
					}

					.replied-content {
						padding: 10px;
						background-color: #f2f5f4;
						color: $gray;
					}
				}
			}
		}
	}
</style>
