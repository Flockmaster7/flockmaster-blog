<template>
	<div class="loadMore-container">
		<div
			class="loadMore-default"
			v-if="!isLoading"
			:style="{ justifyContent: direction }">
			<zb-svg-icon name="more"></zb-svg-icon>
			{{ text }}
		</div>
		<div class="loadMore-fallback" v-else>
			<zb-loading :height="40" :size="25"></zb-loading>
		</div>
	</div>
</template>

<script setup lang="ts">
	interface PropsType {
		text: string;
		isLoading: boolean;
		isLoadMore: boolean;
		direction: 'left' | 'center' | 'right';
	}
	withDefaults(defineProps<PropsType>(), {
		text: '加载更多',
		isLoading: false,
		direction: 'left'
	});
</script>

<style lang="scss" scoped>
	.loadMore-container {
		.loadMore-default {
			display: flex;
			align-items: center;
			gap: 4px;
			height: 50px;
			line-height: 50px;
			color: $gray;
		}
		.loadMore-default:hover {
			cursor: pointer;
		}
	}
</style>
