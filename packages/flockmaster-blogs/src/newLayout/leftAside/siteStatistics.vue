<template>
	<div class="siteStatistics-container">
		<zbCard title="站点统计">
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
		</zbCard>
	</div>
</template>

<script setup lang="ts">
	import zbCard from '@/components/common/zb-card.vue';
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';

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
				width: 80px;
				padding: 8px;
				border-radius: 8px;
				background: linear-gradient(
					to bottom right,
					rgb(248, 226, 253),
					#ffffff
				);
				display: flex;
				flex-direction: column;
				justify-content: center;
				margin: 0 0 10px 0;
				padding-left: 10px;

				&-title {
					color: #ada9a9;
				}

				&-number {
					color: #494949;
					font-weight: 600;
				}
			}
		}
	}
</style>
