<template>
	<div class="container">
		<div class="center">
			<div class="img">
				<img src="../../static/images/logo/empty.png" alt="" />
			</div>
			<div class="text">
				{{ text }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	interface propsType {
		text: string;
	}

	const props = withDefaults(defineProps<propsType>(), {
		text: '空空如也'
	});
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 400px;
		.center {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			gap: 15px;
			.text {
				font-size: 15px;
				color: $themeColor;
			}
		}
	}
</style>
