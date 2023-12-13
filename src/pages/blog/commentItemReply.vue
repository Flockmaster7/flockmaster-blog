<template>
	<div class="comment-container">
		<div class="avatar">
			<img :src="imgUrl(commentInfo.user.user_image)" alt="" />
		</div>
		<div class="box">
			<div class="info">
				<div class="comment" v-if="type === 'comment'">
					<span class="name">{{ commentInfo.user.name }}</span>
					<div class="content">{{ commentInfo.content }}</div>
				</div>
				<div class="reply" v-else>
					<span class="name">{{ commentInfo.user.name }}</span>
					<span class="name-reply" v-if="commentInfo.targetComment">
						{{ ' 回复 ' }}
						<span class="name">{{
							commentInfo.targetComment
								? commentInfo.targetComment?.user.name
								: ''
						}}</span>
					</span>
					：{{ commentInfo.content }}
				</div>
				<div class="replied-content" v-if="commentInfo.targetComment">
					{{ commentInfo.targetComment?.content }}
				</div>
				<div class="bottom">
					<ZbTime
						:time="commentInfo.createdAt"
						type="fromNow"></ZbTime>
					<span
						class="reply"
						@click="
							() => {
								isReply = !isReply;
							}
						">
						{{ isReply ? '取消回复' : '回复' }}
					</span>
				</div>
				<CommentItemReplyPost
					v-model="isReply"
					v-show="isReply"
					:replyId="replyId"
					:replyChildId="replyChildId" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Comment } from '@/types';
	import { imgUrl } from '@/utils/common';
	import CommentItemReplyPost from './commentItemReplyPost.vue';
	import ZbTime from '@/components/common/zb-time.vue';
	import { ref } from 'vue';

	interface PropsType {
		replyId: number;
		commentInfo: Comment;
		replyChildId?: number;
		type: 'comment' | 'reply';
	}

	defineProps<PropsType>();

	const isReply = ref(false);
</script>

<style lang="scss" scoped>
	@media screen and (min-width: 540px) {
	}

	.comment-container {
		width: 100%;
		display: flex;
		gap: 16px;
		margin-bottom: 25px;
		justify-content: space-between;

		.avatar {
			width: 40px;
			height: 40px;
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
				gap: 15px;

				.comment {
					word-break: break-all;

					.content {
						margin-top: 15px;
						line-height: 1.5;
					}
				}

				.reply {
					word-break: break-all;
					line-height: 1.5;

					.name {
						color: #515767;
					}
				}

				.replied-content {
					word-break: break-all;
					box-sizing: border-box;
					line-height: 1.5;
					padding: 10px;
					border-radius: 8px;
					background-color: var(--theme-reply-content-color);
					color: $gray;
				}

				.bottom {
					display: flex;
					align-items: center;
					gap: 15px;
					font-size: 14px;
					color: #8a919f;

					.reply:hover {
						cursor: pointer;
						color: var(--theme-active-color);
					}
				}
			}
		}
	}
</style>
