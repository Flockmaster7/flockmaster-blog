<template>
	<svg
		:style="{ width: size + 'px', height: size + 'px' }"
		:fill="fillColor"
		aria-hidden="true">
		<use :href="`#icon-${name}`" />
	</svg>
</template>

<script setup lang="ts">
	import useStore from '@/store';
	import { computed } from 'vue';
	import { storeToRefs } from 'pinia';

	interface PropsType {
		name: string;
		color: string;
		size: number;
		autoDark: boolean;
	}

	const { common } = useStore();
	const { isDark } = storeToRefs(common);

	// 提供 name 属性即可
	const props = withDefaults(defineProps<PropsType>(), {
		size: 20,
		autoDark: false
	});

	const fillColor = computed(() => {
		return props.autoDark
			? isDark.value
				? 'var(--theme-active-color)'
				: ''
			: props.color;
	});
</script>

<style lang="scss" scoped></style>
