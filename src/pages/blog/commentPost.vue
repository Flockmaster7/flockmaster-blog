<template>
	<div class="commentPost-container" ref="commentRef">
		<span class="title">评论</span>
		<div class="text-input">
			<div class="avatar">
				<img :src="imgUrl(userImage)" alt="" />
			</div>
			<div class="input">
				<el-input
					:rows="4"
					v-model="textarea"
					maxlength="255"
					placeholder="请输入~"
					show-word-limit
					type="textarea" />
			</div>
		</div>
		<div class="comfirm">
			<el-button @click="comment">发布</el-button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import useStore from '@/store';
	import { imgUrl, validatorNotEmpty } from '@/utils/common';
	import { ElMessage } from 'element-plus';
	import { ref } from 'vue';

	interface PropsType {
		blogId: number;
		userImage: string;
	}

	interface EmitsType {
		(e: 'refreshComment', flag: boolean): any;
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

		.title {
			font-size: 23px;
			font-weight: 600;
			margin: 20px 0;
		}

		.text-input {
			width: 100%;
			display: flex;
			gap: 20px;
			justify-content: space-around;
			align-items: center;
			.avatar {
				width: 60px;
				border-radius: 50%;
				height: 60px;
				img {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}

			.input {
				width: 100%;
				flex: 1;
				margin-right: 14px;
			}
		}

		.comfirm {
			margin-top: 6px !important;
			display: flex;
			justify-content: flex-end;

			margin-top: 20px;
			:deep(.el-button) {
				width: 100px;
				// background-color: #a4c4b5;
				border-radius: 6px;
				transition: 1s;
			}
			:deep(.el-button:hover) {
				color: #fff;
				width: 120px;
				background-color: var(--theme-color);
				border-radius: 6px;
			}
		}
	}
</style>
