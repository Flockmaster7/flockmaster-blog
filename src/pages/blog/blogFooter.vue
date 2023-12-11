<template>
	<div class="blogFooter-container">
		标签：
		<div class="tag-list">
			<el-tag
				color="#5cbfef"
				v-for="(item, index) in blogDeatil.tags"
				:key="item.id"
				>{{ item.tag_name }}</el-tag
			>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Blog } from '@/types';

	interface PropsType {
		blogDeatil: Blog;
	}

	defineProps<PropsType>();
</script>

<style lang="scss" scoped>
	.blogFooter-container {
		display: flex;
		align-items: center;
		height: 60px;

		.tag-list {
			display: flex;
			gap: 8px;
			margin-left: 10px;
		}
	}
</style>
