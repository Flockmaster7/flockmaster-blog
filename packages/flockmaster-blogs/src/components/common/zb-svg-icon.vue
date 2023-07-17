<template>
	<svg
		aria-hidden="true"
		:style="{ width: size + 'px', height: size + 'px' }"
		:fill="color">
		<use :href="`#icon-${name}`" />
	</svg>
</template>

<script setup lang="ts">
	interface PropsType {
		name: string;
		color: string;
		size: number;
	}
	// 提供 name 属性即可
	const props = withDefaults(defineProps<PropsType>(), {
		size: 20
	});
</script>

<style lang="scss" scoped></style>
