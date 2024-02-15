<template>
	<div class="musicButton-container">
		<zb-svg-icon :size="26" name="presong" @click="music.pre" />
		<zb-svg-icon
			:size="36"
			color="#5cbfef"
			:name="isPlay ? 'pause' : 'play'"
			@click="music.playOrPause" />
		<zb-svg-icon :size="26" name="nextsong" @click="music.next" />
	</div>
</template>

<script setup lang="ts">
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';
	import { onUnmounted } from 'vue';

	const { music } = useStore();

	const { isPlay, currentIndex } = storeToRefs(music);

	onUnmounted(() => {
		isPlay.value = false;
		currentIndex.value -= 1;
	});
</script>

<style lang="scss" scoped>
	@import '../../static/css/mixins.scss';
	.musicButton-container {
		@include flex-center(20px);
		&:hover {
			cursor: pointer;
		}
	}
</style>
