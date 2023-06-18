<template>
	<div class="work-item">
		<div class="img"></div>
		<div class="title">{{ work.work_title }}</div>
		<div class="des">{{ work.work_des }}</div>
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
		position: relative;
		width: 850px;
		height: 300px;
		background-color: pink;
		border-radius: 20px;

		.img {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border-radius: 20px;
			background-image: url('@/static/images/test_blog_img.png');
			background-size: cover;
			background-repeat: no-repeat;
		}

		.title {
			position: absolute;
			top: 0%;
			left: 50%;
			transform: translateX(-50%);
			font-size: 30px;
			opacity: 0;
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

	.work-item:hover {
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
