<template>
	<el-card :body-style="{ padding: 0 }">
		<div class="info-card">
			<img class="info-bg" :src="adminBg" alt="" />
			<div class="info-center">
				<div class="info-center-top">
					<img class="avatar" :src="imgUrl(admin.user_image)" />
					<p class="name">{{ admin.name }}</p>
				</div>
				<div class="description">{{ admin.description }}</div>
			</div>
			<div class="info-data">
				<div class="data-item">
					<div class="text">文章</div>
					<div class="number" @click="gotoAdminData('blog')">
						{{ admin.blogNum }}
					</div>
				</div>
				<div class="data-item">
					<div class="text">标签</div>
					<div class="number" @click="gotoAdminData('tag')">
						{{ admin.tagNum }}
					</div>
				</div>
				<div class="data-item">
					<div class="text">作品</div>
					<div class="number" @click="gotoAdminData('work')">
						{{ admin.workNum }}
					</div>
				</div>
			</div>
			<div class="info-link">
				<div class="info-link-item" @click="gotoSite('bilibili')">
					<img class="icon" src="@/static/images/bilibili.png" />
				</div>
				<div class="info-link-item" @click="gotoSite('github')">
					<img class="icon" src="@/static/images/github.png" />
				</div>
				<div class="info-link-item" @click="gotoSite('gitee')">
					<img class="icon" src="@/static/images/gitee.png" />
				</div>
			</div>
			<div class="info-visualize">
				<el-button @click="gotoDataVisualize"
					>数据可视化(beta)</el-button
				>
			</div>
		</div>
	</el-card>
</template>

<script lang="ts" setup>
	import router from '@/router';
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';
	import { onMounted, computed } from 'vue';
	import { imgUrl } from '@/utils/common';

	const { user, common } = useStore();
	const { activeNav } = storeToRefs(common);
	const { admin } = storeToRefs(user);

	onMounted(async () => {
		await user.getAdminInfo();
		await common.getWebsite();
	});
	const adminBg = computed(() => {
		return new URL('../../static/images/admin_bg.png', import.meta.url)
			.href;
	});
	const gotoAdminData = (type: string) => {
		switch (type) {
			case 'blog':
				router.push('/pigeonhole');
				activeNav.value = '/pigeonhole';
				break;
			case 'tag':
				router.push('/tag');
				activeNav.value = '/tag';
				break;
			case 'work':
				router.push('/work');
				activeNav.value = '/work';
				break;
			default:
				break;
		}
	};
	const gotoDataVisualize = () => {
		console.log('跳转');
		router.push('/visualize');
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
	.info-card {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;

		.info-bg {
			width: 100%;
			height: 120px;
		}
		.info-center {
			width: 100%;
			transform: translate(5%, -50%);
			display: flex;
			flex-direction: column;
			gap: 15px;
			.info-center-top {
				display: flex;
				gap: 6px;
				.avatar {
					width: 60px;
					height: 60px;
					border-radius: 50%;
					transition: 1s ease-in-out;
				}
				.avatar:hover {
					cursor: pointer;
					// transform: rotate3d(1turn);
					transform: rotate3d(1, 1, 1, 360deg);
				}
				.name {
					transform: translateY(60%);
					font-weight: 700;
					font-size: 17px;
				}
			}

			.description {
				font-size: 15px;
				color: $gray;
			}
		}
		.info-data {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 40px;
			padding: 0 0 20px;
			.data-item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				gap: 6px;
				.text {
					font-weight: 500;
					color: $gray;
				}
				.number {
				}
				.number:hover {
					color: var(--theme-nav-active-color);
					cursor: pointer;
					font-weight: 600;
				}
			}
		}
		.info-link {
			display: flex;
			justify-content: space-around;
			align-items: center;
			gap: 20px;
			padding-bottom: 20px;
			.info-link-item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				gap: 5px;
				.icon {
					width: 30px;
					height: 30px;
					border-radius: 50%;
				}

				.text {
					font-size: 15px;
				}
			}

			.info-link-item:hover {
				cursor: pointer;
			}
		}

		.info-visualize {
			margin-bottom: 20px;
			:deep(.el-button) {
				width: 150px;
				border-radius: 30px;
				transition: 1s;
			}
			:deep(.el-button:hover) {
				color: var(--theme-tool-item-color);
				width: 200px;
				background-color: var(--theme-color);
			}
		}
	}
</style>
