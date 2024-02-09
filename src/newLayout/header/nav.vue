<template>
	<div class="operator-mobile" @click="openOperator">
		<!-- <el-icon color="#fff" :size="20"><Operation /></el-icon> -->
		<zb-svg-icon
			name="leftzhankai"
			size="18"
			:autoDark="true"></zb-svg-icon>
	</div>
	<Logo></Logo>

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
	<el-drawer v-model="showOperator" size="30%" title="导航" direction="ltr">
		<div class="operatorMain">
			<div class="operator-avatar">
				<img v-lazy="userInfo.user_image" alt="" />
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

<script lang="ts" setup>
	import router from '@/router';
	import { HeaderNavType } from '@/types';
	import { logout } from '@/utils/login';
	import { ElMessageBox } from 'element-plus';
	import { navLinkList, mobileNav } from '@/config/headerNav';
	import { storeToRefs } from 'pinia';
	import { ref } from 'vue';
	import useStore from '@/store';
	import Logo from './logo.vue';

	const { user, common } = useStore();
	const { userInfo } = storeToRefs(user);
	const { activeNav } = storeToRefs(common);

	const changeTab = (nav: HeaderNavType) => {
		router.push(nav.src);
		window.scrollTo({
			top: 0
		});
		common.changeActiveNav(nav.src);
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
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.operator-mobile {
			display: block !important;
		}
	}

	.operator-mobile {
		display: none;
		padding: 2px 7px 0 5px;
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

	.header-nav-pc {
		display: flex;
		gap: 10px;
		justify-content: center;
		align-items: center;
		.navLink {
			width: 60px;
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
</style>
