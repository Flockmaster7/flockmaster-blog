<template>
	<div class="noticeList-container">
		<div
			class="notice-list"
			:infinite-scroll-disabled="!isLoadMore"
			v-infinite-scroll="loadMore"
			:infinite-scroll-delay="600">
			<el-skeleton animated :loading="pageNum === 1 && isLoading">
				<template #template>
					<NoticeSkeleton></NoticeSkeleton>
				</template>
				<template #default>
					<div v-for="item in noticeList" :key="item.id" class="item">
						<NoticeItem :notice="item"></NoticeItem>
					</div>
				</template>
			</el-skeleton>
		</div>
		<zb-load-more
			v-if="noticeList.length !== 0"
			:isLoading="isLoading"
			direction="center"
			:isLoadMore="isLoadMore"></zb-load-more>
		<zb-empty v-if="noticeList.length === 0 && !isLoading"></zb-empty>
	</div>
</template>

<script setup lang="ts">
	import useStore from '@/store';
	import NoticeItem from './noticeItem.vue';
	import NoticeSkeleton from './noticeSkeleton.vue';
	import { storeToRefs } from 'pinia';
	import { computed } from 'vue';
	import useInfiniteScroll from '@/hooks/useInfiniteScroll';
	import { isLogin } from '@/utils/login';

	const { notice, user } = useStore();
	const { userInfo } = storeToRefs(user);
	const { noticeList, noticeTotal } = storeToRefs(notice);

	// 无线滚动加载
	const getNotice = async (pageNum: number) => {
		if (!isLogin()) {
			return true;
		}
		const res = await notice.getNoticeList(pageNum, 20, {
			userId: userInfo.value.id
		});
		return res;
	};
	const { isLoading, loadMore, pageNum } = useInfiniteScroll(getNotice);
	const isLoadMore = computed(
		() => noticeTotal.value > noticeList.value.length
	);
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.notice-container {
			padding: 0 10px !important;
		}
	}

	.noticeList-container {
		.notice-list {
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 4px;
			.item {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				content-visibility: auto;
			}
		}
	}
</style>
