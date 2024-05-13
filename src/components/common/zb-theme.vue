<template>
	<div class="theme-container" @click="changeDark">
		<!-- <el-switch
			v-model="isDark"
			style="margin-left: 24px"
			inline-prompt
			:active-icon="Sunny"
			:inactive-icon="Moon"
			@change="changeDark" /> -->
		<el-icon size="22" v-if="isDark"><Sunny /></el-icon>
		<el-icon size="22" v-if="!isDark"><Moon /></el-icon>
		<!-- <zb-svg-icon v-if="isDark" name="baitian" :size="22"></zb-svg-icon>
		<zb-svg-icon v-if="!isDark" name="heiye" :size="23"></zb-svg-icon> -->
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
