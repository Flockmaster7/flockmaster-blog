<template>
	<div class="layout-container--header">
		<div class="header">
			<Header></Header>
		</div>
	</div>
	<div class="layout-container--main">
		<router-view></router-view>
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
		background-color: #fff;
		.header {
			position: sticky;
			top: 83px;
			width: 1350px;
			margin: 0 auto;
		}
	}
	.layout-container--main {
		width: 1200px;
		margin: 0 auto;
	}
</style>
