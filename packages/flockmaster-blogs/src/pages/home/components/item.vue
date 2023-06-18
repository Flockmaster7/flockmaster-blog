<template>
	<div class="card"></div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
	.card {
		width: 300px;
		height: 400px;
		position: absolute;
		background-color: #fff;
		transform-style: preserve-3d;
		transform: perspective(2000px);
		box-shadow: inset 300px 0 50px rgba(0, 0, 0, 0.5),
			0 20px 100px rgba(0, 0, 0, 0.5);
	}
</style>
