<template>
	<div class="container">
		<el-card v-for="(item, index) in blogList" :key="item.id">
			<blog-item :blog="item"></blog-item>
		</el-card>
	</div>
</template>

<script setup lang="ts">
	import { onMounted } from 'vue';
	import { useBlogStore } from '@/store/blog';
	import { storeToRefs } from 'pinia';
	import blogItem from '@/pages/home/components/blogItem.vue';
	const store = useBlogStore();

	const { blogList } = storeToRefs(store);

	onMounted(() => {
		store.getBlogList(1, 10, {
			author: 'flockmaster'
		});
	});
</script>

<style lang="scss" scoped>
	.el-card {
		width: 868px;
	}
	.container {
		margin: 15px;
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
</style>
