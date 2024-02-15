<template>
	<div class="title" :style="{ fontSize: titleSize + 'px' }">{{ title }}</div>
	<div class="content">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
	interface PropType {
		title: string;
		titleSize?: string | number;
	}

	withDefaults(defineProps<PropType>(), {
		titleSize: 17
	});
</script>

<style lang="scss" scoped>
	.title {
		padding: 20px 0;
		font-size: 17px;
		font-weight: 600;
		color: $gray;
	}

	.content {
		margin-bottom: 20px;
	}
</style>
