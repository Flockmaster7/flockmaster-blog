<template>
	<!-- <el-card> -->
	<div class="album-container">
		<div class="album-bg">
			<span class="album-bg-title">相册</span>
		</div>
		<div
			class="album-content"
			v-infinite-scroll="loadMore"
			:infinite-scroll-disabled="isLoadMore">
			<div v-for="item in albumList" :key="item.id">
				<zb-album-item :album="item"></zb-album-item>
			</div>
		</div>
		<zb-load-more
			v-if="!isLoadMore"
			:isLoading="isLoading"
			:isLoadMore="!isLoadMore"></zb-load-more>
	</div>
	<!-- </el-card> -->
</template>

<script setup lang="ts">
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';
	import { computed, onMounted, ref } from 'vue';
	import zbAlbumItem from './components/zb-album-item.vue';
	import ZbLoadMore from '@/components/common/zb-loadMore.vue';

	const { album } = useStore();
	const { albumList, albumTotal } = storeToRefs(album);

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
			console.log(pageNum.value);
		}
	};

	onMounted(async () => {
		loadMore();
	});
</script>

<style lang="scss" scoped>
	.album-container {
		min-height: 700px;
		display: flex;
		background: var(--card-reset-bg);
		justify-content: center;
		align-items: center;
		flex-direction: column;
		flex-wrap: wrap;
		gap: 20px;

		.album-bg {
			width: 100%;
			height: 300px;
			background: url('../../static/images/admin_bg.png');
			background-size: cover;
			display: flex;
			justify-content: center;
			align-items: center;

			&-title {
				font-weight: 700;
				font-size: 30px;
			}
		}

		.album-content {
			display: grid;
			grid-template-columns: repeat(4, 165px);
			grid-column-gap: 20px;
			grid-row-gap: 15px;
		}
	}
</style>
