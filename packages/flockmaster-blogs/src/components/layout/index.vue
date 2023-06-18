<template>
	<div class="layout-container--header">
		<div class="header">
			<Header></Header>
		</div>
	</div>
	<div class="layout-container--main">
		<!-- <Transition> -->
		<router-view></router-view>
		<!-- </Transition> -->
	</div>
</template>

<script setup lang="ts">
	import Header from '@/components/header/index.vue';
	import { useUserStore } from '@/store/user';
	import { storeToRefs } from 'pinia';
	import { onMounted } from 'vue';

	const store = useUserStore();
	const { userInfo } = storeToRefs(store);

	onMounted(() => {
		store.getUserProfile();
	});
</script>

<style lang="scss" scoped>
	.layout-container--header {
		position: sticky;
		top: 0px;
		z-index: 999;
		background-color: #a4c4b5;
		.header {
			width: 1350px;
			margin: 0 auto;
		}
	}
	.layout-container--main {
		width: 1200px;
		margin: 0 auto;
	}

	// // 切换路由动画
	// .v-enter-active,
	// .v-leave-active {
	// 	transition: opacity 1.5s ease;
	// }

	// .v-enter-from,
	// .v-leave-to {
	// 	opacity: 0;
	// }
</style>
