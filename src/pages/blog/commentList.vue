<template>
	<div class="commentList-container">
		<div class="title">
			全部评论
			{{ commentTotal === 0 ? '' : commentTotal }}
			<el-button
				:loading-icon="Refresh"
				:loading="isLoading"
				@click="loadMore(true)">
				刷新
			</el-button>
		</div>
		<div
			class="comment-list"
			:infinite-scroll-disabled="!isLoadMore"
			v-infinite-scroll="loadMore"
			:infinite-scroll-delay="500">
			<commentItem
				v-for="item in commentList"
				:item="item"
				:key="item.id"></commentItem>
		</div>
		<zb-load-more
			v-if="commentList.length !== 0"
			:isLoading="isLoading"
			direction="center"
			:isLoadMore="isLoadMore"></zb-load-more>
		<zb-empty v-else></zb-empty>
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import commentItem from './commentItem.vue';
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';
	import { Refresh } from '@element-plus/icons-vue';
	import useInfiniteScroll from '@/hooks/useInfiniteScroll';
	import zbLoadMore from '@/components/common/zb-loadMore.vue';

	// interface PropsType {
	// }

	// interface EmitsType {
	// }

	// const props = defineProps<PropsType>();
	// const emits = defineEmits<EmitsType>();

	const { blog } = useStore();
	const { blogDeatil, commentList, commentTotal, commentCount } =
		storeToRefs(blog);

	const getCommentList = async (pageNum: number) => {
		const res = await blog.getComment(blogDeatil.value.id, pageNum, 9);
		return res;
	};
	const { loadMore, isLoading } = useInfiniteScroll(getCommentList);
	const isLoadMore = computed(
		() => commentCount.value > commentList.value.length
	);
</script>

<style lang="scss" scoped>
	.commentList-container {
		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 21px;
			font-weight: 700;
			height: 80px;
			line-height: 80px;
		}
	}
</style>
