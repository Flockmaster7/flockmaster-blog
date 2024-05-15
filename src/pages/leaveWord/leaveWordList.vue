<template>
	<div
		class="list"
		:infinite-scroll-disabled="!isLoadMore"
		v-infinite-scroll="loadMore"
		:infinite-scroll-delay="600">
		<el-skeleton animated :loading="pageNum === 1 && isLoading">
			<template #template>
				<LeaveWordSkeleton></LeaveWordSkeleton>
			</template>
			<template #default>
				<div
					class="comment"
					v-for="item in leaveWordList"
					:key="item.id">
					<leaveWordItem
						type="leaveWord"
						:item="item"
						@getCommentList="getLeaveWordList"></leaveWordItem>
				</div>
			</template>
		</el-skeleton>
	</div>
	<zb-load-more
		v-if="leaveWordList.length !== 0"
		:isLoading="isLoading"
		direction="center"
		:isLoadMore="isLoadMore"></zb-load-more>
	<zb-empty v-else :height="400"></zb-empty>
</template>

<script setup lang="ts">
	import useInfiniteScroll from '@/hooks/useInfiniteScroll';
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';
	import { computed } from 'vue';

	const { leaveWord } = useStore();
	const { leaveWordList, leaveWordTotal } = storeToRefs(leaveWord);

	const getLeaveWordList = async (pageNum: number) => {
		const res = await leaveWord.getLeaveWord(pageNum, 9);
		return res;
	};
	const { isLoading, loadMore, pageNum } =
		useInfiniteScroll(getLeaveWordList);

	const isLoadMore = computed(() => {
		return leaveWordTotal.value > leaveWordList.value.length;
	});
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.list {
			.title {
				font-size: 20px !important;
			}
		}
	}

	.list {
		width: 100%;

		.comment {
			display: flex;
			gap: 20px;
			margin-bottom: 25px;
			justify-content: space-between;
		}
	}
</style>
