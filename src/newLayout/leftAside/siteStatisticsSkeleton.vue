<template>
	<div class="info-list">
		<div class="info-item">
			<div class="info-item-title">文章</div>
			<p class="info-item-number">
				<el-skeleton-item
					variant="text"
					:style="{ width: 20 + 'px' }" />
			</p>
		</div>
		<div class="info-item">
			<div class="info-item-title">标签</div>
			<p class="info-item-number">
				<el-skeleton-item
					variant="text"
					:style="{ width: 20 + 'px' }" />
			</p>
		</div>
		<div class="info-item">
			<div class="info-item-title">作品</div>
			<p class="info-item-number">
				<el-skeleton-item
					variant="text"
					:style="{ width: 20 + 'px' }" />
			</p>
		</div>
		<div class="info-item">
			<div class="info-item-title">留言</div>
			<p class="info-item-number">
				<el-skeleton-item
					variant="text"
					:style="{ width: 20 + 'px' }" />
			</p>
		</div>
		<div class="info-item">
			<div class="info-item-title">访问</div>
			<p class="info-item-number">
				<el-skeleton-item variant="text" />
			</p>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
	.info-list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;

		.info-item {
			width: 60px;
			padding: 8px;
			border-radius: 8px;
			background: var(--theme-data-show-2);
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
				color: #494949;
				font-weight: 600;
			}
		}
	}
</style>
