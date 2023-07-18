<template>
	<div class="layout-container--header">
		<div class="header">
			<Header></Header>
		</div>
	</div>
	<div class="layout-container--main">
		<router-view v-slot="{ Component }">
			<transition>
				<component :is="Component"></component>
			</transition>
		</router-view>
	</div>
</template>

<script setup lang="ts">
	import Header from '@/components/layout/header.vue';
	import { useUserStore } from '@/store/user';
	import { isLogin } from '@/utils/login';
	import { storeToRefs } from 'pinia';
	import { onMounted } from 'vue';

	const store = useUserStore();
	const { userInfo } = storeToRefs(store);

	onMounted(() => {
		if (isLogin()) store.getUserProfile();
		else {
			userInfo.value = {
				id: 0,
				user_name: '游客',
				is_admin: false,
				name: '游客',
				description: '这个人很懒，什么都没有留下',
				user_image: '/70819f913636cc5b697a88c00.jpg',
				user_focus: 0,
				user_fans: 0
			};
		}
	});

	// //sticky-bar显示隐藏
	// const commonStore = useCommonStore();
	// const { isShowStickyBar } = storeToRefs(commonStore);
</script>

<style lang="scss" scoped>
	.layout-container--header {
		position: sticky;
		top: -1px;
		z-index: 999;
		background-color: var(--theme-color);
		transition: 0.4s;
		.header {
			width: 1250px;
			margin: 0 auto;
		}
	}
	.layout-container--main {
		width: 1100px;
		margin: 0 auto;
	}

	// 切换路由动画
	.v-enter-active,
	.v-leave-active {
		transition: opacity 0.4s ease;
	}

	.v-enter-from,
	.v-leave-to {
		opacity: 0;
	}
</style>
