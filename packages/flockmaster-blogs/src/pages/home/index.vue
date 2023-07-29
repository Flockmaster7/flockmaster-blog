<template>
	<div class="blog-container">
		<div class="tool-card">
			<tool @getBlogList="changeClassify"></tool>
		</div>
		<div class="blog-list">
			<div
				v-for="item in blogList"
				:key="item.id"
				@click="gotoBlogDetail(item.id)"
				class="item">
				<zbBlogItemRectangleMobile
					:blog="item"
					v-if="isMobile"
					:isLoading="isLoading"></zbBlogItemRectangleMobile>
				<zbBlogItemRectangle
					:blog="item"
					v-if="!isMobile"
					:isLoading="isLoading"></zbBlogItemRectangle>
			</div>
		</div>
		<!-- <zb-loading v-show="isLoading"></zb-loading> -->
		<zb-empty
			v-if="!isLoading && blogList.length === 0"
			:height="600"></zb-empty>
		<div class="pagination" v-if="blogList.length > 0">
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
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';
	import zbEmpty from '@/components/common/zb-empty.vue';
	import zbBlogItemRectangle from '@/components/common/zb-blogItem-rectangle.vue';
	import zbBlogItemRectangleMobile from '@/components/mobile/zb-blogItem-rectangle-mobile.vue';
	import { useRouter } from 'vue-router';
	import usePagination from '@/hooks/usePagination';
	import useIsMobile from '@/hooks/useIsMobile';
	import zbLoading from '@/components/common/zb-loading.vue';
	import tool from '@/components/common/zb-classify-tool.vue';

	const { blog, common } = useStore();
	const router = useRouter();

	const { blogList, blogTotal } = storeToRefs(blog);

	const {
		pageNum,
		pageSize,
		handleSizeChange,
		handleCurrentChange,
		isLoading,
		getBlogListParams
	} = usePagination(blog.getBlogList);

	// 获取设备
	useIsMobile();
	const { isMobile } = storeToRefs(common);

	const gotoBlogDetail = (id: number) => {
		router.push('/blog/detail?id=' + id);
	};

	// 切换分类
	const changeClassify = (id: string) => {
		if (id !== '0') {
			getBlogListParams.value = {
				classify: id
			};
		} else {
			getBlogListParams.value = {};
		}
		handleCurrentChange(1);
	};
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.blog-container {
			padding: 20px 0 !important;
		}
	}

	.blog-container {
		min-height: 580px;
		padding: 20px 15px 0;
		background: var(--card-reset-bg);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 10px;
		position: relative;

		.tool-card {
			position: absolute;
			left: -110px;
		}

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
