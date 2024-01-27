<template>
	<div class="circleFriendCommentList-container">
		<CircleFriendCommentItem
			v-for="item in renderList"
			:data="item"
			:commentInputActive="commentInputActive"
			@changeActiveCommentInput="handlerComment"
			:key="item.id"></CircleFriendCommentItem>
		<div v-if="list.length > 3" class="allComment" @click="showAllComment">
			{{ allCommentText }}
		</div>
	</div>
</template>

<script setup lang="ts">
	import { CircleFriendComment } from '@/types';
	import CircleFriendCommentItem from './circleFriendCommentItem.vue';
	import { computed, ref } from 'vue';

	interface PropsType {
		list: CircleFriendComment[];
	}

	const props = defineProps<PropsType>();

	const commentInputActive = ref(0);
	const handlerComment = (id: number) => {
		commentInputActive.value = id;
	};

	// 全部评论
	const allCommentVisible = ref(props.list.length > 3);
	const allCommentText = computed(() => {
		return allCommentVisible.value ? '全部评论' : '收起';
	});
	const showAllComment = () => {
		allCommentVisible.value = !allCommentVisible.value;
	};
	const renderList = computed(() => {
		if (allCommentVisible.value) return props.list.slice(0, 3);
		else return props.list;
	});
</script>

<style lang="scss" scoped>
	@import '../../static/css/mixins.scss';

	.circleFriendCommentList-container {
		border-radius: 6px;
		padding: 10px;
		background: var(--theme-operator-color);
		@include flex-column-box(18px);

		.allComment {
			border-top: 1px solid #eeeeee;
			text-align: center;
			padding: 5px 0 0;
			font-size: 14px;
			color: var(--theme-text-1);
		}

		.allComment:hover {
			cursor: pointer;
		}
	}
</style>
