<template>
	<div class="container">
		<div class="header">作品集</div>
		<el-divider>
			<el-icon><star-filled /></el-icon>
		</el-divider>
		<div class="work-list">
			<div v-for="(item, index) in workList" :key="item.id">
				<div @click="gotoWorkDetail(item.work_url)">
					<work-item :work="item"></work-item>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { StarFilled } from '@element-plus/icons-vue';
	import workItem from '@/pages/work/components/zb-workItem.vue';
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
	.container {
		margin: 15px;
		background-color: $white;
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
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 20px;
		}
	}
</style>
