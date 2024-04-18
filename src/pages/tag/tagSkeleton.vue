<template>
	<div class="tag-skeleton">
		<el-skeleton-item
			variant="text"
			:style="{
				width: 70 + '%',
				height: 40 + 'px'
			}" />
		<el-skeleton-item
			variant="text"
			:style="{
				width: 50 + '%',
				height: 20 + 'px'
			}" />
		<el-skeleton-item
			variant="text"
			:style="{
				width: 100 + '%',
				height: 300 + 'px'
			}" />
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
	.tag-skeleton {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 20px;
	}
</style>
