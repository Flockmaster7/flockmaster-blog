<template>
	<div class="avatar">
		<img :src="imgUrl(item.user.user_image)" alt="" />
	</div>
	<div class="box">
		<div class="info">
			<div class="topInfo">
				<div class="user-name" @click="gotoUser(item.user)">
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
					{{ activeReply === item.id ? '取消回复' : '回复' }}
				</div>
			</div>
			<div class="replyArea" v-if="activeReply === item.id">
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
					<el-button @click="reply(item.id)">发布</el-button>
				</div>
			</div>
			<div class="secondList" v-if="item.children.length > 0">
				<div
					class="comment"
					v-for="item1 in item.children"
					:key="item1.id">
					<!-- <div class="comment"> -->
					<div class="avatar">
						<img :src="imgUrl(item1.user.user_image)" alt="" />
					</div>
					<div class="box">
						<div class="info">
							<div class="topInfo">
								<div class="name">
									<div
										class="name-name"
										@click="gotoUser(item1.user)">
										{{ item1.user.name }}
									</div>
									<span
										class="name-reply"
										v-if="item1[target]">
										回复
									</span>
									<div
										class="name-replyName"
										@click="gotoUser(item1[target]?.user!)">
										{{
											item1[target]
												? item1[target]?.user.name
												: ''
										}}
									</div>
								</div>
								<div class="time">
									{{ getTimeFormNow(item1.createdAt) }}
								</div>
							</div>
							<div class="content">
								{{ item1.content }}
							</div>
							<div class="replied-content" v-if="item1[target]">
								{{ item1[target]?.content }}
							</div>
							<div class="operator">
								<div class="reply" @click="openReply(item1.id)">
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
									<el-button @click="reply(item.id, item1.id)"
										>发布</el-button
									>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div @click="getChildrenList(item.id)">
					<zb-loadMore
						v-if="isLoadMore"
						:isLoading="isLoading"></zb-loadMore>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { getTimeFormNow } from '@/utils/dayFormat';
	import { Comment, UserInfo } from '@/types';
	// import { useUserStore } from '@/store/user';
	import { CommentParamsType } from '@/types/index';
	import { computed, nextTick, onMounted, ref } from 'vue';
	import { storeToRefs } from 'pinia';
	import { ElMessage } from 'element-plus';
	import { validatorNotEmpty, imgUrl } from '@/utils/common';
	import router from '@/router';
	import useStore from '@/store';

	interface propsType {
		item: Comment;
		type: 'blog' | 'leaveWord';
	}

	interface emitsType {
		(e: 'getCommentList', newStart?: boolean): void;
	}

	const props = defineProps<propsType>();
	const emit = defineEmits<emitsType>();

	const { blog, leaveWord } = useStore();

	const { blogDeatil } = storeToRefs(blog);

	const target = computed(() => {
		return props.type === 'blog' ? 'targetComment' : 'targetLeaveWords';
	});

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
		if (validatorNotEmpty(replyContent.value)) {
			return ElMessage.warning('不能为空');
		}
		const params: CommentParamsType = {
			// blog_id: blogDeatil.value.id,
			content: replyContent.value,
			parent_id: parent_id
		};
		reply_to && (params.reply_to = reply_to);
		if (props.type === 'blog') {
			params.blog_id = blogDeatil.value.id;
			await blog.addComment(params);
			ElMessage.success('发布评论成功');
		} else if (props.type === 'leaveWord') {
			leaveWord.addLeaveWord(params);
			ElMessage.success('发布留言成功');
		}
		replyContent.value = '';
		activeReply.value = null;
		currentPage.value = 1;
		// 重新获取评论
		emit('getCommentList', true);
	};

	// 跳转到用户详情页
	const gotoUser = (userInfo: UserInfo) => {
		router.push('/my?id=' + userInfo.id);
	};

	//获取子评论
	onMounted(() => {
		if (props.item.children.length < 3) isLoadMore.value = false;
	});
	const currentPage = ref(1);
	const isLoadMore = ref(true);
	const isLoading = ref(false);
	//获取子评论
	const getChildrenList = async (id: number) => {
		isLoading.value = true;
		currentPage.value += 1;
		let res: boolean | undefined = true;
		if (props.type === 'blog') {
			res = await blog.getChildrenComment(id, currentPage.value, 3);
		} else {
			res = await leaveWord.getChildrenLeaveWord(
				id,
				currentPage.value,
				3
			);
		}
		isLoading.value = false;
		if (!res) {
			isLoadMore.value = false;
		}
	};
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
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
						// gap: 5px;
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
	}

	:deep(.el-button) {
		width: 100px;
		// background-color: #a4c4b5;
		border-radius: 6px;
		transition: 1s;
	}
	:deep(.el-button:hover) {
		color: #fff;
		width: 110px;
		background-color: var(--theme-color);
	}

	.comment {
		display: flex;
		gap: 20px;
		margin-bottom: 25px;
		justify-content: space-between;
	}
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
				.user-name {
					font-size: 18px;
				}
				.time {
					color: $grayWhite;
					font-size: 15px;
				}
			}

			.content {
				word-break: break-all;
				font-size: 16px;
				line-height: 1.4;
				// color: $gray;
			}
		}

		.operator {
			.reply {
				color: $gray;
			}

			.reply:hover {
				cursor: pointer;
				color: var(--theme-active-color);
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
			background-color: var(--theme-card-item-color);

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
				background-color: var(--theme-reply-content-color);
				color: $gray;
			}
		}
	}

	.name-name:hover,
	.user-name:hover,
	.name-replyName:hover {
		cursor: pointer;
		color: var(--theme-active-color);
	}
</style>
