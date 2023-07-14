<template>
	<div class="theme-container" @click="changeDark">
		<el-icon size="20" v-if="isDark"><Sunny /></el-icon>
		<el-icon size="20" v-if="!isDark"><Moon /></el-icon>
	</div>
</template>

<script lang="ts" setup>
	import useTheme from '@/hooks/useTheme';
	import { useCommonStore } from '@/store/common';
	import { storeToRefs } from 'pinia';

	const { changeDark } = useTheme();
	const commonStore = useCommonStore();
	const { isDark } = storeToRefs(commonStore);
</script>

<style lang="scss" scoped>
	.theme-container {
		display: flex;
		align-items: center;
	}

	.theme-container:hover {
		cursor: pointer;
	}
</style>
