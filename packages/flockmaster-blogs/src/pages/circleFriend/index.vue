<template>
	<div class="circleFriend-container">
		<CircleFriendItem></CircleFriendItem>
		<CircleFriendItem></CircleFriendItem>
		<CircleFriendItem></CircleFriendItem>
	</div>
</template>

<script setup lang="ts">
	import CircleFriendItem from './circleFriendItem.vue';
</script>

<style lang="scss" scoped>
	.circleFriend-container {
		padding: 20px 70px 0;
		width: 100%;
	}
</style>
