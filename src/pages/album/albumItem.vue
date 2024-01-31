<template>
	<div class="album-item">
		<div
			class="img"
			:style="{
				backgroundImage: `url(${imgUrl(album.album_cover)})`
			}"></div>
		<span class="title">{{ album.album_name }}</span>
	</div>
</template>

<script setup lang="ts">
	import { imgUrl } from '@/utils/common';
	import type { Album } from '@/types/index.d.ts';
	interface PropsType {
		album: Album;
	}

	defineProps<PropsType>();
</script>

<style lang="scss" scoped>
	.album-item {
		width: 100%;
		height: 200px;
		background-color: var(--theme-card-bg-color);
		border-radius: 6px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;

		.img {
			width: 100%;
			height: 100%;
			border-radius: 6px;
			background-size: cover;
			background-repeat: no-repeat;
		}

		.title {
			font-size: 24px;
			font-weight: 700;
		}
	}

	.album-item:hover {
		cursor: pointer;
		.title {
			top: 30%;
			opacity: 1;
		}

		.des {
			left: 50%;
			opacity: 1;
		}

		.img {
			filter: brightness(0.7);
		}
	}
</style>
