<template>
	<el-card>
		<el-collapse v-model="activeNames" @change="handleChange">
			<el-collapse-item name="1">
				<template #title>
					<el-icon class="head-icon"><Link /></el-icon>
					<text class="head-text"> 站点信息 </text>
				</template>
				<div class="site-info">
					<div class="site-info-item" @click="gotoSite('bilibili')">
						<img class="icon" src="@/static/images/bilibili.png" />
						<text class="text">bilibili</text>
					</div>
					<div class="site-info-item" @click="gotoSite('github')">
						<img class="icon" src="@/static/images/github.png" />
						<text class="text">github</text>
					</div>
					<div class="site-info-item" @click="gotoSite('gitee')">
						<img class="icon" src="@/static/images/gitee.png" />
						<text class="text">gitee</text>
					</div>
				</div>
			</el-collapse-item>
		</el-collapse>
	</el-card>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';

	const activeNames = ref([]);

	const handleChange = (val: string[]) => {
		console.log(val);
	};

	const gotoSite = (type: string) => {
		switch (type) {
			case 'bilibili':
				//原标签页
				// window.location.href =
				// 	'https://space.bilibili.com/398201002?spm_id_from=333.1007.0.0';
				// 新便签页
				window.open(
					'https://space.bilibili.com/398201002?spm_id_from=333.1007.0.0'
				);
				break;
			case 'github':
				// window.location.href = 'https://github.com/Davi-Li';
				window.open('https://github.com/Davi-Li');
				break;
			case 'gitee':
				// window.location.href = 'https://gitee.com/Flockmaster_Li';
				window.open('https://gitee.com/Flockmaster_Li');
				break;
			default:
				break;
		}
	};
</script>

<style lang="scss" scoped>
	.site-info {
		display: flex;
		justify-content: space-around;
		align-items: center;
		.site-info-item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 5px;
			.icon {
				width: 50px;
				height: 50px;
				border-radius: 50%;
			}

			.text {
				font-size: 15px;
			}
		}

		.site-info-item:hover {
			cursor: pointer;
		}
	}
</style>
