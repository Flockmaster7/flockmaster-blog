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
	import GuideUserInfo from './guideUserInfo.vue';
	import GuideWelcome from './guideWelcome.vue';
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
