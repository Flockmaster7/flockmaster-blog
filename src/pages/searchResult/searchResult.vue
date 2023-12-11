<template>
	<div class="searchResult-container">
		<zb-search-area @getSearchBlog="getBlogList"></zb-search-area>
		<div class="blog-area" v-show="!isLoading && blogList.length > 0">
			<div
				class="item"
				v-for="item in blogList"
				:key="item.id"
				@click="gotoBlogDetail(item.id)">
				<div class="result-item-pc">
					<zbSearchResultBlogItem
						:blog="(item as Blog)"></zbSearchResultBlogItem>
				</div>
				<div class="result-item-mobile">
					<zbSearchResultBlogItemMobile
						:blog="(item as Blog)"></zbSearchResultBlogItemMobile>
				</div>
			</div>
		</div>
		<zb-empty
			:height="500"
			v-show="!isLoading && blogList.length === 0"></zb-empty>
		<div class="loading" v-show="isLoading">
			<zb-loading></zb-loading>
		</div>
		<div class="pagination" v-if="!isLoading && blogList.length > 0">
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
	import { useRouter } from 'vue-router';
	import { Blog } from '@/types';
	import { storeToRefs } from 'pinia';
	import { onMounted } from 'vue';
	import zbSearchArea, {
		ParamsType
	} from '@/pages/searchResult/components/zb-search-area.vue';
	import zbSearchResultBlogItem from './components/zb-searchResult-blogItem.vue';
	import zbSearchResultBlogItemMobile from './components/zb-searchResult-blogItem-mobile.vue';
	import zbLoading from '@/components/common/zb-loading.vue';
	import zbEmpty from '@/components/common/zb-empty.vue';
	import usePagination from '@/hooks/usePagination';
	import useStore from '@/store';

	const { blog } = useStore();
	const { blogList, blogTotal } = storeToRefs(blog);

	const {
		pageNum,
		pageSize,
		handleSizeChange,
		handleCurrentChange,
		isLoading,
		getBlogListParams
	} = usePagination(blog.getBlogList);

	const router = useRouter();

	onMounted(() => {});

	// 获取博客列表
	const getBlogList = async (data?: ParamsType) => {
		if (data) {
			getBlogListParams.value = data;
		}
		handleCurrentChange(1);
	};

	// 跳转到详情页
	const gotoBlogDetail = (id?: number) => {
		if (!id) return;
		router.push('/blog/detail?id=' + id);
	};
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.result-item-mobile {
			display: block !important;
		}
		.result-item-pc {
			display: none !important;
		}
	}

	.result-item-mobile {
		display: none;
	}

	.searchResult-container {
		width: 100%;
		height: 100%;
		// background-color: var(--theme-card-color);
		background: var(--card-reset-bg);

		.blog-area {
			box-sizing: border-box;
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 10px;
			padding: 15px 15px 0;
			overflow: hidden;

			.item {
				width: 100%;
			}
		}

		.pagination {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 30px;
		}
	}
</style>
