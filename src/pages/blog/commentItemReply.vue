<template>
	<div class="comment-container">
		<div class="avatar">
			<img :src="userImage" alt="" />
		</div>
		<div class="box">
			<div class="info">
				<div class="comment" v-if="type === 'comment'">
					<span class="name"
						>{{ userName }}
						<zb-svg-icon
							v-if="admin.id === commentInfo.user?.id"
							:size="14"
							name="admin"></zb-svg-icon>
					</span>
					<div class="content">{{ commentInfo.content }}</div>
				</div>
				<div class="reply" v-else>
					<span class="name">{{ userName }}</span>
					<span class="name-reply" v-if="commentInfo.targetComment">
						{{ ' 回复 ' }}
						<span class="name">{{ userTargetName }}</span>
					</span>
					：{{ commentInfo.content }}
				</div>
				<div class="replied-content" v-if="commentInfo.targetComment">
					{{ commentInfo.targetComment?.content }}
				</div>
				<CommentItemReplyBottomOperator
					:data="commentInfo"
					:replyId="replyId"
					:replyChildId="
						replyChildId
					"></CommentItemReplyBottomOperator>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Comment } from '@/types';
	import CommentItemReplyBottomOperator from './commentItemReplyBottomOperator.vue';
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';
	import { computed } from 'vue';

	interface PropsType {
		commentInfo: Comment;
		replyId: number;
		replyChildId?: number;
		type: 'comment' | 'reply';
	}

	const { commentInfo } = defineProps<PropsType>();

	const { user } = useStore();
	const { admin } = storeToRefs(user);

	const userImage = computed(() => {
		return (
			commentInfo.user?.user_image ??
			new URL('../../static/images/user.png', import.meta.url).href
		);
	});
	const userTargetName = computed(() => {
		return commentInfo.targetComment?.user?.name ?? '已注销用户';
	});
	const userName = computed(() => {
		return commentInfo.user?.name ?? '已注销用户';
	});
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
			min-width: 40px;
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
					color: var(--theme-text-2);

					.dianzan {
						display: flex;
						align-items: center;
					}

					.dianzan:hover,
					.reply:hover {
						cursor: pointer;
						color: var(--theme-active-color);
					}
				}
			}
		}
	}
</style>
