<template>
	<div class="work-item">
		<div class="title">{{ work.title }}</div>
		<div class="des">{{ work.des }}</div>
	</div>
</template>

<script setup lang="ts">
	import { GetWorkListResType } from '@/types';

	interface PropType {
		work: GetWorkListResType;
	}

	const props = defineProps<PropType>();
</script>

<style lang="scss" scoped>
	.work-item {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 855px;
		height: 300px;
		border-radius: 10px;
		background-image: url('@/static/images/test_blog_img.png');
		background-size: cover;
		background-repeat: no-repeat;
		gap: 20px;
		.title {
			font-size: 40px;
			font-weight: 600;
		}

		.des {
			font-size: 35px;
			font-weight: 400;
		}
	}

	.work-item:hover {
		cursor: pointer;
	}
</style>
