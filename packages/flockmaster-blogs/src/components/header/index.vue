<template>
	<div class="header-container">
		<div class="leftBox">
			<div class="logo" @click="gotoHome">
				<div class="logo--text">Flockmaster</div>
				<div class="logo--logo">blogs</div>
			</div>
			<div class="header-nav-pc">
				<div
					:class="{ navLink: true, active: activeNav === item.src }"
					v-for="(item, index) in navLinkList">
					<router-link :to="item.src" @click="changeTag(item)">{{
						item.title
					}}</router-link>
				</div>
			</div>
			<div class="header-nav-mobile">
				<el-dropdown trigger="click" @command="handleCommand">
					<span class="el-dropdown-link">
						{{ currentNav }}
						<el-icon class="el-icon--right">
							<arrow-down />
						</el-icon>
					</span>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item
								:command="item"
								v-for="(item, index) in navLinkList"
								>{{ item.title }}</el-dropdown-item
							>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
		</div>
		<!-- <div class="search">
			<el-input
				v-model="searchText"
				placeholder="你想要的这里都有"
				:suffix-icon="Search" />
		</div> -->
		<div class="rightBox">
			<div class="avater" @click="toUserDetail">
				<img
					:src="getImgBaseUrl(imgEnvironment) + userInfo.user_image"
					alt="" />
			</div>
			<el-popconfirm
				width="220"
				confirm-button-text="确定"
				cancel-button-text="取消"
				:icon="InfoFilled"
				icon-color="$themeColor"
				@confirm="confirm"
				title="是否退出登录？">
				<template #reference>
					<el-icon color="#fff" :size="20"><Operation /></el-icon>
				</template>
			</el-popconfirm>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import { navLinkList } from './nav';
	import { isLogin, logout } from '@/utils/login';
	import { Search } from '@element-plus/icons-vue';
	import { InfoFilled, ArrowDown } from '@element-plus/icons-vue';
	import { ref } from 'vue';
	import { HeaderNavType } from '@/types';
	import { useUserStore } from '@/store/user';
	import { storeToRefs } from 'pinia';
	import { imgEnvironment } from '@/constant/index';
	import { getImgBaseUrl } from '@/utils/imgUrl';
	import { ElMessageBox } from 'element-plus';

	const userStore = useUserStore();
	const { userInfo } = storeToRefs(userStore);

	const router = useRouter();

	const toUserDetail = () => {
		if (!isLogin()) {
			ElMessageBox.confirm(
				'此内容需要登录才可操作，是否登录',
				'Warning',
				{
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}
			).then(() => {
				// 跳转到登录页
				router.push({
					path: '/login',
					query: { from: router.currentRoute.value.fullPath }
				});
			});
			return;
		}
		router.push('/my');
	};

	// 选中nav
	const activeNav = ref('/');
	const changeTag = (nav: HeaderNavType) => {
		window.scrollTo({
			top: 0
		});
		activeNav.value = nav.src;
	};

	// 跳转到首页
	const gotoHome = () => {
		router.push('/home');
	};

	// 退出登录
	const confirm = () => {
		console.log(11);
		logout();
	};

	// 移动端
	// 选中nav
	const currentNav = ref('首页');
	// 点击下来菜单
	const handleCommand = (command: HeaderNavType) => {
		currentNav.value = command.title;
		router.push(command.src);
	};
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.header-container {
			padding: 10px 6px !important;
		}
		.logo {
			&--text {
				font-size: 18px !important;
			}
			&--logo {
				font-size: 8px !important;
			}
		}
	}
	.header-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 80px;
		background-color: $themeColor;

		.leftBox {
			display: flex;
			justify-content: center;
			align-items: center;
			.logo {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 40px;
				line-height: 40px;
				text-align: center;
				margin-right: 30px;
				img {
					width: 40px;
					height: 40px;
					border-radius: 50%;
				}
				&--text {
					font-size: 24px;
					font-weight: 700;
				}

				&--logo {
					position: relative;
					left: 5px;
					bottom: 5px;
				}
			}

			.logo:hover {
				cursor: pointer;
			}
		}

		.header-nav-pc {
			display: flex;
			justify-content: center;
			align-items: center;
			.navLink {
				width: 100px;
				height: 100%;
				text-align: center;

				a {
					color: black;
				}

				a:hover {
					font-weight: 700;
					color: rgb(51, 49, 49);
					border-bottom: 1px solid $white;
				}
			}
		}

		.header-nav-mobile {
			display: flex;
			justify-content: center;
			align-items: center;
			.el-dropdown-link {
				color: $navColor;
				align-items: center;
			}
			.navLink {
				width: 100px;
				height: 100%;
				text-align: center;

				a {
					color: black;
				}

				a:hover {
					font-weight: 700;
					color: rgb(51, 49, 49);
					border-bottom: 1px solid $white;
				}
			}
		}

		.active {
			a {
				font-weight: 700 !important;
				color: rgb(51, 49, 49) !important;
				border-bottom: 1px solid $white;
			}
		}

		.rightBox {
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			.avater {
				margin-right: 10px;
				img {
					width: 35px;
					height: 35px;
					border-radius: 50%;
				}
			}
		}
	}
</style>
