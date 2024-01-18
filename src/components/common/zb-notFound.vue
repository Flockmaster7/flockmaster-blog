<template>
	<div class="notFound-container">
		<el-result
			icon="error"
			title="404"
			sub-title="Sorry, the page you visited does not exist.">
			<template #extra>
				<el-button type="primary" @click="backHome">Back</el-button>
			</template>
		</el-result>
	</div>
</template>

<script setup lang="ts">
	import { HOME_URL } from '@/config';
	import { useRouter } from 'vue-router';

	const router = useRouter();

	const backHome = () => {
		router.replace(HOME_URL);
	};
</script>

<style lang="scss" scoped>
	.notFound-container {
		height: 100vh;
		display: flex;
		justify-content: center;
	}
</style>
