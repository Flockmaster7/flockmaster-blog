<template>
	<el-dropdown @command="handleSelect">
		<zb-svg-icon name="xiala" :size="22"></zb-svg-icon>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item command="time">时间</el-dropdown-item>
				<el-dropdown-item command="hot">热度</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';

	const { blog } = useStore();
	const { filter } = storeToRefs(blog);

	const handleSelect = (command: 'time' | 'hot') => {
		filter.value = command;
	};
</script>

<style lang="scss" scoped>
	.example-showcase .el-dropdown-link {
		cursor: pointer;
		color: var(--el-color-primary);
		display: flex;
		align-items: center;

		&:focus {
			outline: none;
		}
	}
</style>
