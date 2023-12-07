<template>
	<div class="top">
		<div class="text-input">
			<!-- <div class="avatar">
				<img :src="imgUrl(userInfo.user_image)" alt="" />
			</div> -->
			<div class="input">
				<el-input
					:rows="8"
					v-model="leaveWordInput"
					maxlength="255"
					placeholder="留个言吧~"
					show-word-limit
					type="textarea" />
			</div>
		</div>
		<div class="comfirm">
			<el-button @click="addLeaveWord">发布</el-button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';

	import { validatorNotEmpty } from '@/utils/common';
	import { ElMessage } from 'element-plus';
	import { ref } from 'vue';

	interface EmitType {
		(e: 'closeDialog'): void;
	}

	const emit = defineEmits<EmitType>();

	const { user, leaveWord } = useStore();
	const { userInfo } = storeToRefs(user);
	console.log(userInfo.value);
	const leaveWordInput = ref('');

	const addLeaveWord = async () => {
		if (validatorNotEmpty(leaveWordInput.value)) {
			return ElMessage.warning('不能为空');
		}
		const params = {
			content: leaveWordInput.value
		};
		console.log(params);
		await leaveWord.addLeaveWord(params);
		ElMessage.success('发布留言成功');
		leaveWordInput.value = '';
		emit('closeDialog');
	};
</script>

<style lang="scss" scoped>
	.top {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 0 20px;

		.text-input {
			width: 100%;
			display: flex;
			gap: 20px;
			justify-content: space-around;
			align-items: center;
			padding: 10px;
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
				border-radius: 6px;
				transition: 1s;
			}
			:deep(.el-button:hover) {
				color: var(--theme-tool-item-color);
				width: 120px;
				background-color: var(--theme-color);
				border-radius: 6px;
			}
		}
	}
</style>
