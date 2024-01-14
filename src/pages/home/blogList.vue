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
					<div
						v-for="item in blogList"
						:key="item.id"
						@click="gotoBlogDetail(item.id)"
						class="item">
						<zbBlogItemRectangleMobile
							:blog="(item as Blog)"
							v-if="isMobile"
							:isLoading="isLoading"></zbBlogItemRectangleMobile>
						<BlogItem
							:blog="(item as Blog)"
							v-if="!isMobile"></BlogItem>
					</div>
				</template>
			</el-skeleton>
		</div>
		<zb-load-more
			v-if="blogList.length !== 0"
			:isLoading="isLoading"
			direction="center"
			:isLoadMore="isLoadMore"></zb-load-more>
		<zb-empty v-else></zb-empty>

		<!-- <div class="pagination" v-if="blogList.length > 0">
			<el-pagination
				v-model:current-page="pageNum"
				v-model:page-size="pageSize"
				:page-sizes="[9, 12, 15, 18, 36]"
				:background="true"
				layout="sizes, prev, pager, next"
				:total="blogTotal"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange" />
		</div> -->
	</div>
</template>

<script setup lang="ts">
	import Skeleton from './homeSkeleton.vue';
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';
	import zbEmpty from '@/components/common/zb-empty.vue';
	import BlogItem from './blogItem.vue';
	import zbBlogItemRectangleMobile from '@/components/mobile/zb-blogItem-rectangle-mobile.vue';
	import { useRouter } from 'vue-router';
	import usePagination from '@/hooks/usePagination';
	import useIsMobile from '@/hooks/useIsMobile';
	import { Blog } from '@/types';
	import useInfiniteScroll from '@/hooks/useInfiniteScroll';
	import { computed, onMounted } from 'vue';

	const { blog, common } = useStore();
	const router = useRouter();

	const { blogList, blogTotal } = storeToRefs(blog);

	// const {
	// 	pageNum,
	// 	pageSize,
	// 	handleSizeChange,
	// 	handleCurrentChange,
	// 	isLoading,
	// 	getBlogListParams
	// } = usePagination(blog.getBlogList);

	// 获取设备
	useIsMobile();
	const { isMobile } = storeToRefs(common);

	const gotoBlogDetail = (id?: number) => {
		if (!id) return;
		router.push('/blog/detail?id=' + id);
	};

	// 无线滚动加载
	const getBlogs = async (pageNum: number) => {
		const res = await blog.getBlogList(pageNum, 9);
		return res;
	};
	const { isLoading, loadMore, pageNum } = useInfiniteScroll(getBlogs);
	const isLoadMore = computed(() => blogTotal.value > blogList.value.length);
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.blog-container {
			padding: 20px 0 !important;
		}
	}

	.blog-container {
		padding: 20px 40px 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
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
