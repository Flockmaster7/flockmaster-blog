<template>
	<div class="work-container">
		<div class="work-list">
			<el-skeleton animated :loading="isLoading">
				<template #template>
					<WorkSkeleton></WorkSkeleton>
				</template>
				<template #default>
					<div
						v-for="item in workList"
						:key="item.id"
						:style="{ width: 100 + '%' }">
						<work-item :work="item"></work-item>
					</div>
				</template>
			</el-skeleton>
		</div>
		<zb-empty
			v-if="workList.length === 0 && !isLoading"
			:height="500"></zb-empty>
	</div>
</template>

<script setup lang="ts">
	import workItem from '@/pages/work/workItem.vue';
	import zbEmpty from '@/components/common/zb-empty.vue';
	import WorkSkeleton from './workSkeleton.vue';
	import { useWorkStore } from '@/store/work';
	import { storeToRefs } from 'pinia';
	import { ref } from 'vue';

	const workStore = useWorkStore();
	const params = ref({
		pageNum: 1,
		pageSize: 10
	});
	const isLoading = ref(false);
	const getWork = async () => {
		isLoading.value = true;
		await workStore.getWork(params.value.pageNum, params.value.pageSize);
		isLoading.value = false;
	};
	getWork();
	const { workList } = storeToRefs(workStore);
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.work-container {
			min-height: calc(100vh - 275px);
			padding: 25px 18px !important;
		}
	}

	.work-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 40px 40px 25px;

		.header {
			// margin-top: 45px;
			height: 60px;
			line-height: 60px;
			font-size: 40px;
			font-weight: 600;
		}

		.work-list {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 40px;
		}
	}
</style>
