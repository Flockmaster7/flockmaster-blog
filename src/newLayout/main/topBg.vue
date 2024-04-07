<template>
	<div class="top-bg-container">
		<el-carousel
			:height="carouselHeight"
			arrow="never"
			indicator-position="none">
			<el-carousel-item v-for="item in carouselImg" :key="item">
				<el-image :src="item" fit="cover" />
			</el-carousel-item>
		</el-carousel>

		<div class="top-info">
			<div class="info">
				<p class="name">{{ admin.name }}</p>
				<div class="description">{{ admin.description }}</div>
			</div>
			<zb-image
				:src="admin.user_image"
				:style="{
					borderRadius: 8 + 'px',
					width: 50 + 'px',
					height: 50 + 'px'
				}" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import useAdminInfo from '@/hooks/useAdminInfo';
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';
	import { computed } from 'vue';

	const { common } = useStore();
	const { isMobile } = storeToRefs(common);
	const carouselHeight = computed(() => {
		return isMobile.value ? '220px' : '290px';
	});
	const carouselImg = [
		new URL('@/static/images/home_bg.jpg', import.meta.url).href,
		new URL('@/static/images/home_bg1.jpg', import.meta.url).href,
		new URL('@/static/images/home_bg2.jpg', import.meta.url).href,
		new URL('@/static/images/home_bg3.jpg', import.meta.url).href
	];

	const { admin } = useAdminInfo();
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.top-bg-container {
			height: 220px !important;

			.top-info {
				right: 16px !important;
			}
		}
	}

	.top-bg-container {
		height: 290px;
		position: relative;
		// background: url('../../static/images/home_bg.jpg') no-repeat center
		// 	center;
		// background-size: cover;

		.top-info {
			display: flex;
			gap: 10px;
			position: absolute;
			right: 60px;
			bottom: 30px;

			.info {
				display: flex;
				gap: 5px;
				justify-content: center;
				flex-direction: column;
				align-items: flex-end;
				.name {
					font-weight: 800;
					font-size: 18px;
					color: #fff;
				}

				.description {
					color: #d4cfcf;
					font-size: 12px;
				}
			}
		}
	}
</style>
