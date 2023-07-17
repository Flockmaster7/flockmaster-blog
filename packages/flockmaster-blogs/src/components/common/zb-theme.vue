<template>
	<div class="theme-container" @click="changeDark">
		<el-icon size="20" v-if="isDark"><Sunny /></el-icon>
		<el-icon size="20" v-if="!isDark"><Moon /></el-icon>
	</div>
</template>

<script lang="ts" setup>
	import useTheme from '@/hooks/useTheme';
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';

	const { changeDark } = useTheme();
	const { common } = useStore();
	const { isDark } = storeToRefs(common);
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
