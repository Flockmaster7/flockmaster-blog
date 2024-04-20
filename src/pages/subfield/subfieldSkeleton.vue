<template>
	<div class="pigeonhole-skeleton">
		<div class="top">
			<el-skeleton-item
				variant="text"
				:style="{ width: 300 + 'px', height: 30 + 'px' }" />
			<el-skeleton-item
				variant="text"
				:style="{ width: 180 + 'px', height: 20 + 'px' }" />
			<el-skeleton-item
				variant="text"
				:style="{ width: 200 + 'px', height: 20 + 'px' }" />
		</div>
		<div v-for="item in 9" :key="item">
			<el-skeleton-item
				variant="text"
				:style="{ width: 100 + '%', height: 40 + 'px' }" />
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
	@import '../../static/css/mixins.scss';
	@media screen and (max-width: 540px) {
		.main {
			padding: 0 10px !important;
		}
	}
	.pigeonhole-skeleton {
		width: 100%;
		padding: 20px 40px 0;
		@include flex-column-box(20px);

		.top {
			@include flex-column-box(15px);
			align-items: center;
		}
	}
</style>
