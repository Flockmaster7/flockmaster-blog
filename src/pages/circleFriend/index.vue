<template>
	<div class="circleFriend-container">
		<div
			class="circleFriend-list"
			:infinite-scroll-disabled="!isLoadMore"
			v-infinite-scroll="loadMore"
			:infinite-scroll-delay="600">
			<CircleFriendItem
				:cirFriend="item"
				v-for="item in circleFriendList"
				:key="item.id"></CircleFriendItem>
		</div>
		<zb-load-more
			v-if="circleFriendList.length !== 0"
			:isLoading="isLoading"
			direction="center"
			:isLoadMore="isLoadMore"></zb-load-more>
		<zb-empty
			:height="500"
			v-if="circleFriendList.length === 0 && !isLoading" />
	</div>
</template>

<script setup lang="ts">
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';
	import CircleFriendItem from './circleFriendItem.vue';
	import useInfiniteScroll from '@/hooks/useInfiniteScroll';
	import { computed } from 'vue';
	const { circleFriend } = useStore();

	const { circleFriendList, circleFriendTotal } = storeToRefs(circleFriend);

	circleFriend.getUserDianzan();

	// 无线滚动加载
	const getCircleFriends = async (pageNum: number) => {
		const res = await circleFriend.getList(pageNum, 9);
		return res;
	};
	const { isLoading, loadMore } = useInfiniteScroll(getCircleFriends);
	const isLoadMore = computed(() => {
		return circleFriendTotal.value > circleFriendList.value.length;
	});
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.circleFriend-container {
			min-height: calc(100vh - 275px);
			padding: 0 16px !important;
		}
	}

	.circleFriend-container {
		padding: 20px 105px 0;
	}
</style>
