<template>
	<el-card>
		<div id="markdown"></div>
		<v-md-preview :text="content"></v-md-preview>
	</el-card>
</template>

<script setup lang="ts">
	import { onMounted, ref, toRaw } from 'vue';
	import { useBlogStore } from '@/store/blog';
	import { storeToRefs } from 'pinia';
	import { useRoute } from 'vue-router';

	const store = useBlogStore();
	const { blogDeatil } = storeToRefs(store);
	const route = useRoute();
	console.log();

	const content = ref('');
	const id = route.query.id!;

	onMounted(() => {
		store.getBlogDetail(Number(id));
		// console.log(blogDeatil.value.content_html);
		setTimeout(() => {
			content.value = blogDeatil.value.content_html;
		}, 150);
	});
</script>

<style lang="scss" scoped>
	.el-card {
		margin-top: 15px;
	}
</style>
