<template>
	<div class="guide-container">
		<vue-particles id="tsparticles" :options="particleOption" />
		<div class="leftBox">
			<GuideWelcome></GuideWelcome>
		</div>
		<div class="rightBox">
			<GuideUserInfo></GuideUserInfo>
		</div>
	</div>
</template>

<script setup lang="ts">
	import GuideUserInfo from './guideUserInfo.vue';
	import GuideWelcome from './guideWelcome.vue';
	import particleOption from '@/config/particles.json';
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

		#tsparticles {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			// background: #000000;
			z-index: -10;
		}

		.leftBox {
			flex: 1;
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
