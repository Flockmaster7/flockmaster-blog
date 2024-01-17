<template>
	<zb-card title="专栏">
		<div
			class="subfield-item"
			v-for="item in blogSubfield"
			:key="item.classify"
			@click="gotoSubfield(item.classify)">
			<div class="title">{{ allClassify[item.classify - 1].text }}</div>
			<div class="value">{{ item.count }}篇</div>
		</div>
	</zb-card>
</template>

<script setup lang="ts">
	import { allClassify } from '@/config/classify';
	import useStore from '@/store';
	import { ElMessage } from 'element-plus';
	import { storeToRefs } from 'pinia';
	import { useRouter } from 'vue-router';

	const router = useRouter();
	const { blog } = useStore();
	const { blogSubfield } = storeToRefs(blog);
	blog.getSubfieldList();

	const gotoSubfield = (classify: number) => {
		ElMessage({
			message: '正在维护中，敬请期待',
			type: 'info'
		});
		// router.push(`/subfield/${classify}`);
	};
</script>

<style lang="scss" scoped>
	.subfield-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px 6px;
		border-radius: 8px;
		font-size: 14px;
		margin: 10px 0;

		.title {
			color: var(--theme-text-3);
		}

		.value {
			color: var(--theme-text-1);
		}
	}

	.subfield-item:hover {
		cursor: pointer;
		background: var(--theme-data-show-2);
	}
</style>
