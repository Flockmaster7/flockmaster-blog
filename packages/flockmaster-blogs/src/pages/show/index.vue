<template>
	<div class="container">
		<div v-for="(item, index) in blogList" :key="item.id">
			<div @click="gotoBlogDetail(item.id)" class="item">
				<!-- <zbBlogItem :blog="item"></zbBlogItem> -->
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { onMounted } from 'vue';
	import { useBlogStore } from '@/store/blog';
	import { storeToRefs } from 'pinia';
	// import zbBlogItem from '@/components/item/zb-blogItem.vue';
	import { useRouter } from 'vue-router';

	const store = useBlogStore();
	const router = useRouter();

	const { blogList } = storeToRefs(store);

	onMounted(() => {
		store.getBlogList(1, 10, {
			author: 'flockmaster',
			classify: '1'
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
</style>
