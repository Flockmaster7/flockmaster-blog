<template>
	<div class="commentItem-container">
		<CommentItemReply
			:replyId="item.id"
			:commentInfo="item"></CommentItemReply>
		<div class="child-reply" v-if="item.children.length > 0">
			<CommentItemReply
				v-for="childReply in item.children"
				:key="childReply.id"
				:replyId="item.id"
				:replyChildId="childReply.id"
				:commentInfo="childReply"></CommentItemReply>
			<div @click="getChildrenList(item.id)">
				<zb-loadMore
					v-if="isLoadMore"
					:isLoading="isLoading"></zb-loadMore>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Comment } from '@/types';
	import { onMounted, ref } from 'vue';
	import useStore from '@/store';
	import CommentItemReply from './commentItemReply.vue';

	interface propsType {
		item: Comment;
	}

	const props = defineProps<propsType>();

	const { blog } = useStore();

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
		res = await blog.getChildrenComment(id, currentPage.value, 3);
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

	.commentItem-container {
		margin-bottom: 30px;
		.child-reply {
			background: var(--theme-operator-color);
			margin-left: 65px;
			padding: 20px;
			border-radius: 8px;
		}
	}
</style>
