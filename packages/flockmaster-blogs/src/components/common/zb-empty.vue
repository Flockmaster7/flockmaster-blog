<template>
	<div class="empty-container" :style="{ height: height + 'px' }">
		<div class="center">
			<!-- <div class="img">
				<img src="../../static/images/logo/empty.png" alt="" />
			</div> -->
			<div class="text">
				{{ text }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	interface propsType {
		text: string;
		height: number;
	}

	const props = withDefaults(defineProps<propsType>(), {
		text: '空空如也~',
		height: 250
	});
</script>

<style lang="scss" scoped>
	.empty-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 250px;
		.center {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			gap: 15px;
			.text {
				font-size: 20px;
				color: $themeColor;
			}
		}
	}
</style>
