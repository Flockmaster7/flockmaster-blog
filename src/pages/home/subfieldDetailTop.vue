<template>
	<div>
		<el-card>
			<div>{{ subfieldDetail?.name }}</div>
			<div>{{ subfieldDetail?.description }}</div>
		</el-card>
	</div>
</template>

<script setup lang="ts">
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';
	import { useRoute } from 'vue-router';

	const route = useRoute();
	const { blog } = useStore();
	const { subfieldDetail } = storeToRefs(blog);
	const id = Number(route.params.classify);
	blog.getSubfieldDetailInfo(id);
</script>

<style lang="scss" scoped></style>
