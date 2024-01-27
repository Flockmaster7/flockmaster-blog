<template>
	<div class="circleFriendCommentItem-container" @click="handlerComment">
		<div class="avatar">
			<img :src="imgUrl(data.user.user_image)" alt="" />
		</div>
		<div class="info-box">
			<div class="info">
				<div class="name">{{ data.user.name }}</div>
				<zb-time :time="data.createdAt" type="fromNow"> </zb-time>
			</div>
			<div class="content">
				<span v-if="data.targetComment">
					回复<span class="name"
						>{{ data.targetComment.user.name }}：</span
					>
				</span>
				<span>{{ data.content }}</span>
			</div>
		</div>
	</div>
	<CricleFriendCommentPost
		v-if="commentInputActive === data.id"
		:reply-to="data.id"
		:circle-friend-id="data.circle_friend_id"
		@handler-comment="handlerComment"
		@handler-blur="handlerComment"></CricleFriendCommentPost>
</template>

<script setup lang="ts">
	import { CircleFriendComment } from '@/types';
	import zbTime from '@/components/common/zb-time.vue';
	import { imgUrl } from '@/utils/common';
	import CricleFriendCommentPost from './circleFriendCommentPost.vue';

	interface PropsType {
		data: CircleFriendComment;
		commentInputActive: number;
	}

	interface EmitsType {
		(e: 'changeActiveCommentInput', id: number): void;
	}

	const emits = defineEmits<EmitsType>();
	const props = defineProps<PropsType>();

	const handlerComment = () => {
		if (props.commentInputActive === props.data.id)
			emits('changeActiveCommentInput', -1);
		else emits('changeActiveCommentInput', props.data.id);
	};
</script>

<style lang="scss" scoped>
	@import '../../static/css/mixins.scss';

	.circleFriendCommentItem-container {
		@include flex-box(10px);

		.avatar {
			@include avatar(36px, 5px);
		}

		.info-box {
			@include flex-column-box(4px);
			justify-content: space-between;
			flex: 1;
			.info {
				@include flex-between(0px);
				.name {
					color: var(--theme-text-2);
					font-size: 14px;
				}
			}

			.content {
				line-height: 1.3;

				.name {
					color: var(--theme-text-2);
				}
			}
		}

		.info-box:hover {
			cursor: pointer;
		}
	}
</style>
