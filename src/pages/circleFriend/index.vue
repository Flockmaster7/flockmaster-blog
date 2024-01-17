<template>
	<div class="circleFriend-container">
		<CircleFriendItem
			:cirFriend="item"
			v-for="item in circleFriendList"
			:key="item.id"></CircleFriendItem>
		<zb-empty :height="500" v-if="circleFriendList.length === 0" />
	</div>
</template>

<script setup lang="ts">
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';
	import CircleFriendItem from './circleFriendItem.vue';
	const { circleFriend } = useStore();

	const { circleFriendList } = storeToRefs(circleFriend);

	circleFriend.getList(1, 9);
	circleFriend.getUserDianzan();
</script>

<style lang="scss" scoped>
	.circleFriend-container {
		padding: 20px 105px 0;
		// width: 100%;
	}
</style>
