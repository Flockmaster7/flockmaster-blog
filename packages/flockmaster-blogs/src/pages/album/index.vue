<template>
	<div class="flex justify-center">
		<div class="text-6xl">11</div>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
	.album-container {
		min-height: 700px;
		padding: 20px 15px 0;
		background: var(--card-reset-bg);
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		gap: 30px;

		.item {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
