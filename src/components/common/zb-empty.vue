<template>
	<div class="empty-container" :style="{ height: height + 'px' }">
		<div class="center">
			<div class="img">
				<zb-svg-icon name="empty" :size="iconSize"></zb-svg-icon>
			</div>
			<div class="text" :style="{ fontSize: textSize + 'px' }">
				{{ text }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	interface propsType {
		text?: string;
		height?: number;
		textSize?: number;
		iconSize?: number;
	}

	withDefaults(defineProps<propsType>(), {
		text: '没有更多了哦',
		height: 250,
		textSize: 14,
		iconSize: 100
	});
</script>

<style lang="scss" scoped>
	.empty-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 250px;
		.center {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			gap: 15px;
			.text {
				color: var(--theme-text-3);
				font-size: 16px;
			}
		}
	}
</style>
