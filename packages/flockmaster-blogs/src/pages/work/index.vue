<template>
	<div class="container">
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
		.work-list {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 20px;
		}
	}
</style>
