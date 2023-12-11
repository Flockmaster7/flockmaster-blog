<template>
	<div class="stickyBar-container">
		dauidhsahdsdhaih
		<!-- <div class="title">
			{{ blogDeatil.title }}
		</div>
		<div class="user-info">
			<div class="avatar">
				<img
					:src="imgUrl(blogDeatil.blog_image)"
					alt="" />
			</div>
			<div class="user-name">
				{{ blogDeatil.author }}
			</div>
		</div> -->
	</div>
</template>

<script setup lang="ts">
	import { imgUrl } from '@/utils/common';
</script>

<style lang="scss" scoped>
	.stickyBar-container {
		z-index: 999;
		position: sticky;
		width: 100%;
		top: 50px;
		background-color: $white;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
