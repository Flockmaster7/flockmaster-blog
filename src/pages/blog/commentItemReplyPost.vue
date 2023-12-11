<template>
	<div class="operator">
		<div class="reply" @click="openReply">
			{{ isReply ? '取消回复' : '回复' }}
		</div>
	</div>
	<div class="replyArea" v-show="isReply">
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
			<el-button @click="reply(replyId, replyChildId)">发布</el-button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import useStore from '@/store';
	import { CommentParamsType } from '@/types';
	import { validatorNotEmpty } from '@/utils/common';
	import { ElMessage } from 'element-plus';
	import { storeToRefs } from 'pinia';
	import { ref } from 'vue';

	interface propsType {
		replyId: number;
		replyChildId?: number;
	}
	const props = defineProps<propsType>();

	const replyContent = ref('');

	const { blog } = useStore();
	const { blogDeatil } = storeToRefs(blog);

	const isReply = ref(false);

	const openReply = () => {
		isReply.value = !isReply.value;
	};

	const reply = async (parent_id: number, reply_to?: number) => {
		if (validatorNotEmpty(replyContent.value)) {
			return ElMessage.warning('不能为空');
		}
		const params: CommentParamsType = {
			blog_id: blogDeatil.value.id,
			content: replyContent.value,
			parent_id: parent_id
		};
		reply_to && (params.reply_to = reply_to);
		await blog.addComment(params);
		ElMessage.success('发布评论成功');
		replyContent.value = '';
		isReply.value = false;
	};
</script>

<style lang="scss" scoped>
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
</style>
