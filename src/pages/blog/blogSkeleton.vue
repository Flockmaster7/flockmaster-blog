<template>
	<div class="blog-container-skeleton">
		<!-- 左侧 -->
		<div class="card">
			<el-skeleton-item
				variant="text"
				:style="{ width: 75 + '%', height: 40 + 'px' }" />
			<el-skeleton-item
				variant="text"
				:style="{ width: 200 + 'px', height: 15 + 'px' }" />
			<el-skeleton-item
				variant="text"
				:style="{ width: 200 + 'px', height: 15 + 'px' }" />
			<el-skeleton-item
				variant="text"
				:style="{ width: 300 + 'px', height: 15 + 'px' }" />
		</div>
		<el-skeleton-item
			variant="image"
			:style="{
				width: 100 + '%',
				height: 400 + 'px',
				borderRadius: 8 + 'px'
			}" />
		<div class="card">
			<el-skeleton-item
				v-for="item in 40"
				:key="item"
				variant="text"
				:style="{ width: 100 + '%', height: 20 + 'px' }" />
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
	@import '../../static/css/mixins.scss';
	@media screen and (max-width: 540px) {
		.blog-container {
			padding: 40px 0 !important;
		}
	}

	.blog-container-skeleton {
		position: relative;
		width: 100%;
		@include flex-column-box(20px);
		padding: 20px 0;

		.card {
			@include flex-column-box(20px);
			align-items: center;
		}

		.center-card {
			@include flex-box(10px);
		}
	}
</style>
