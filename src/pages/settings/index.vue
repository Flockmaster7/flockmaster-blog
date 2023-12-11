<template>
	<el-card>
		<div class="settings-container">
			<div class="settings-title">设置</div>
			<el-divider border-style="dashed" />
			<div class="change-dark">
				黑夜:
				<zb-theme></zb-theme>
			</div>
			<div class="change-dark">
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
			</div>
		</div>
	</el-card>
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
		display: flex;
		flex-direction: column;
		gap: 10px;
		.settings-title {
			margin-left: 15px;
			font-size: 20px;
			font-weight: 700;
		}
		.change-dark {
			display: flex;
			align-items: center;
			gap: 10px;
			font-size: 18px;
			padding: 0 15px;

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
