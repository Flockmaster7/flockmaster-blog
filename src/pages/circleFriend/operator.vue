<template>
	<div class="operator-container">
		<div
			:class="{ dianzan: true, active: isDianzan }"
			@click="handlerDianzan">
			<zb-svg-icon
				name="like"
				:size="18"
				:color="isDianzan ? '#5cbfef' : ''" />
			{{ dianzanCount }}
		</div>
		<div
			:class="{ dianzan: true, active: commentVisible }"
			@click="handlerComment">
			<zb-svg-icon
				name="comment"
				:size="17"
				:color="commentVisible ? '#5cbfef' : ''" />
			{{ commentVisible ? '取消评论' : commentCount }}
		</div>
	</div>

	<CricleFriendCommentPost
		v-show="commentVisible"
		:circle-friend-id="circleFriendId"
		@handler-comment="handlerComment"></CricleFriendCommentPost>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import CricleFriendCommentPost from './circleFriendCommentPost.vue';

	interface PropsType {
		circleFriendId: number;
		dianzanCount: number;
		commentCount: number;
		isDianzan: boolean;
	}

	interface EmitsType {
		(e: 'dianzan', id: number): void;
		(e: 'cancelDianzan', id: number): void;
	}

	const props = defineProps<Readonly<PropsType>>();
	const emits = defineEmits<EmitsType>();

	const handlerDianzan = () => {
		if (!props.isDianzan) dianzan();
		else cancelDianzan();
	};

	const dianzan = () => {
		emits('dianzan', props.circleFriendId);
	};

	const cancelDianzan = () => {
		emits('cancelDianzan', props.circleFriendId);
	};

	const commentVisible = ref(false);
	const handlerComment = () => {
		commentVisible.value = !commentVisible.value;
	};
</script>

<style lang="scss" scoped>
	.operator-container {
		display: flex;
		gap: 15px;
		align-items: center;
		border-radius: 6px;
		padding: 10px 20px;
		// background: #fff7ff;
		background: var(--theme-operator-color);

		.dianzan {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 2px;
			font-size: 14px;
			color: $gray;
		}

		.active {
			color: #5cbfef;
		}

		.dianzan:hover {
			cursor: pointer;
		}
	}
</style>
