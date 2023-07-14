<template>
	<div class="searchResult-container">
		<zb-search-area></zb-search-area>
		<div class="blog-area" v-show="!isLoading && blogList.length > 0">
			<div
				class="item"
				v-for="(item, index) in blogList"
				:key="item.id"
				@click="gotoBlogDetail(item.id)">
				<zbSearchResultBlogItem :blog="item"></zbSearchResultBlogItem>
			</div>
		</div>
		<zb-empty :height="500" v-show="blogList.length === 0"></zb-empty>
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
	import { useRoute, useRouter } from 'vue-router';
	import { useBlogStore } from '@/store/blog';
	import { storeToRefs } from 'pinia';
	import { onMounted, ref } from 'vue';
	import zbSearchArea from '@/pages/searchResult/components/zb-search-area.vue';
	import zbSearchResultBlogItem from './components/zb-searchResult-blogItem.vue';
	import zbLoading from '@/components/common/zb-loading.vue';
	import { useCommonStore } from '@/store/common';
	import zbEmpty from '@/components/common/zb-empty.vue';

	const blogStore = useBlogStore();
	const { blogList, blogTotal } = storeToRefs(blogStore);

	const route = useRoute();
	const router = useRouter();

	const commonStore = useCommonStore();
	const { isLoading } = storeToRefs(commonStore);

	const query = route.query.query as string;

	onMounted(() => {
		getBlogList(pageNum.value, pageSize.value);
	});

	// 获取博客列表
	const getBlogList = async (pageNum: number, pageSize: number) => {
		await blogStore.getBlogList(pageNum, pageSize);
	};

	// 跳转到详情页
	const gotoBlogDetail = (id: number) => {
		router.push('/blog/detail?id=' + id);
	};

	// 分页器
	const pageNum = ref(1);
	const pageSize = ref(9);

	const handleSizeChange = (val: number) => {
		pageSize.value = val;
		getBlogList(pageNum.value, pageSize.value);
	};
	const handleCurrentChange = (val: number) => {
		pageNum.value = val;
		getBlogList(pageNum.value, pageSize.value);
	};
</script>

<style lang="scss" scoped>
	.searchResult-container {
		width: 100%;
		height: 100%;
		background-color: var(--theme-card-color);

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
