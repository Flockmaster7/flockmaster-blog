<template>
	<div
		class="blog-header"
		:style="{
			transform: !isShowHeader
				? 'translate3d(0, -100%, 0)'
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
	</div>
	<div class="blog-container">
		<!-- 左侧 -->
		<div class="blog-card">
			<div class="tool-card">
				<tool :id="id" @toComment="toComment"></tool>
			</div>
			<div class="progress-card">
				<zb-progress
					:progressDepth="progressDepth"
					text="泰裤辣"></zb-progress>
			</div>
			<div
				ref="scrollToTopRef"
				class="scrollToTop"
				@click="gotoTop"
				v-show="isShowScrollToTop">
				<div class="icon">
					<zb-svg-icon name="rocket" size="50"></zb-svg-icon>
				</div>
			</div>
			<el-card>
				<div class="blog-info">
					<div class="top">
						<div class="title">{{ blogDeatil.title }}</div>
						<div class="createdAt">
							{{ blogDeatil.createdAt }} 发布
						</div>
					</div>
					<div class="bottom">
						<div class="author">作者：{{ blogDeatil.author }}</div>
						<div class="data">
							<div class="data-item">
								<span class="text"
									>阅读：{{ blogDeatil.blog_read }}</span
								>
							</div>
							<div class="data-item">
								<span class="text"
									>点赞：{{ blogDeatil.blog_like }}</span
								>
							</div>
							<div class="data-item">
								<span class="text">
									收藏：{{ blogDeatil.blog_collect }}
								</span>
							</div>
						</div>
					</div>
				</div>
				<div class="mainImg">
					<img :src="imgUrl(blogDeatil.blog_image)" alt="" />
				</div>
				<!-- 文章预览 -->
				<MdPreview
					:editorId="previewId"
					v-model="content"
					:theme="isDark ? 'dark' : 'light'"
					:showCodeRowNumber="true" />
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
				<div class="top" ref="commentRef">
					<span class="title">评论</span>
					<div class="text-input">
						<div class="avatar">
							<img :src="imgUrl(userInfo.user_image)" alt="" />
						</div>
						<div class="input">
							<el-input
								:rows="4"
								v-model="textarea"
								maxlength="255"
								placeholder="请输入~"
								show-word-limit
								type="textarea" />
						</div>
					</div>
					<div class="comfirm">
						<el-button @click="comment">发布</el-button>
					</div>
				</div>
				<div class="list">
					<div class="title">
						全部评论 {{ commentTotal === 0 ? '' : commentTotal }}
					</div>
					<div
						class="comment"
						v-for="item in commentList"
						:key="item.id">
						<zb-comment-area
							type="blog"
							:item="item"
							@getCommentList="getCommentList"></zb-comment-area>
						<!-- <div class="avatar">
								<img
									:src="
										imgUrl(imgEnvironment) +
										item.user.user_image
									"
									alt="" />
							</div>
							<div class="box">
								<div class="info">
									<div class="topInfo">
										<div class="name">
											{{ item.user.name }}
										</div>
										<div class="time">
											{{ getTimeFormNow(item.createdAt) }}
										</div>
									</div>
									<div class="content">
										{{ item.content }}
									</div>
									<div class="operator">
										<div class="reply" @click="openReply(item.id)">
											{{
												activeReply === item.id
													? '取消回复'
													: '回复'
											}}
										</div>
									</div>
									<div
										class="replyArea"
										v-if="activeReply === item.id">
										<div class="input">
											<el-input
												:rows="3"
												v-model="replyContent"
												maxlength="255"
												placeholder="请输入~"
												show-word-limit
												type="textarea" />
										</div>
										<div class="reply">
											<el-button @click="reply(item.id)"
												>发布</el-button
											>
										</div>
									</div>
									<div
										class="secondList"
										v-if="item.children.length > 0">
										<div
											class="comment"
											v-for="(item1, index1) in item.children"
											:key="item1.id">
											<div class="avatar">
												<img
													:src="
														imgUrl(imgEnvironment) +
														item1.user.user_image
													"
													alt="" />
											</div>
											<div class="box">
												<div class="info">
													<div class="topInfo">
														<div class="name">
															<div class="name-name">
																{{ item1.user.name }}
															</div>
															<span
																class="name-reply"
																v-if="
																	item1.targetComment
																">
																回复
															</span>
															<div class="name-replyName">
																{{
																	item1.targetComment
																		? item1
																				.targetComment
																				.user
																				.name
																		: ''
																}}
															</div>
														</div>
														<div class="time">
															{{
																getTimeFormNow(
																	item1.createdAt
																)
															}}
														</div>
													</div>
													<div class="content">
														{{ item1.content }}
													</div>
													<div
														class="replied-content"
														v-if="item1.targetComment">
														{{
															item1.targetComment.content
														}}
													</div>
													<div class="operator">
														<div
															class="reply"
															@click="
																openReply(item1.id)
															">
															{{
																activeReply === item1.id
																	? '取消回复'
																	: '回复'
															}}
														</div>
													</div>
													<div
														class="replyArea"
														v-if="activeReply === item1.id">
														<div class="input">
															<el-input
																:rows="3"
																v-model="replyContent"
																maxlength="255"
																placeholder="请输入~"
																show-word-limit
																type="textarea" />
														</div>
														<div class="reply">
															<el-button
																@click="
																	reply(
																		item.id,
																		item1.id
																	)
																"
																>发布</el-button
															>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div> -->
					</div>
					<zb-empty
						v-if="commentList.length === 0"
						:height="400"></zb-empty>
					<div @click="() => getCommentList()">
						<zb-loadMore
							v-if="isLoadMore"
							direction="center"
							:isLoading="isLoading"></zb-loadMore>
					</div>
				</div>
			</el-card>
		</div>
		<!-- 右侧 -->
		<div class="right-card">
			<el-card class="recommend-card">
				<div class="recommend-title">相关文章</div>
				<el-divider border-style="dashed" />
				<div class="recommend-box">
					<div
						class="recommend-blog-item"
						v-for="item in recommendList"
						:key="item.id">
						<div
							class="item-title"
							@click="gotoBlogDetail(item.id)">
							{{ item.title }}
						</div>
						<div class="item-data">
							<div class="item-data-item">
								{{ item.blog_like }}点赞
							</div>
							<div class="item-data-item">
								{{ item.blog_collect }}收藏
							</div>
						</div>
					</div>
				</div>
				<!-- <zb-loading></zb-loading> -->
				<zb-empty
					v-if="recommendList.length === 0"
					:text-size="15"
					:height="100"></zb-empty>
			</el-card>
			<!-- 目录卡片 -->
			<el-card class="catalog-card">
				<div class="catalog-title">目录</div>
				<el-divider border-style="dashed" />
				<div class="catalog-box">
					<MdCatalog
						:editorId="previewId"
						:scrollElement="scrollElement" />
				</div>
			</el-card>
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
</template>

<script setup lang="ts">
	import {
		nextTick,
		onBeforeMount,
		onBeforeUnmount,
		onMounted,
		ref,
		watch
	} from 'vue';
	import { storeToRefs } from 'pinia';
	import { useRoute } from 'vue-router';
	import { imgUrl } from '@/utils/common';
	import tool from '@/pages/blog/tool.vue';
	import { ElMessage } from 'element-plus';
	import { CommentParamsType } from '@/types/index';
	import useGetPageScroll from '@/hooks/useGetPageScroll';
	import { ArrowUpBold } from '@element-plus/icons-vue';
	import { isLogin } from '@/utils/login';
	import zbCommentArea from '@/components/common/zb-comment-area.vue';
	import zbEmpty from '@/components/common/zb-empty.vue';
	import { validatorNotEmpty } from '@/utils/common';
	import zbProgress from '@/components/common/zb-progress.vue';
	import { MdPreview, MdCatalog } from 'md-editor-v3';
	import 'md-editor-v3/lib/style.css';
	import useStore from '@/store';
	import router from '@/router';

	const { common, blog, user } = useStore();
	const { isDark, rightOpen } = storeToRefs(common);

	const { blogDeatil, blogStatus, commentList, commentTotal, recommendList } =
		storeToRefs(blog);
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

	const currentPage = ref(0);
	const isLoadMore = ref(true);
	const isLoading = ref(false);

	// 评论
	const textarea = ref('');
	// 获取评论
	const getCommentList = async (newStart?: boolean) => {
		if (newStart) {
			currentPage.value = 0;
		}
		isLoading.value = true;
		currentPage.value += 1;
		const res = await blog.getComment(
			blogDeatil.value.id,
			currentPage.value,
			9
		);
		isLoading.value = false;
		if (!res) {
			isLoadMore.value = false;
		}
	};
	// 评论
	const comment = async () => {
		if (validatorNotEmpty(textarea.value)) {
			return ElMessage.warning('不能为空');
		}
		const params = {
			blog_id: blogDeatil.value.id,
			content: textarea.value
		};
		await blog.addComment(params);
		ElMessage.success('发布评论成功');
		textarea.value = '';
		// 重新获取评论
		getCommentList(true);
	};
	const activeReply = ref<number | null>(null);
	const openReply = (index: number) => {
		if (activeReply.value === index) {
			activeReply.value = null;
			return;
		}
		activeReply.value = index;
	};
	// 回复
	const replyContent = ref('');
	const reply = async (parent_id: number, reply_to?: number) => {
		const params: CommentParamsType = {
			blog_id: blogDeatil.value.id,
			content: replyContent.value,
			parent_id: parent_id
		};
		reply_to && (params.reply_to = reply_to);
		await blog.addComment(params);
		ElMessage.success('发布评论成功');
		replyContent.value = '';
		activeReply.value = null;
		// 重新获取评论
		getCommentList();
	};
	// 滚动到评论区
	const top = ref(0);

	const commentRef = ref<HTMLDivElement>();
	const toComment = () => {
		nextTick(() => {
			// commentRef.value?.scrollIntoView();
			// document.body.scrollTop = commentRef.value?.offsetTop!;
			window.scrollTo({
				top: commentRef.value?.offsetTop,
				behavior: 'smooth'
			});
		});
	};

	// 滚动到顶部
	const scrollToTopRef = ref<HTMLDivElement>();
	const gotoTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};
	const isShowScrollToTop = ref(false);

	const { y } = useGetPageScroll(commentRef.value);
	// 阅读进度
	const progressDepth = ref(0);
	const isShowHeader = ref(false);
	// 获取高度
	const getEndHeight = (y: number) => {
		nextTick(() => {
			progressDepth.value = Math.min(
				(y / commentRef.value?.offsetTop!) * 100,
				100
			);
		});
	};
	watch(y, (newVal) => {
		getEndHeight(newVal);
		if (newVal >= 600) isShowHeader.value = true;
		else isShowHeader.value = false;
		if (newVal >= 1000) {
			isShowScrollToTop.value = true;
		} else {
			isShowScrollToTop.value = false;
		}
	});

	// 跳转到文章详情
	const gotoBlogDetail = async (id: number) => {
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
			right: 30px !important;
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
			.header-title {
				font-size: 20px;
				font-weight: 700;
			}

			.header-author {
				display: flex;
				align-items: center;
				gap: 8px;
				font-size: 17px;
				.follow {
					padding: 4px 8px;
					border-radius: 5px;
					font-size: 14px;
				}

				.follow:hover {
					color: var(--theme-background-color);
					cursor: pointer;
				}
			}
		}
	}

	.blog-container {
		display: flex;
		gap: 10px;
		margin: 15px;
	}

	.blog-card {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 10px;
		position: relative;
		flex-basis: 75%;
	}

	.right-card {
		// flex-basis: 25%;
		width: 300px;
		gap: 10px;
		display: flex;
		flex-direction: column;

		//推荐文章
		.recommend-card {
			.recommend-title {
				font-size: 20px;
				text-align: center;
				height: 30px;
				line-height: 30px;
			}

			.recommend-box {
				display: flex;
				flex-direction: column;
				gap: 15px;
				padding: 0 20px;
				.recommend-blog-item {
					display: flex;
					flex-direction: column;
					gap: 10px;
					padding: 5px 0;
					.item-title {
						font-size: 16px;
					}
					.item-data {
						display: flex;
						gap: 8px;
						.item-data-item {
							font-size: 14px;
						}
					}
				}

				.recommend-blog-item:hover {
					.item-title:hover {
						cursor: pointer;
						color: var(--theme-active-color);
					}
				}
			}
		}
		// 目录导航
		.catalog-card {
			position: sticky;
			top: 75px;
			max-height: 450px;
			cursor: pointer;
			overflow: hidden;

			.catalog-title {
				font-size: 20px;
				text-align: center;
				height: 30px;
				line-height: 30px;
			}

			.catalog-box {
				max-height: 350px;
				padding: 0 20px;
				overflow-y: auto;
			}
		}
	}

	.active {
		background-color: var(--theme-color) !important;
	}

	.tool-card {
		position: absolute;
		left: -100px;
	}

	.progress-card {
		position: absolute;
		left: -85px;
		// bottom: 200px;

		.progress-container {
			position: fixed;
			bottom: 120px;
		}
	}

	.scrollToTop {
		z-index: 10;
		opacity: 0.6;
		position: absolute;
		right: -50px;
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
				// background-color: #a4c4b5;
				border-radius: 6px;
				transition: 1s;
			}
			:deep(.el-button:hover) {
				color: #fff;
				width: 120px;
				background-color: var(--theme-color);
				border-radius: 6px;
			}
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
