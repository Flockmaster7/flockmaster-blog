<template>
	<div class="guide-container">
		<div class="leftBox">
			<GuideWelcome></GuideWelcome>
		</div>
		<div class="rightBox">
			<GuideUserInfo></GuideUserInfo>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { onMounted } from 'vue';
	import GuideUserInfo from './guideUserInfo.vue';
	import GuideWelcome from './guideWelcome.vue';
	import Cache from '@/utils/cache';
	import { HASVISIT } from '@/constant';

	onMounted(() => {
		Cache.setCache(HASVISIT, true);
	});
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.leftBox {
			height: 100vh;
		}

		.rightBox {
			display: none !important;
		}
	}

	.guide-container {
		display: flex;

		.leftBox {
			flex: 1;
			height: 100vh;
		}

		.rightBox {
			width: 600px;
			height: 100vh;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 50px;
		}
	}
</style>
