<template>
	<div class="noticeItem-container">
		<el-skeleton-item
			variant="text"
			:style="{ height: 60 + 'px' }"
			v-for="item in 15"
			:key="item" />
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
	@import '../../static/css/mixins.scss';

	.noticeItem-container {
		@include flex-column-box(4px);
		width: 100%;
	}
</style>
