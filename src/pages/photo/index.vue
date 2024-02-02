<template>
	<div class="photo-container">
		<div
			class="photo-list"
			v-infinite-scroll="loadMore"
			:infinite-scroll-disabled="isLoadMore"
			:infinite-scroll-delay="600">
			<div class="img" v-for="item in photoList" :key="item.id">
				<zb-image
					:src="item.photo_url"
					:style="{ height: 200 + 'px' }" />
			</div>
		</div>
		<zb-empty :height="500" v-if="photoList.length === 0"></zb-empty>
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
	import { useRoute } from 'vue-router';
	import { computed } from 'vue';
	import useInfiniteScroll from '@/hooks/useInfiniteScroll';

	const route = useRoute();
	const id = route.query.id;
	const albumName = route.query.album;

	const { album } = useStore();
	const { photoList, photoTotal } = storeToRefs(album);

	// 获取图片
	const getPhoto = async (pageNum: number) => {
		const res = await album.getPhotoList(Number(id), pageNum, 21);
		return res;
	};

	const { isLoading, loadMore } = useInfiniteScroll(getPhoto);

	const isLoadMore = computed(
		() => photoTotal.value <= photoList.value.length
	);
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.photo-container {
			min-height: calc(100vh - 275px);

			.photo-list {
				column-count: 2 !important;
			}
		}
	}
	.photo-container {
		width: 100%;
		.photo-bg {
			width: 100%;
			height: 330px;
			background: url('../../static/images/photo_bg.png');
			background-size: cover;
			background-repeat: no-repeat;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 15px;

			&-title {
				font-weight: 700;
				font-size: 40px;
				color: $white;
			}
		}
		.photo-list {
			column-count: 4;
			column-gap: 5px;
			padding: 10px;

			.img {
				img {
					width: 100%;
					object-fit: cover;
				}
			}
		}
	}
</style>
