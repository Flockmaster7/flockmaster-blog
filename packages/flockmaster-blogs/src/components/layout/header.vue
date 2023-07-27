<template>
	<div class="header-container">
		<div class="leftBox">
			<div class="operator-mobile" @click="openOperator">
				<!-- <el-icon color="#fff" :size="20"><Operation /></el-icon> -->
				<zb-svg-icon
					name="leftzhankai"
					size="18"
					:autoDark="true"></zb-svg-icon>
			</div>
			<div class="logo" @click="gotoHome">
				<div class="logo--text">Flockmaster</div>
				<div class="logo--logo">blogs</div>
			</div>
			<div class="header-nav-pc">
				<div
					:class="{ navLink: true, active: activeNav === item.src }"
					v-for="(item, index) in navLinkList"
					:key="index">
					<div class="navLink-item" @click="changeTab(item)">
						{{ item.title }}
					</div>
				</div>
			</div>
			<!-- <div class="header-nav-mobile">
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
								:key="index"
								>{{ item.title }}</el-dropdown-item
							>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div> -->
		</div>
		<div class="rightBox">
			<div class="search" @click="gotoSearch">
				<!-- <el-icon :size="22"><Search /></el-icon> -->
				<zb-svg-icon name="search" :autoDark="true"></zb-svg-icon>
				<span class="text">搜索</span>
			</div>
			<zb-theme></zb-theme>
			<div class="avater" @click="toUserDetail">
				<img :src="imgUrl(userInfo.user_image)" alt="" />
			</div>
			<div
				class="right-open"
				@click="openRight"
				v-if="route.meta.isShowRight">
				<zb-svg-icon name="rightzhankai" :autoDark="true"></zb-svg-icon>
			</div>
		</div>
	</div>
	<el-drawer v-model="showOperator" size="30%" title="导航" direction="ltr">
		<div class="operatorMain">
			<div class="operator-avatar">
				<img :src="imgUrl(userInfo.user_image)" alt="" />
			</div>
			<div class="operator-list">
				<div
					class="operator-item"
					@click="handleOperator(item)"
					v-for="(item, index) in mobileNav"
					:key="index">
					<zb-svg-icon
						:name="item.icon"
						:autoDark="true"></zb-svg-icon>
					<span>{{ item.title }}</span>
				</div>
			</div>
		</div>
	</el-drawer>
</template>

<script setup lang="ts">
	import { useRoute, useRouter } from 'vue-router';
	import { navLinkList, mobileNav } from '@/config/headerNav';
	import { isLogin, logout } from '@/utils/login';
	import { ref } from 'vue';
	import { HeaderNavType } from '@/types';
	import { storeToRefs } from 'pinia';
	import { imgUrl } from '@/utils/common';
	import { ElMessageBox } from 'element-plus';
	import zbTheme from '@/components/common/zb-theme.vue';
	import useStore from '@/store';

	const { user, common } = useStore();
	const { userInfo } = storeToRefs(user);
	const { isDark, rightOpen } = storeToRefs(common);
	const router = useRouter();
	const route = useRoute();

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
	const changeTab = (nav: HeaderNavType) => {
		router.push(nav.src);
		window.scrollTo({
			top: 0
		});
		activeNav.value = nav.src;
	};

	// 跳转到首页
	const gotoHome = () => {
		router.push('/home');
	};

	// 跳转到搜索页
	const gotoSearch = () => {
		router.push('/search');
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
	const handleOperator = (operator: HeaderNavType) => {
		if (operator.type === 'logout') {
			ElMessageBox.confirm('是否退出登录', 'Warning', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				logout();
				showOperator.value = false;
			});
		} else {
			currentNav.value = operator.title;
			router.push(operator.src);
			showOperator.value = false;
		}
	};
	// 左侧导航菜单
	const showOperator = ref(false);
	const openOperator = () => {
		showOperator.value = true;
	};
	// 打开右侧
	const openRight = () => {
		rightOpen.value = true;
	};
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.header-container {
			padding: 10px 6px !important;
		}
		.operator-mobile {
			display: block !important;
		}
		.logo {
			&--text {
				font-size: 18px !important;
			}
			&--logo {
				font-size: 8px !important;
			}
		}

		.search {
			border: none !important;
			padding: 0 !important;
			.text {
				display: none;
			}
		}

		.rightBox {
			.avater {
				display: none !important;
			}
		}
	}

	// 导航
	.operatorMain {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 35px;
		.operator-avatar {
			width: 70px;
			height: 70px;
			overflow: hidden;
			img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
		.operator-list {
			display: flex;
			flex-direction: column;
			gap: 30px;
			.operator-item {
				display: flex;
				gap: 7px;
				justify-content: center;
				align-items: center;
			}
		}
	}

	.header-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 80px;
		background-color: var(--theme-color);
		transition: 0.4s;

		.leftBox {
			display: flex;
			justify-content: center;
			align-items: center;
			.operator-mobile {
				display: none;
				padding: 2px 7px 0 5px;
			}
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
			gap: 10px;
			justify-content: center;
			align-items: center;
			.navLink {
				width: 100px;
				height: 100%;
				text-align: center;

				.navLink-item {
					// color: $navColor;
					font-weight: bold;
					padding: 10px 10px;
					box-sizing: border-box;
					border-radius: 10px;
				}

				.navLink-item:hover {
					cursor: pointer;
					background-color: var(--theme-nav-color);
					-webkit-box-shadow: 10px 10px 99px 6px rgb(129, 227, 198);
					-moz-box-shadow: 10px 10px 99px 6px rgb(134, 235, 192);
					box-shadow: 10px 10px 99px 6px rgb(98, 243, 187);
				}

				// .navLink-item::before,
				// .navLink-item::after {
				// 	box-sizing: inherit;
				// 	position: absolute;
				// 	content: '';
				// 	border: 2px solid transparent;
				// 	border-radius: 5px;
				// 	width: 0;
				// 	height: 0;
				// }

				// .navLink-item::after {
				// 	bottom: 0;
				// 	right: 0;
				// }

				// .navLink-item::before {
				// 	top: 0;
				// 	left: 0;
				// }

				// .navLink-item:hover::before,
				// .navLink-item:hover::after {
				// 	width: 100%;
				// 	height: 100%;
				// }

				// .navLink-item:hover::before {
				// 	border-top-color: $navBorderColor;
				// 	border-right-color: $navBorderColor;
				// 	transition: width 0.3s ease-out, height 0.3s ease-out 0.3s;
				// }

				// .navLink-item:hover::after {
				// 	border-bottom-color: $navBorderColor;
				// 	border-left-color: $navBorderColor;
				// 	transition: border-color 0s ease-out 0.6s,
				// 		width 0.3s ease-out 0.6s, height 0.3s ease-out 1s;
				// }
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
			font-size: 18px;
			border-radius: 10px;
			color: var(--theme-nav-active-color) !important;
			// background-color: $navBorderColor;
			// -webkit-box-shadow: 10px 10px 99px 6px rgb(129, 227, 198);
			// -moz-box-shadow: 10px 10px 99px 6px rgb(134, 235, 192);
			// box-shadow: 10px 10px 99px 6px rgb(98, 243, 187);
		}

		.rightBox {
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			gap: 15px;
			.search {
				// color: $white;
				font-size: 15px;
				font-weight: 700;
				display: flex;
				align-items: center;
				gap: 10px;
				border: 1px solid;
				border-radius: 18px;
				padding: 3px 10px;
			}
			.avater {
				img {
					width: 35px;
					height: 35px;
					border-radius: 50%;
				}
			}
			.right-open {
				padding-top: 2px;
			}
		}
	}
</style>
