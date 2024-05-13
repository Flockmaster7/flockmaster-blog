<template>
	<div class="blog-container">
		<div
			class="blog-list"
			:infinite-scroll-disabled="!isLoadMore"
			v-infinite-scroll="loadMore"
			:infinite-scroll-delay="600">
			<el-skeleton animated :loading="pageNum === 1 && isLoading">
				<template #template>
					<Skeleton></Skeleton>
				</template>
				<template #default>
					<div v-for="item in blogList" :key="item.id" class="item">
						<BlogItem :blog="(item as Blog)"></BlogItem>
					</div>
				</template>
			</el-skeleton>
		</div>
		<zb-load-more
			v-if="blogList.length !== 0"
			:isLoading="isLoading"
			direction="center"
			:isLoadMore="isLoadMore"></zb-load-more>
		<zb-empty v-if="blogList.length === 0 && !isLoading"></zb-empty>
	</div>
</template>

<script setup lang="ts">
	import Skeleton from './homeSkeleton.vue';
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';
	import zbEmpty from '@/components/common/zb-empty.vue';
	import BlogItem from './blogItem.vue';
	import { Blog, BlogListForm } from '@/types';
	import useInfiniteScroll from '@/hooks/useInfiniteScroll';
	import { computed, watch } from 'vue';

	const { blog } = useStore();

	const { blogList, blogTotal, filter } = storeToRefs(blog);

	// 无线滚动加载
	const getBlogs = async (pageNum: number) => {
		const wrapper: Partial<BlogListForm> = {};
		if (filter.value === 'time') {
			wrapper.order = 'DESC';
		} else {
			wrapper.orderByRead = true;
		}
		const res = await blog.getBlogList(pageNum, 9, wrapper);
		return res;
	};

	watch(filter, () => {
		// 筛选后重置滚动条
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
		loadMore(true);
	});

	const { isLoading, loadMore, pageNum } = useInfiniteScroll(getBlogs);
	const isLoadMore = computed(() => blogTotal.value > blogList.value.length);
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.blog-container {
			padding: 0 10px !important;
		}
	}

	.blog-container {
		padding: 20px 40px 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-wrap: wrap;
		gap: 10px;
		position: relative;

		.blog-list {
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 10px;
			.item {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				content-visibility: auto;
			}
		}
	}

	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 30px;
	}
</style>
