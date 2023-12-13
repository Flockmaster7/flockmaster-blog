<template>
	<div class="nav-list">
		<div
			class="nav-item"
			@click="changeTab(item)"
			v-for="(item, index) in navLinkList"
			:key="index">
			<zb-svg-icon :name="item.icon" :autoDark="true"></zb-svg-icon>
			<span>{{ item.title }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { navLinkList } from '@/config/headerNav';
	import useNavi from '@/hooks/useNavi';

	const { changeTab } = useNavi();
</script>

<style lang="scss" scoped>
	.nav-list {
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding: 40px 0;

		.nav-item {
			padding: 10px 15px;
			display: flex;
			gap: 7px;
			align-items: center;
			border-radius: 8px;
			color: var(--theme-text-show);
		}

		.nav-item:hover {
			cursor: pointer;
			background: var(--theme-data-show-2);
		}
	}
</style>
