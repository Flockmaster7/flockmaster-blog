<template>
	<div class="loading-container" :style="{ height: height + 'px' }">
		<!-- 加载中... -->
		<div class="loading-icon">
			<el-icon size="40" color="var(--theme-color)"><Loading /></el-icon>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Loading } from '@element-plus/icons-vue';
	interface PropsType {
		height: number;
	}

	const props = withDefaults(defineProps<PropsType>(), {
		height: 500
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
