<template>
	<div class="work-container">
		<div class="header">作品集</div>
		<el-divider>
			<el-icon><star-filled /></el-icon>
		</el-divider>
		<div class="work-list">
			<div
				v-for="item in workList"
				:key="item.id"
				@click="gotoWorkDetail(item.work_url)"
				:style="{ width: 100 + '%' }">
				<work-item :work="item"></work-item>
			</div>
		</div>
		<zb-empty v-if="workList.length === 0" :height="500"></zb-empty>
	</div>
</template>

<script setup lang="ts">
	import { StarFilled } from '@element-plus/icons-vue';
	import workItem from '@/pages/work/components/zb-workItem.vue';
	import zbEmpty from '@/components/common/zb-empty.vue';
	import { useWorkStore } from '@/store/work';
	import { storeToRefs } from 'pinia';
	import { ref } from 'vue';

	const workStore = useWorkStore();
	const params = ref({
		pageNum: 1,
		pageSize: 10
	});
	workStore.getWork(params.value.pageNum, params.value.pageSize);
	const { workList } = storeToRefs(workStore);
	const gotoWorkDetail = (url: string) => {
		window.open(url);
	};
</script>

<style lang="scss" scoped>
	.work-container {
		background: var(--card-reset-bg);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 50px 10px 25px;

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
			gap: 20px;
		}
	}
</style>
