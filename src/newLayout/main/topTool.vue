<template>
	<div class="top-tool-container">
		<!-- <zb-svg-icon name="search" color="#494848"></zb-svg-icon> -->
		<div class="left">
			<zb-svg-icon
				v-if="!zhankai"
				class="icon"
				name="back"
				@click="onBack"></zb-svg-icon>
		</div>
		<div class="right">
			<zb-svg-icon
				v-if="showOperator"
				class="icon"
				name="zhankai"
				:size="18"
				@click="onZhankai"></zb-svg-icon>
			<zb-svg-icon
				v-if="showOperator"
				class="icon"
				name="comment"
				:size="18"
				@click="openComment"></zb-svg-icon>
			<zb-svg-icon
				v-if="showOperator"
				class="icon"
				name="leftzhankai"
				:size="18"
				@click="openOperator"></zb-svg-icon>
		</div>
	</div>
</template>

<script setup lang="ts">
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';
	import { computed } from 'vue';
	import { useRoute, useRouter } from 'vue-router';

	const router = useRouter();
	const route = useRoute();

	const onBack = () => {
		router.go(-1);
	};

	const { common } = useStore();
	const { rightOpen, commentOpen, zhankai } = storeToRefs(common);

	const showOperator = computed(() => {
		return route.meta.operator ? true : false;
	});

	const openOperator = () => {
		rightOpen.value = !rightOpen.value;
	};

	const openComment = () => {
		commentOpen.value = !commentOpen.value;
	};

	const onZhankai = () => {
		zhankai.value = !zhankai.value;
	};
</script>

<style lang="scss" scoped>
	.top-tool-container {
		z-index: 2;
		height: 70px;
		display: flex;
		padding: 0 20px;
		align-items: center;
		justify-content: space-between;
		position: sticky;
		top: 0;
		background: var(--theme-center-card-bg-color);

		.right {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 10px;
		}
	}
	.icon:hover {
		cursor: pointer;
	}
</style>
