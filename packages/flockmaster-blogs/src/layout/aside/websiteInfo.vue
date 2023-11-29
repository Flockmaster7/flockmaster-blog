<template>
	<el-card>
		<el-collapse v-model="activeWebsiteInfo">
			<el-collapse-item name="1">
				<template #title>
					<el-icon class="head-icon"><Monitor /></el-icon>
					<text class="head-text"> 网站资讯 </text>
				</template>
				<div class="change-dark">
					总访问量:
					{{ websiteInfo.website_visit }}
				</div>
				<div class="change-dark">
					今日访问量:
					{{ websiteInfo.website_visit_today }}
				</div>
				<div class="change-dark">
					网站已运行:
					{{ workDay }}天
				</div>
			</el-collapse-item>
		</el-collapse>
	</el-card>
</template>

<script lang="ts" setup>
	import useStore from '@/store';
	import { getWorkDay } from '@/utils/dayFormat';
	import { storeToRefs } from 'pinia';
	import { ref, computed } from 'vue';

	const { common } = useStore();
	const { websiteInfo } = storeToRefs(common);
	const activeWebsiteInfo = ref(['1']);

	const workDay = computed(() => {
		return getWorkDay('2023-6-17');
	});
</script>

<style lang="scss" scoped></style>
