<template>
	<el-card>
		<el-collapse v-model="activeSettings">
			<el-collapse-item name="1">
				<template #title>
					<el-icon class="head-icon"><Setting /></el-icon>
					<text class="head-text"> 设置 </text>
				</template>
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
							:name="
								theme === item.theme ? 'colorselect' : 'color'
							"
							:color="item.icon"></zb-svg-icon
					></span>
				</div>
				<div class="change-dark">
					登出:
					<zb-svg-icon
						class="theme-item"
						name="logout"
						:size="20"
						@click="logoutBlog"></zb-svg-icon>
				</div>
			</el-collapse-item>
		</el-collapse>
	</el-card>
</template>

<script lang="ts" setup>
	import useTheme from '@/hooks/useTheme';
	import { logout } from '@/utils/login';
	import { ElMessageBox } from 'element-plus';
	import { ref } from 'vue';
	import { allTheme } from '@/config/theme';

	const activeSettings = ref(['1']);
	const { theme, changeActiveTheme } = useTheme();
	const logoutBlog = () => {
		ElMessageBox.confirm('是否退出登录', 'Warning', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() => {
			logout();
		});
	};
</script>

<style lang="scss" scoped>
	.change-dark {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 15px;
		padding: 0 15px;

		.active {
			color: var(--theme-nav-active-color);
		}

		.theme-item:hover {
			cursor: pointer;
			color: var(--theme-tool-active-color);
		}
	}
</style>
