<template>
	<div class="loading-container" :style="{ height: height + 'px' }">
		<!-- 加载中... -->
		<div class="loading-icon">
			<zb-svg-icon
				name="loading"
				:size="size"
				color="var(--theme-active-color)"></zb-svg-icon>
		</div>
	</div>
</template>

<script setup lang="ts">
	interface PropsType {
		height: number;
		size: number;
	}

	withDefaults(defineProps<PropsType>(), {
		height: 500,
		size: 40
	});
</script>

<style lang="scss" scoped>
	.loading-container {
		width: 100%;
		height: 500px;
		display: flex;
		justify-content: center;
		align-items: center;

		.loading-icon {
			animation: rotate 1.5s linear infinite;
			transition: 0.6s;
		}

		@keyframes rotate {
			from {
				transform: rotate(0deg);
			}
			to {
				transform: rotate(360deg);
			}
		}
	}
</style>
