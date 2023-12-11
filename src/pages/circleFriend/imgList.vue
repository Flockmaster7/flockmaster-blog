<template>
	<div class="imgList-container">
		<el-image
			class="singleImg"
			v-if="urls.length === 1"
			:src="urls[0]"
			:preview-src-list="urls"
			alt="" />
		<el-image
			class="multiImg"
			v-else
			:src="url"
			v-for="(url, index) in urls"
			:preview-src-list="urls"
			:initial-index="index"
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
	.imgList-container {
		max-width: 100%;
		gap: 8px;
		display: flex;
		flex-wrap: wrap;
		// padding: 3px;

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
