<template>
	<div class="bottom">
		<ZbTime :time="data.createdAt" type="fromNow"></ZbTime>
		<span
			:class="{ operatorItem: true, active: isDianzan }"
			@click="dianzanComment">
			<zb-svg-icon
				name="like"
				:size="17"
				:color="
					isDianzan
						? 'var(--theme-active-color)'
						: 'var(--theme-text-2)'
				"></zb-svg-icon>
			<span>{{ count === 0 ? '点赞' : count }}</span>
		</span>
		<span
			:class="{ operatorItem: true, active: isReply }"
			@click="
				() => {
					isReply = !isReply;
				}
			">
			<zb-svg-icon
				name="pinglun"
				:size="17"
				:color="
					isReply
						? 'var(--theme-active-color)'
						: 'var(--theme-text-2)'
				"></zb-svg-icon>
			<span>{{ isReply ? '取消回复' : '回复' }}</span>
		</span>
	</div>
	<CommentItemReplyPost
		v-model="isReply"
		v-show="isReply"
		:replyId="replyId"
		:replyChildId="replyChildId" />
</template>

<script setup lang="ts">
	import useStore from '@/store';
	import { computed, ref } from 'vue';
	import CommentItemReplyPost from './commentItemReplyPost.vue';
	import { Comment } from '@/types/index';
	import { storeToRefs } from 'pinia';
	import { ElMessage } from 'element-plus';

	interface PropsType {
		data: Comment;
		replyId: number;
		replyChildId?: number;
	}

	const props = defineProps<PropsType>();

	const { blog } = useStore();
	const { userCommentDianzanList } = storeToRefs(blog);

	const isReply = ref(false);
	const count = ref(props.data.dianzanCount);
	const id = props.replyChildId ? props.replyChildId : props.replyId;

	const isDianzan = computed(() => {
		return userCommentDianzanList.value.includes(props.data.id);
	});

	const dianzan = async () => {
		const res = await blog.dianzanComment(id);
		if (res) {
			ElMessage.success('点赞成功');
			count.value++;
			userCommentDianzanList.value.push(id);
		}
	};

	const cancelDianzan = async () => {
		const res = await blog.cancelDianzanComment(
			props.replyChildId ? props.replyChildId : props.replyId
		);
		if (res) {
			count.value--;
			userCommentDianzanList.value = userCommentDianzanList.value.filter(
				(item) => item !== id
			);
		}
	};

	const dianzanComment = async () => {
		if (isDianzan.value) {
			cancelDianzan();
		} else {
			dianzan();
		}
	};
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.bottom {
			gap: 10px !important;
		}
	}

	.bottom {
		display: flex;
		align-items: center;
		gap: 20px;
		font-size: 14px;
		color: #8a919f;

		.active {
			color: var(--theme-active-color);
		}

		.operatorItem {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 2px;
			transition: all 0.2s;
		}

		.operatorItem:hover {
			cursor: pointer;
			color: var(--theme-active-color);
		}
	}
</style>
