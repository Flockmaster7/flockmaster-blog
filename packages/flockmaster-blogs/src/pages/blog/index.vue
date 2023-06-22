<template>
	<div class="container">
		<el-card>
			<div class="blog-info">
				<div class="author">{{ blogDeatil.author }}</div>
				<div class="createdAt">{{ blogDeatil.createdAt }}</div>
			</div>
		</el-card>
		<el-card>
			<div id="markdown"></div>
			<v-md-preview :text="content"></v-md-preview>
		</el-card>
	</div>
</template>

<script setup lang="ts">
	import { onMounted, ref, toRaw } from 'vue';
	import { useBlogStore } from '@/store/blog';
	import { storeToRefs } from 'pinia';
	import { useRoute } from 'vue-router';
	import { useUserStore } from '@/store/user';

	const blogStore = useBlogStore();
	const userStore = useUserStore();
	const { blogDeatil } = storeToRefs(blogStore);
	const { userInfo } = storeToRefs(userStore);
	const route = useRoute();

	const content = ref('');
	const id = route.query.id!;

	onMounted(() => {
		blogStore.getBlogDetail(Number(id));
		// console.log(blogDeatil.value.content_html);
		setTimeout(() => {
			content.value = blogDeatil.value.content_html;
		}, 150);
	});
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.el-card:first-child {
		margin-top: 15px;
	}

	.blog-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.author {
			font-size: 20px;
			font-weight: 600;
		}

		.createdAt {
			font-size: 16px;
		}
	}
</style>
