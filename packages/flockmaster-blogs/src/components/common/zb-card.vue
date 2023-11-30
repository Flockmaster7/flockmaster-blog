<template>
	<div class="title">{{ title }}</div>
	<div class="content">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
	interface PropType {
		title: string;
	}

	defineProps<PropType>();
</script>

<style lang="scss" scoped>
	.title {
		padding: 20px 0;
		font-size: 17px;
		font-weight: 600;
		color: $gray;
	}
</style>
