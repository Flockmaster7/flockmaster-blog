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
	import type { AlbumType } from '@/types/index.d.ts';
	interface PropsType {
		album: AlbumType;
	}

	defineProps<PropsType>();
</script>

<style lang="scss" scoped>
	.album-item {
		position: relative;
		width: 100%;
		height: 200px;
		background-color: var(--theme-color);
		border-radius: 10px;

		.img {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border-radius: 20px;
			background-size: cover;
			background-repeat: no-repeat;
		}

		.title {
			position: absolute;
			top: 45%;
			left: 50%;
			transform: translateX(-50%);
			font-size: 30px;
			opacity: 0.8;
			transition: all 1s linear;
			font-weight: 700;
			color: aliceblue;
		}

		.des {
			position: absolute;
			top: 50%;
			left: 0%;
			transform: translateX(-50%);
			font-size: 24px;
			color: rgb(216, 217, 219);
			font-weight: 500;
			opacity: 0;
			transition: all 1s linear;
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
			filter: brightness(0.3);
		}
	}
</style>
