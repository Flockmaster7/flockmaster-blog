<template>
	<div class="comment-container">
		<div class="avatar">
			<img :src="imgUrl(commentInfo.user.user_image)" alt="" />
		</div>
		<div class="box">
			<div class="info">
				<div class="topInfo">
					<div class="name">
						<div class="name-name">
							{{ commentInfo.user.name }}
						</div>
						<span
							class="name-reply"
							v-if="commentInfo.targetComment">
							回复
						</span>
						<div class="name-replyName">
							{{
								commentInfo.targetComment
									? commentInfo.targetComment?.user.name
									: ''
							}}
						</div>
					</div>
					<div class="time">
						{{ getTimeFormNow(commentInfo.createdAt) }}
					</div>
				</div>
				<div class="content">
					{{ commentInfo.content }}
				</div>
				<div class="replied-content" v-if="commentInfo.targetComment">
					{{ commentInfo.targetComment?.content }}
				</div>
				<CommentItemReplyPost
					:replyId="replyId"
					:replyChildId="replyChildId" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Comment } from '@/types';
	import { imgUrl } from '@/utils/common';
	import { getTimeFormNow } from '@/utils/dayFormat';
	import CommentItemReplyPost from './commentItemReplyPost.vue';

	interface PropsType {
		replyId: number;
		commentInfo: Comment;
		replyChildId?: number;
	}

	defineProps<PropsType>();
</script>

<style lang="scss" scoped>
	.comment-container {
		width: 100%;
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
				border-radius: 8px;
				background-color: var(--theme-reply-content-color);
				color: $gray;
			}
		}
	}
</style>
