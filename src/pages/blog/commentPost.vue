<template>
	<div class="commentPost-container" ref="commentRef">
		<div class="text-input">
			<div class="avatar">
				<img :src="userImage" alt="" />
			</div>
			<div class="input">
				<el-input
					:rows="4"
					v-model="textarea"
					maxlength="255"
					placeholder="平等表达，友善交流"
					show-word-limit
					type="textarea" />
			</div>
		</div>
		<div class="comfirm">
			<el-button @click="comment" type="primary">发布</el-button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import useStore from '@/store';
	import { validatorNotEmpty } from '@/utils/common';
	import { ElMessage } from 'element-plus';
	import { ref } from 'vue';

	interface PropsType {
		blogId: number;
		userImage: string;
	}

	interface EmitsType {
		(e: 'refreshComment', flag: boolean): void;
	}

	const props = defineProps<PropsType>();
	const emits = defineEmits<EmitsType>();

	const textarea = ref('');

	const { blog } = useStore();

	const comment = async () => {
		if (validatorNotEmpty(textarea.value)) {
			return ElMessage.warning('不能为空');
		}
		const params = {
			blog_id: props.blogId,
			content: textarea.value
		};
		await blog.addComment(params);
		ElMessage.success('发布评论成功');
		textarea.value = '';
		// 重新获取评论
		emits('refreshComment', true);
	};
</script>

<style lang="scss" scoped>
	.commentPost-container {
		display: flex;
		flex-direction: column;

		.text-input {
			width: 100%;
			display: flex;
			gap: 10px;
			justify-content: space-around;
			.avatar {
				width: 48px;
				border-radius: 50%;
				height: 48px;
				img {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}

			.input {
				width: 100%;
				flex: 1;
			}
		}

		.comfirm {
			margin-top: 8px;
			display: flex;
			justify-content: flex-end;
			// :deep(.el-button) {
			// 	width: 100px;
			// 	// background-color: #a4c4b5;
			// 	border-radius: 6px;
			// 	transition: 1s;
			// }
			// :deep(.el-button:hover) {
			// 	color: #fff;
			// 	width: 120px;
			// 	background-color: var(--theme-color);
			// 	border-radius: 6px;
			// }
		}
	}
</style>
