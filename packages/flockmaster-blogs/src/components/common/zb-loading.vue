<template>
	<div class="loading-container" :style="{ height: height + 'px' }">
		加载中...
	</div>
</template>

<script setup lang="ts">
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
	}
</style>
