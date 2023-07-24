<template>
	<div class="leaveWord-container">
		<div class="leaveWord-title">留言板</div>
		<el-divider border-style="dashed" />
		<div class="top">
			<div class="text-input">
				<div class="avatar">
					<img :src="imgUrl(userInfo.user_image)" alt="" />
				</div>
				<div class="input">
					<el-input
						:rows="4"
						v-model="leaveWordInput"
						maxlength="255"
						placeholder="请输入~"
						show-word-limit
						type="textarea" />
				</div>
			</div>
			<div class="comfirm">
				<el-button @click="leaveWord">发布</el-button>
			</div>
		</div>
		<div class="list">
			<div class="title">
				全部留言 {{ leaveWordTotal === 0 ? '' : leaveWordTotal }}
			</div>
			<div
				class="comment"
				v-for="(item, index) in leaveWordList"
				:key="item.id">
				<zb-comment-area
					type="leaveWord"
					:item="item"
					@getCommentList="getLeaveWordList"></zb-comment-area>
			</div>
			<zb-empty
				v-if="leaveWordList.length === 0"
				:height="400"></zb-empty>
			<div @click="() => getLeaveWordList()">
				<zb-loadMore
					v-if="isLoadMore"
					direction="center"
					:isLoading="isLoading"></zb-loadMore>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import zbCommentArea from '@/components/common/zb-comment-area.vue';
	import { useLeaveWordStore } from '@/store/leaveWord';
	import { storeToRefs } from 'pinia';
	import { onMounted, ref } from 'vue';
	import { imgUrl } from '@/utils/common';
	import { useUserStore } from '@/store/user';
	import { ElMessage } from 'element-plus';
	import { validatorNotEmpty } from '@/utils/common';

	const leaveWordStore = useLeaveWordStore();
	const { leaveWordList, leaveWordTotal } = storeToRefs(leaveWordStore);
	const userStore = useUserStore();
	const { userInfo } = storeToRefs(userStore);

	onMounted(() => {
		getLeaveWordList();
	});

	// 获取留言列表
	const currentPage = ref(0);
	const isLoadMore = ref(true);
	const isLoading = ref(false);
	const getLeaveWordList = async (newStart?: boolean) => {
		if (newStart) currentPage.value = 0;
		isLoading.value = true;
		currentPage.value += 1;
		const res = await leaveWordStore.getLeaveWord(currentPage.value, 9);
		isLoading.value = false;
		if (!res) {
			isLoadMore.value = false;
		}
	};

	// 留言
	const leaveWordInput = ref('');
	const leaveWord = async () => {
		if (validatorNotEmpty(leaveWordInput.value)) {
			return ElMessage.warning('不能为空');
		}
		const params = {
			content: leaveWordInput.value
		};
		console.log(params);
		await leaveWordStore.addLeaveWord(params);
		ElMessage.success('发布留言成功');
		leaveWordInput.value = '';
		// 重新获取留言
		getLeaveWordList(true);
	};
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.leaveWord-container {
			padding: 40px 10px !important;
			.leaveWord-title {
				font-size: 25px !important;
			}
		}

		.top {
			.title {
				font-size: 18px !important;
			}
			.text-input {
				gap: 12px !important;
				.avatar {
					width: 50px !important;
					height: 50px !important;
				}
			}
			.comfirm {
				:deep(.el-button) {
					width: 80px !important;
				}
			}
		}

		.list {
			.title {
				font-size: 20px !important;
			}
		}
	}
	.leaveWord-container {
		padding: 40px 40px;
		background-color: var(--theme-card-color);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

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
					color: var(--theme-active-color);
					// background-color: var(--theme-color);
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

		.leaveWord-title {
			font-size: 30px;
			font-weight: 600;
		}

		.list {
			width: 100%;
			padding: 0 20px;

			.title {
				font-size: 23px;
				font-weight: 700;
				height: 80px;
				line-height: 80px;
			}

			.comment {
				display: flex;
				gap: 20px;
				margin-bottom: 25px;
				justify-content: space-between;
			}
		}
	}
</style>
