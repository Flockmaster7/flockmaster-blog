<template>
	<div class="container animate__animated animate__fadeInLeft">
		<!-- 个人信息卡片 -->
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
					<el-button @click="gotoDataVisualize">可视化大屏</el-button>
				</div>
			</div>
		</el-card>
		<!-- 设置 -->
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
									theme === item.theme
										? 'colorselect'
										: 'color'
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
		<!-- 网站资讯 -->
		<el-card>
			<el-collapse v-model="activeWebsiteInfo">
				<el-collapse-item name="1">
					<template #title>
						<el-icon class="head-icon"><Monitor /></el-icon>
						<text class="head-text"> 网站资讯 </text>
					</template>
					<div class="change-dark">
						总访问量:
						{{ websiteInfo.website_visit }}
					</div>
					<div class="change-dark">
						今日访问量:
						{{ websiteInfo.website_visit_today }}
					</div>
					<div class="change-dark">
						网站已运行:
						{{ workDay }}天
					</div>
				</el-collapse-item>
			</el-collapse>
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
		<!-- 标签云卡片 -->
		<!-- <el-card>
			<el-collapse v-model="activeTag">
				<el-collapse-item name="1">
					<template #title>
						<el-icon class="head-icon"><Guide /></el-icon>
						<text class="head-text"> 标签云 </text>
					</template>
					<div class="tag-List">
						<el-check-tag
							v-for="item in tagAsideList"
							:key="item.id"
							:checked="tagChecked.includes(item.id)"
							color="skyblue"
							@change="(status: boolean) => onChangeTag(status, item.id)"
							>{{ item.tag_name }}</el-check-tag
						>
					</div>
				</el-collapse-item>
			</el-collapse>
		</el-card> -->
	</div>
</template>

<script setup lang="ts">
	import { logout } from '@/utils/login';
	import { useTagStore } from '@/store/tag';
	import { storeToRefs } from 'pinia';
	import { computed, onMounted, ref } from 'vue';
	import { imgUrl } from '@/utils/common';
	import zbTheme from '@/components/common/zb-theme.vue';
	import useTheme from '@/hooks/useTheme';
	import useStore from '@/store';
	import { allTheme } from '@/config/theme';
	import router from '@/router';
	import { ElMessageBox } from 'element-plus';
	import { getWorkDay } from '@/utils/dayFormat';

	const { blog, user, common } = useStore();

	const { admin } = storeToRefs(user);
	const { activeNav, websiteInfo } = storeToRefs(common);
	const activeNames = ref([]);
	const handleChange = (val: string[]) => {
		console.log(val);
	};
	// 个人信息
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
	// 设置
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
	// 网站资讯
	const activeWebsiteInfo = ref(['1']);
	const workDay = computed(() => {
		return getWorkDay('2023-6-17');
	});
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

	//标签云
	const tgStore = useTagStore();
	const { tagAsideList } = storeToRefs(tgStore);
	const activeTag = ref(['1']);

	tgStore.getAsideTgLIst(1, 9);
	// 标签选中
	const { getBlogListParams } = storeToRefs(blog);
	const tagChecked = ref<number[]>([]);
	const onChangeTag = async (status: boolean, id: number) => {
		if (status) tagChecked.value.push(id);
		else {
			let index = tagChecked.value.indexOf(id);
			if (index !== -1) tagChecked.value.splice(index, 1);
		}
		//获取标签对应的文章列表
		getBlogListParams.value = {
			tags: tagChecked.value
		};
		blog.getBlogList(1, 9, getBlogListParams.value);
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
		justify-content: space-between;
		align-items: center;
		// margin-top: 15px;
		gap: 10px;
		// overflow-y: scroll;
		// 个人信息卡片
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
		}

		// 设置卡片
		.change-dark {
			display: flex;
			align-items: center;
			gap: 10px;
			font-size: 15px;
			padding: 0 15px;

			.theme-item {
			}

			.active {
				color: var(--theme-nav-active-color);
			}

			.theme-item:hover {
				cursor: pointer;
				color: var(--theme-tool-active-color);
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

		// 标签云卡片
		.tag-List {
			display: flex;
			flex-wrap: wrap;
			gap: 6px;
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

	// 右侧卡片刷新
	.head-refresh {
		margin-left: 10px;
	}
</style>
