<template>
	<div class="blog-container">
		<div
			v-for="(item, index) in blogList"
			:key="item.id"
			@click="gotoBlogDetail(item.id)"
			class="item">
			<zbBlogItemRectangleMobile
				:blog="item"
				v-if="isMobile"></zbBlogItemRectangleMobile>
			<zbBlogItemRectangle
				:blog="item"
				v-if="!isMobile"></zbBlogItemRectangle>
		</div>
		<div class="pagination">
			<el-pagination
				v-model:current-page="pageNum"
				v-model:page-size="pageSize"
				:page-sizes="[9, 12, 15, 18, 36]"
				:background="true"
				layout="sizes, prev, pager, next"
				:total="blogTotal"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { onMounted, ref, watch } from 'vue';
	import { useBlogStore } from '@/store/blog';
	import { storeToRefs } from 'pinia';
	import zbBlogItemFlexible from '@/pages/home/components/blogItem-flexible.vue';
	import zbBlogItemRectangle from '@/pages/home/components/blogItem-rectangle.vue';
	import zbBlogItemRectangleMobile from '@/pages/home/components/blogItem-rectangle-mobile.vue';
	import { useRouter } from 'vue-router';
	import usePagination from '@/hooks/usePagination';
	import useIsMobile from '@/hooks/useIsMobile';
	import { useCommonStore } from '@/store/common';
	import { useUserStore } from '@/store/user';

	const store = useBlogStore();
	const router = useRouter();

	const { blogList, blogTotal, getBlogListParams } = storeToRefs(store);

	const { pageNum, pageSize, handleSizeChange, handleCurrentChange } =
		usePagination(getBlogListParams.value, store.getBlogList);

	// 获取设备
	useIsMobile();
	const commonStore = useCommonStore();
	const { isMobile } = storeToRefs(commonStore);

	const userStore = useUserStore();

	onMounted(() => {
		userStore.getUserProfile();
		store.getBlogList(
			pageNum.value,
			pageSize.value,
			getBlogListParams.value
		);
	});

	const gotoBlogDetail = (id: number) => {
		router.push('/blog/detail?id=' + id);
	};
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.blog-container {
			padding: 20px 0 !important;
		}
	}
	.blog-container {
		padding: 20px 15px;
		background-color: $white;
		// margin: 15px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		gap: 10px;

		.item {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 30px;

		:deep(.el-pagination.is-background .el-pager li.is-active) {
			background-color: $themeColor;
		}
	}
</style>
