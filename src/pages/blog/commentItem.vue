<template>
	<div class="commentItem-container">
		<CommentItemReply
			type="comment"
			:replyId="item.id"
			:commentInfo="item"></CommentItemReply>
		<div class="child-reply" v-if="item.children.length > 0">
			<CommentItemReply
				v-for="childReply in item.children"
				:key="childReply.id"
				type="reply"
				:replyId="item.id"
				:replyChildId="childReply.id"
				:commentInfo="childReply"></CommentItemReply>
			<CommentItemAllReplayOperator
				v-if="showAllReply"
				:id="item.id"></CommentItemAllReplayOperator>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Comment } from '@/types';
	import CommentItemReply from './commentItemReply.vue';
	import { computed } from 'vue';
	import CommentItemAllReplayOperator from './commentItemAllReplayOperator.vue';

	interface propsType {
		item: Comment;
	}

	const props = defineProps<propsType>();

	const showAllReply = computed(() => {
		return props.item.children.length > 3;
	});
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

	.commentItem-container {
		margin-bottom: 30px;
		.child-reply {
			background: var(--theme-operator-color);
			padding: 20px;
			border-radius: 8px;
			margin: 25px 0 0 65px;

			.allReply {
				margin-top: 15px;
				font-size: 13px;
				color: var(--theme-text-1);
			}

			.allReply:hover {
				cursor: pointer;
			}
		}
	}
</style>
