<template>
	<transition>
		<div class="blog-container">
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
					<el-icon color="#ffffff"><ArrowUpBold /></el-icon>
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
						:src="
							getImgBaseUrl(imgEnvironment) +
							blogDeatil.blog_image
						"
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
				<div class="top" ref="commentRef">
					<span class="title">评论</span>
					<div class="text-input">
						<div class="avatar">
							<img
								:src="
									getImgBaseUrl(imgEnvironment) +
									userInfo.user_image
								"
								alt="" />
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
						v-for="(item, index) in commentList"
						:key="item.id">
						<zb-comment-area
							type="blog"
							:item="item"
							@getCommentList="getCommentList"></zb-comment-area>
						<!-- <div class="avatar">
							<img
								:src="
									getImgBaseUrl(imgEnvironment) +
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
													getImgBaseUrl(imgEnvironment) +
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
				</div>
			</el-card>
		</div>
	</transition>
</template>

<script setup lang="ts">
	import {
		nextTick,
		onBeforeUnmount,
		onMounted,
		onUnmounted,
		ref,
		toRaw,
		watch
	} from 'vue';
	import { useBlogStore } from '@/store/blog';
	import { storeToRefs } from 'pinia';
	import { useRoute } from 'vue-router';
	import { useUserStore } from '@/store/user';
	import { getImgBaseUrl } from '@/utils/imgUrl';
	import { imgEnvironment } from '@/constant/index';
	import tool from '@/pages/blog/tool.vue';
	import { ElMessage } from 'element-plus';
	import { CommentParamsType } from '@/types/index';
	import useGetPageScroll from '@/hooks/useGetPageScroll';
	import { ArrowUpBold } from '@element-plus/icons-vue';
	import { getTimeFormNow } from '@/utils/dayFormat';
	import { isLogin } from '@/utils/login';
	import zbCommentArea from '@/components/common/zb-comment-area.vue';
	import zbEmpty from '@/components/common/zb-empty.vue';
	import { validatorNotEmpty } from '@/utils/common';
	import zbProgress from '@/components/common/zb-progress.vue';

	const blogStore = useBlogStore();
	const userStore = useUserStore();
	const { blogDeatil, blogStatus, commentList, commentTotal } =
		storeToRefs(blogStore);
	const { userInfo } = storeToRefs(userStore);
	const route = useRoute();

	const content = ref('');
	const id = route.query.id! as string;

	onMounted(async () => {
		// 获取状态
		if (isLogin()) {
			blogStore.isBlogLike(Number(id));
			blogStore.isBlogCOllect(Number(id));
		}
		//增加阅读
		if (!blogStatus.value.read) {
			blogStore.addBlogRead(Number(id));
			blogStatus.value.read = true;
		}
		// 获取信息
		await blogStore.getBlogDetail(Number(id));
		nextTick(() => {
			content.value = blogDeatil.value.content_html;
		});
		// setTimeout(() => {
		// 	content.value = blogDeatil.value.content_html;
		// }, 150);
		// 获取评论
		getCommentList();
	});

	onBeforeUnmount(() => {
		blogStatus.value.read = false;
	});

	// 评论
	const textarea = ref('');
	// 获取评论
	const getCommentList = async () => {
		await blogStore.getComment(blogDeatil.value.id, 1, 999);
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
		await blogStore.addComment(params);
		ElMessage.success('发布评论成功');
		textarea.value = '';
		// 重新获取评论
		getCommentList();
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
		await blogStore.addComment(params);
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
		if (newVal >= 1000) {
			isShowScrollToTop.value = true;
		} else {
			isShowScrollToTop.value = false;
		}
	});
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
	}

	.blog-container {
		display: flex;
		flex-direction: column;
		gap: 10px;
		// margin: 15px;
		position: relative;
	}

	.active {
		background-color: $themeColor !important;
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
		opacity: 0.6;
		position: absolute;
		right: -50px;
		.icon {
			border-radius: 40%;
			position: fixed;
			bottom: 100px;
			width: 50px;
			height: 50px;
			background-color: $themeColor;
			text-align: center;
			line-height: 50px;
			transition: 0.7s;
		}

		.icon:hover {
			cursor: pointer;
			transform: translate(-3px, -5px);
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
