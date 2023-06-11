<template>
	<div class="container">
		<!-- 个人信息卡片 -->
		<el-card>
			<div class="info-card">
				<img class="avatar" src="@/static/images/login_bg.png" />
				<text class="name">{{ userInfo.name }}</text>
				<text class="description">{{ userInfo.description }}</text>
			</div>
		</el-card>
		<!-- 站点信息卡片 -->
		<el-card>
			<el-collapse v-model="activeNames" @change="handleChange">
				<el-collapse-item name="1">
					<template #title>
						<el-icon class="head-icon"><Link /></el-icon>
						<text class="head-text"> 站点信息 </text>
					</template>
					<div class="site-info">
						<div
							class="site-info-item"
							@click="gotoSite('bilibili')">
							<img
								class="icon"
								src="@/static/images/bilibili.png" />
							<text class="text">bilibili</text>
						</div>
						<div class="site-info-item" @click="gotoSite('github')">
							<img
								class="icon"
								src="@/static/images/github.png" />
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
	</div>
</template>

<script setup lang="ts">
	import { useUserStore } from '@/store/user';
	import { storeToRefs } from 'pinia';
	import { ref } from 'vue';

	const store = useUserStore();
	const { userInfo } = storeToRefs(store);

	const activeNames = ref(['1']);
	const handleChange = (val: string[]) => {
		console.log(val);
	};

	// 跳转到外站
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
	// 设置右侧卡片宽度
	.el-card {
		width: 300px;
	}

	.container {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 15px;
		gap: 15px;
		// 个人信息卡片
		.info-card {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 20px 0 20px;
			gap: 10px;
			.avatar {
				width: 50px;
				height: 50px;
				border-radius: 50%;
			}
			.name {
				font-weight: 700;
			}
			.description {
				font-size: 12px;
				color: #a8a4a4;
			}
		}
		// 站点信息卡片
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
	}

	// 右侧卡片标题icon
	.head-icon {
		font-size: 18px;
		margin-right: 5px;
	}

	// 右侧卡片标题文字
	.head-text {
		font-size: 14px;
		font-weight: 700;
	}
</style>
