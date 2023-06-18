<template>
	<div class="container">
		<div v-for="(item, index) in blogList" :key="item.id">
			<div @click="gotoBlogDetail(item.id)" class="item">
				<zbBlogItem :blog="item"></zbBlogItem>
			</div>
		</div>
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
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import { useBlogStore } from '@/store/blog';
	import { storeToRefs } from 'pinia';
	import zbBlogItem from '@/components/item/zb-blogItem.vue';
	import { useRouter } from 'vue-router';
	import usePagination from '@/hooks/usePagination';

	const store = useBlogStore();
	const router = useRouter();
	const { pageNum, pageSize, handleSizeChange, handleCurrentChange } =
		usePagination(
			{
				author: 'flockmaster'
			},
			store.getBlogList
		);

	const { blogList, blogTotal } = storeToRefs(store);

	onMounted(() => {
		store.getBlogList(pageNum.value, pageSize.value, {
			author: 'flockmaster'
		});
	});

	const gotoBlogDetail = (id: number) => {
		router.push('/blog/detail?id=' + id);
	};
</script>

<style lang="scss" scoped>
	.container {
		padding: 20px 0;
		background-color: $white;
		margin: 15px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		gap: 30px;

		.item {
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
