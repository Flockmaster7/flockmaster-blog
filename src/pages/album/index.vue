<template>
	<!-- <el-card> -->
	<div class="album-container">
		<!-- <div class="album-bg">
			<span class="album-bg-title">相册</span>
		</div> -->
		<div
			v-infinite-scroll="loadMore"
			:infinite-scroll-disabled="isLoadMore"
			:infinite-scroll-delay="600">
			<el-skeleton animated :loading="pageNum === 1 && isLoading">
				<template #template>
					<AlbumSkeleton></AlbumSkeleton>
				</template>
				<template #default>
					<div class="album-content">
						<div
							v-for="item in albumList"
							:key="item.id"
							@click="gotoPhoto(item)">
							<zb-album-item :album="item"></zb-album-item>
						</div>
					</div>
				</template>
			</el-skeleton>
		</div>
		<zb-load-more
			v-if="!isLoadMore && albumList.length > 0"
			:isLoading="isLoading"
			:isLoadMore="!isLoadMore"></zb-load-more>
		<zb-empty :height="500" v-if="albumList.length === 0"></zb-empty>
	</div>
	<!-- </el-card> -->
</template>

<script setup lang="ts">
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';
	import { computed, onMounted, ref } from 'vue';
	import zbAlbumItem from './albumItem.vue';
	import ZbLoadMore from '@/components/common/zb-loadMore.vue';
	import AlbumSkeleton from './albumSkeleton.vue';
	import { useRouter } from 'vue-router';
	import { Album } from '@/types';

	const { album } = useStore();
	const { albumList, albumTotal } = storeToRefs(album);

	const router = useRouter();

	// 加载
	const pageNum = ref(1);
	const isLoading = ref(false);
	const isLoadMore = computed(
		() => albumTotal.value <= albumList.value.length
	);
	const loadMore = async () => {
		isLoading.value = true;
		const isSuccess = await album.getAlbumList(pageNum.value, 12);
		if (isSuccess) {
			isLoading.value = false;
			pageNum.value += 1;
		}
	};
	// 跳转到图片
	const gotoPhoto = (item: Album) => {
		router.push(`/photo?id=${item.id}&album=${item.album_name}`);
	};

	onMounted(async () => {
		loadMore();
	});
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.album-container {
			min-height: calc(100vh - 275px);
			margin: 20px 0 !important;
			.album-content {
				grid-template-columns: repeat(2, 160px) !important;
				grid-column-gap: 16px !important;
			}
		}
	}
	.album-container {
		display: flex;
		// background: var(--card-reset-bg);
		align-items: center;
		flex-direction: column;
		flex-wrap: wrap;
		gap: 20px;
		margin: 40px 0;

		.album-bg {
			width: 100%;
			height: 300px;
			background: url('../../static/images/album_bg.png');
			background-size: cover;
			display: flex;
			justify-content: center;
			align-items: center;

			&-title {
				font-weight: 700;
				font-size: 30px;
				color: $white;
			}
		}

		.album-content {
			display: grid;
			grid-template-columns: repeat(2, 330px);
			grid-column-gap: 40px;
			grid-row-gap: 20px;
		}
	}
</style>
