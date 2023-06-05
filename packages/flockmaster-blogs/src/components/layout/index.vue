<template>
	<div class="layout-container">
		<div class="layout-container--header">
			<Header></Header>
		</div>
	</div>
	<div class="layout-container--main">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
	import Header from '../header/index.vue';
</script>

<style lang="scss" scoped>
	.layout-container {
		background-color: #fff;

		&--header {
			width: 1535px;
			margin: 0 auto;
		}

		&--main {
			width: 1535px;
			margin: 0 auto;
		}
	}
</style>
