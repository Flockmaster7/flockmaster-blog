<template>
	<div class="container">
		<div class="work-list">
			<div v-for="(item, index) in workList" :key="item.id">
				<div @click="gotoWorkDetail(item.url)">
					<work-item :work="item"></work-item>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import workItem from '@/pages/work/components/workItem.vue';
	const workList = [
		{
			id: 1,
			title: 'flockmaster-blogs',
			image: '',
			des: '个人博客',
			url: 'https://gitee.com/Flockmaster_Li/flockmaster-blogs'
		},
		{
			id: 2,
			title: 'geek-h5',
			image: '',
			des: 'react校园博客',
			url: 'https://gitee.com/Flockmaster_Li/geek-h5'
		}
	];

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
			gap: 15px;
		}
	}
</style>
