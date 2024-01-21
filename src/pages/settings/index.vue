<template>
	<div class="settings-container">
		<zbCard title="主题">
			<div class="change-dark">
				黑夜:
				<zb-theme></zb-theme>
			</div>
		</zbCard>

		<!-- <div class="change-dark">
				主题:
				<span
					v-for="(item, index) in allTheme"
					class="theme-item"
					:class="{ active: theme === item.theme }"
					:key="index"
					@click="changeActiveTheme(item.theme)"
					><zb-svg-icon
						:name="theme === item.theme ? 'colorselect' : 'color'"
						:color="item.icon"></zb-svg-icon
				></span>
			</div> -->
	</div>
</template>

<script setup lang="ts">
	import { allTheme } from '@/config/theme';
	import useTheme from '@/hooks/useTheme';

	const { theme, changeActiveTheme } = useTheme();
</script>

<style lang="scss" scoped>
	// 分割线
	.el-divider--horizontal {
		margin: 5px 0 !important;
	}
	.settings-container {
		box-sizing: border-box;
		padding: 10px 20px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		height: calc(100vh - 275px);

		.change-dark {
			display: flex;
			align-items: center;
			gap: 10px;
			font-size: 16px;

			.active {
				color: var(--theme-tool-active-color);
			}

			.theme-item:hover {
				cursor: pointer;
				color: var(--theme-tool-active-color);
			}
		}
	}
</style>
