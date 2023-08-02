<template>
	<div class="photo-container">
		<div
			class="photo-list"
			v-infinite-scroll="loadMore"
			:infinite-scroll-disabled="isLoadMore"
			:infinite-scroll-delay="600">
			<div class="img" v-for="item in photoList" :key="item.id">
				<img v-lazy="imgUrl(item.photo_url)" alt="" />
			</div>
		</div>
		<zb-load-more
			v-if="!isLoadMore"
			:isLoading="isLoading"
			direction="center"
			:isLoadMore="!isLoadMore"></zb-load-more>
	</div>
</template>

<script setup lang="ts">
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';
	import { imgUrl } from '@/utils/common';
	import { useRoute } from 'vue-router';
	import { computed, onMounted } from 'vue';
	import useInfiniteScroll from '@/hooks/useInfiniteScroll';

	const route = useRoute();
	const id = route.query.id;

	const { album } = useStore();
	const { photoList, photoTotal } = storeToRefs(album);

	// 获取图片
	const getPhoto = async (pageNum: number) => {
		const res = await album.getPhotoList(Number(id), pageNum, 21);
		return res;
	};

	const { isLoading, loadMore } = useInfiniteScroll(getPhoto);

	// const pageNum = ref(1);
	// const isLoading = ref(false);
	// const loadMore = async () => {
	// 	isLoading.value = true;
	// 	const isSuccess = await album.getPhotoList(
	// 		Number(id),
	// 		pageNum.value,
	// 		12
	// 	);
	// 	if (isSuccess) {
	// 		isLoading.value = false;
	// 		pageNum.value += 1;
	// 		console.log(pageNum.value);
	// 	}
	// };

	const isLoadMore = computed(
		() => photoTotal.value <= photoList.value.length
	);

	onMounted(async () => {
		loadMore();
	});
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.photo-list {
			column-count: 2 !important;
		}
	}
	.photo-container {
		padding: 10px 0;
		width: 100%;
		.photo-list {
			column-count: 4;
			column-gap: 5px;
		}
	}
</style>
