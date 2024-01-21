<template>
	<div class="siteStatistics-container">
		<zbCard title="站点统计">
			<el-skeleton animated :loading="isLoading">
				<template #template>
					<SiteStatisticsSkeleton></SiteStatisticsSkeleton>
				</template>
				<template #default>
					<div class="info-list">
						<div class="info-item">
							<div class="info-item-title">文章</div>
							<p class="info-item-number">
								{{ websiteInfo.website_blogs }}
							</p>
						</div>
						<div class="info-item">
							<div class="info-item-title">标签</div>
							<p class="info-item-number">
								{{ websiteInfo.website_tags }}
							</p>
						</div>
						<div class="info-item">
							<div class="info-item-title">作品</div>
							<p class="info-item-number">
								{{ websiteInfo.website_works }}
							</p>
						</div>
						<div class="info-item">
							<div class="info-item-title">留言</div>
							<p class="info-item-number">
								{{ websiteInfo.website_leaveWords }}
							</p>
						</div>
						<div class="info-item">
							<div class="info-item-title">访问</div>
							<p class="info-item-number">
								{{ websiteInfo.website_visit }}
							</p>
						</div>
					</div>
				</template>
			</el-skeleton>
		</zbCard>
	</div>
</template>

<script setup lang="ts">
	import SiteStatisticsSkeleton from './siteStatisticsSkeleton.vue';
	import zbCard from '@/components/common/zb-card.vue';
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';

	interface PropsType {
		isLoading: boolean;
	}

	defineProps<PropsType>();

	const { common } = useStore();
	const { websiteInfo } = storeToRefs(common);
</script>

<style lang="scss" scoped>
	.siteStatistics-container {
		border-top: 1px solid #dbd8d8;

		.info-list {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;

			.info-item {
				width: 60px;
				padding: 8px;
				border-radius: 8px;
				background: var(--theme-data-show);
				display: flex;
				flex-direction: column;
				justify-content: center;
				margin: 0 0 10px 0;
				padding-left: 10px;
				gap: 5px;

				&-title {
					color: #ada9a9;
				}

				&-number {
					color: var(--theme-text-3);
					font-weight: 600;
				}
			}
		}
	}
</style>
