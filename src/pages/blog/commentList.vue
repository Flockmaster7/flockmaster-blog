<template>
	<div
		class="commentList-container"
		v-infinite-scroll="getCommentList"
		:infinite-scroll-delay="500">
		<div class="title">
			全部评论
			{{ commentTotal === 0 ? '' : commentTotal }}
		</div>
		<commentItem
			:item="item"
			v-for="item in commentList"
			:key="item.id"></commentItem>
		<zb-empty v-if="commentList.length === 0" :height="400"></zb-empty>
		<div @click="() => getCommentList()">
			<zb-loadMore
				v-if="isLoadMore"
				direction="center"
				:isLoading="isLoading"></zb-loadMore>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import commentItem from './commentItem.vue';
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';

	// interface PropsType {
	// }

	// interface EmitsType {
	// }

	// const props = defineProps<PropsType>();
	// const emits = defineEmits<EmitsType>();

	const currentPage = ref(0);
	const isLoadMore = ref(true);
	const isLoading = ref(false);

	const { blog } = useStore();
	const { blogDeatil, commentList, commentTotal } = storeToRefs(blog);

	const getCommentList = async (newStart?: boolean) => {
		if (newStart) {
			currentPage.value = 0;
		}
		isLoading.value = true;
		currentPage.value += 1;
		const res = await blog.getComment(
			blogDeatil.value.id,
			currentPage.value,
			9
		);
		isLoading.value = false;
		if (!res) {
			isLoadMore.value = false;
		}
	};
</script>

<style lang="scss" scoped>
	.commentList-container {
		.title {
			font-size: 21px;
			font-weight: 700;
			height: 80px;
			line-height: 80px;
		}
	}
</style>
