<template>
	<div class="layout-container--main">
		<transition enter-active-class="animate__animated animate__fadeInLeft">
			<router-view v-slot="{ Component }">
				<keep-alive include="main">
					<component :is="Component"></component>
				</keep-alive>
			</router-view>
		</transition>
	</div>
</template>

<script setup lang="ts">
	import useStore from '@/store';
	import { isLogin } from '@/utils/login';
	import { storeToRefs } from 'pinia';
	import { onMounted } from 'vue';

	const { user, common } = useStore();
	const { userInfo } = storeToRefs(user);

	onMounted(() => {
		if (isLogin()) user.getUserProfile();
		else {
			userInfo.value = {
				id: 0,
				user_name: '游客',
				is_admin: false,
				name: '游客',
				description: '这个人很懒，什么都没有留下',
				user_image:
					'/flockmaster-blogs/images/ed37644d426c7bcd4f9ca5c00.png',
				user_focus: 0,
				user_fans: 0
			};
		}
		common.addWebsiteVisit();
	});
</script>

<style lang="scss" scoped>
	.layout-container--main {
		width: 1300px;
		margin: 0 auto;
	}

	// 切换路由动画
	// .v-enter-active,
	// .v-leave-active {
	// 	transition: opacity 0.4s ease;
	// }

	// .v-enter-from,
	// .v-leave-to {
	// 	opacity: 0;
	// }
</style>
