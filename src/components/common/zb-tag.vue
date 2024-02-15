<template>
	<span
		class="zbTag-container"
		:style="{ background: color, height: height }">
		<slot></slot>
	</span>
</template>

<script setup lang="ts">
	import { computed } from 'vue';

	interface Props {
		color?: string;
		size?: 'default' | 'small' | 'large' | string;
	}

	const props = withDefaults(defineProps<Props>(), {
		color: 'var(--theme-tag-color)',
		size: 'default'
	});

	const height = computed(() => {
		switch (props.size) {
			case 'default':
				return '12px';
			case 'small':
				return '4px';
			case 'large':
				return '20px';
			default:
				return '12px';
		}
	});
</script>

<style lang="scss" scoped>
	@import '../../static/css/mixins.scss';
	.zbTag-container {
		@include flex-center(0);
		padding: 10px 15px;
		height: 12px;
		border-radius: 8px;
		color: $white;
		font-size: 16px;
		white-space: nowrap;
		font-family: 'Courier New', Courier, monospace;
		background: var(--theme-tag-color);
	}
</style>
