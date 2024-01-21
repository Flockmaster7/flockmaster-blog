<template>
	<el-backtop
		:right="backTopOption.right"
		:bottom="backTopOption.bottom"
		:visibility-height="150">
	</el-backtop>
</template>

<script setup lang="ts">
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';
	import { computed } from 'vue';

	const { common } = useStore();
	const { isMobile } = storeToRefs(common);

	const backTopOption = computed(() => {
		if (isMobile.value) {
			return {
				right: 8,
				bottom: 30
			};
		} else {
			return {
				right: 60,
				bottom: 100
			};
		}
	});
</script>

<style lang="scss" scoped>
	.backTop-container {
		width: 100%;
		height: 100%;
		border-radius: 8px;
		// background: var(--theme-data-show-1);
	}
</style>
