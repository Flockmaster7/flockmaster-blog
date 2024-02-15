<template>
	<div class="blogFooter-container">
		标签：
		<div class="tag-list">
			<zb-tag
				v-for="(item, index) in blogDeatil.tags"
				:color="tagPropMap[Number(item.tag_classify)].color"
				size="small"
				:key="item.id"
				>{{ item.tag_name }}</zb-tag
			>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Blog } from '@/types';
	import { tagPropMap } from '@/config/tag';
	import zbTag from '@/components/common/zb-tag.vue';

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
