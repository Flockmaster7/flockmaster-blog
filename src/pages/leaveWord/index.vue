<template>
	<div class="leaveWord-container">
		<div class="title">
			<span
				>全部留言 {{ leaveWordTotal === 0 ? '' : leaveWordTotal }}</span
			>
			<el-button link :icon="Edit" @click="openAdd">留言</el-button>
		</div>
		<div
			class="list"
			:infinite-scroll-disabled="!isLoadMore"
			v-infinite-scroll="loadMore"
			:infinite-scroll-delay="600">
			<div
				class="comment"
				v-for="(item, index) in leaveWordList"
				:key="item.id">
				<leaveWordItem
					type="leaveWord"
					:item="item"
					@getCommentList="getLeaveWordList"></leaveWordItem>
			</div>
		</div>
		<zb-load-more
			v-if="leaveWordList.length !== 0"
			:isLoading="isLoading"
			direction="center"
			:isLoadMore="isLoadMore"></zb-load-more>
		<zb-empty v-else :height="400"></zb-empty>

		<el-dialog v-model="dialogVisible" title="留言" draggable>
			<addLeaveWord @closeDialog="closeDialog"></addLeaveWord>
		</el-dialog>

		<el-drawer
			title="留言"
			v-model="drawerVisible"
			size="100%"
			direction="btt"
			:lock-scroll="false">
			<addLeaveWord @closeDialog="closeDialog"></addLeaveWord>
		</el-drawer>
	</div>
</template>

<script setup lang="ts">
	import { storeToRefs } from 'pinia';
	import { computed, ref } from 'vue';
	import { Edit } from '@element-plus/icons-vue';

	import leaveWordItem from './leaveWordItem.vue';
	import addLeaveWord from './addLeaveWord.vue';
	import useInfiniteScroll from '@/hooks/useInfiniteScroll';
	import useStore from '@/store';

	const { leaveWord, common } = useStore();
	const { leaveWordList, leaveWordTotal } = storeToRefs(leaveWord);
	const { isMobile } = storeToRefs(common);

	const getLeaveWordList = async (pageNum: number) => {
		const res = await leaveWord.getLeaveWord(pageNum, 9);
		return res;
	};
	const { isLoading, loadMore } = useInfiniteScroll(getLeaveWordList);

	const isLoadMore = computed(() => {
		return leaveWordTotal.value > leaveWordList.value.length;
	});

	// 留言
	const drawerVisible = ref(false);
	const dialogVisible = ref(false);
	const openAdd = () => {
		if (isMobile.value) {
			drawerVisible.value = !drawerVisible.value;
		} else {
			dialogVisible.value = !dialogVisible.value;
		}
	};

	const closeDialog = async () => {
		// 重新获取留言
		await getLeaveWordList(1);
		dialogVisible.value = false;
		drawerVisible.value = false;
	};
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.leaveWord-container {
			min-height: calc(100vh - 275px);
			padding: 0px 15px !important;
			.leaveWord-title {
				font-size: 25px !important;
			}
		}

		.list {
			.title {
				font-size: 20px !important;
			}
		}
	}
	.leaveWord-container {
		box-sizing: border-box;
		padding: 20px 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		.title {
			width: 100%;
			font-size: 23px;
			font-weight: 700;
			height: 100px;
			line-height: 100px;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.list {
			width: 100%;
			padding: 0 20px;

			.comment {
				display: flex;
				gap: 20px;
				margin-bottom: 25px;
				justify-content: space-between;
			}
		}
	}
</style>
