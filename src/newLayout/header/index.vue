<template>
	<div class="header-container">
		<div class="leftBox">
			<Nav></Nav>
		</div>
		<div class="rightBox">
			<div class="search" @click="gotoSearch">
				<zb-svg-icon name="search" :autoDark="true"></zb-svg-icon>
				<span class="text">搜索</span>
			</div>
			<zb-theme></zb-theme>
			<div class="avater" @click="toUserDetail">
				<img v-lazy="userInfo.user_image" alt="" />
			</div>
			<div
				class="right-open"
				@click="openRight"
				v-if="route.meta.isShowRight">
				<zb-svg-icon name="rightzhankai" :autoDark="true"></zb-svg-icon>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useRoute, useRouter } from 'vue-router';
	import { isLogin } from '@/utils/login';
	import { storeToRefs } from 'pinia';
	import { ElMessageBox } from 'element-plus';
	import zbTheme from '@/components/common/zb-theme.vue';
	import useStore from '@/store';
	import Nav from './nav.vue';

	const { user, common } = useStore();
	const { userInfo } = storeToRefs(user);
	const { activeNav, rightOpen } = storeToRefs(common);
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

	// 跳转到搜索页
	const gotoSearch = () => {
		router.push('/search');
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

	.header-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 6.5px 80px;
		background-color: var(--theme-color);
		opacity: 0.75;
		transition: 0.4s;

		.leftBox {
			display: flex;
			justify-content: center;
			align-items: center;
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
