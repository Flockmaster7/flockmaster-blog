<template>
	<div class="top-tool-container">
		<!-- <zb-svg-icon name="search" color="#494848"></zb-svg-icon> -->
		<div class="left">
			<zb-svg-icon class="icon" name="back" @click="onBack"></zb-svg-icon>
		</div>
		<div class="right">
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
	const { rightOpen, commentOpen } = storeToRefs(common);

	const showOperator = computed(() => {
		return route.meta.operator ? true : false;
	});

	const openOperator = () => {
		rightOpen.value = !rightOpen.value;
	};

	const openComment = () => {
		commentOpen.value = !commentOpen.value;
	};
</script>

<style lang="scss" scoped>
	.top-tool-container {
		height: 70px;
		display: flex;
		padding: 0 20px;
		align-items: center;
		justify-content: space-between;
		z-index: 999;

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
