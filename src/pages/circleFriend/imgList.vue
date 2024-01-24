<template>
	<div class="imgList-container">
		<el-image
			class="singleImg"
			v-if="urls.length === 1"
			:src="urls[0]"
			:preview-src-list="urls"
			:hide-on-click-modal="true"
			:preview-teleported="true"
			alt="" />
		<el-image
			class="multiImg"
			v-else
			:src="url"
			v-for="(url, index) in urls"
			:preview-src-list="urls"
			:initial-index="index"
			:hide-on-click-modal="true"
			:preview-teleported="true"
			:key="index" />
	</div>
</template>

<script lang="ts" setup>
	interface PropsType {
		urls: string[];
	}

	defineProps<PropsType>();
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.imgList-container {
			gap: 5px !important;
			.multiImg {
				width: 32% !important;
				height: 23.7vw !important;
			}
		}
	}

	.imgList-container {
		max-width: 100%;
		gap: 8px;
		display: flex;
		flex-wrap: wrap;

		.singleImg {
			max-width: 100%;
			object-fit: cover;
		}

		.multiImg {
			width: 150px;
			height: 150px;
			object-fit: cover;
		}
	}
</style>
