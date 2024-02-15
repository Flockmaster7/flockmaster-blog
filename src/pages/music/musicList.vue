<template>
	<zb-card title="歌单" titleSize="24">
		<div class="music-list">
			<div
				class="music-item"
				v-for="(item, index) in musicConfig"
				:key="item.url"
				@click="changeMusic(index)">
				<div class="music-info">
					<zb-image
						:src="item.cover"
						:style="{ width: 50 + 'px', height: 50 + 'px' }">
					</zb-image>
					{{ item.name }}
				</div>
				<div class="music-info">{{ item.artist }}</div>
			</div>
		</div>
	</zb-card>
</template>

<script setup lang="ts">
	import musicConfig from '@/config/music';
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';

	const { music } = useStore();

	const { currentIndex, isPlay } = storeToRefs(music);

	const changeMusic = (index: number) => {
		isPlay.value = true;
		currentIndex.value = index;
	};
</script>

<style lang="scss" scoped>
	@import '../../static/css/mixins.scss';

	.music-list {
		@include flex-center(6px);
		flex-wrap: wrap;
	}
	.music-item {
		@include flex-between(15px);
		box-sizing: border-box;
		padding: 10px 20px;
		width: 100%;
		height: 60px;
		border-radius: 8px;
		background: var(--theme-card-bg-color);

		.music-info {
			@include flex-center(8px);
			color: var(--theme-text-3);
		}

		&:hover {
			background: var(--theme-data-show);
			cursor: pointer;
		}
	}
</style>
