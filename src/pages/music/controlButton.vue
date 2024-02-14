<template>
	<div class="musicButton-container">
		<zb-svg-icon :size="26" name="presong" @click="music.pre" />
		<zb-svg-icon
			:size="36"
			:name="isPlay ? 'pause' : 'play'"
			@click="music.playOrPause" />
		<zb-svg-icon :size="26" name="nextsong" @click="music.next" />
	</div>
</template>

<script setup lang="ts">
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';

	const { music } = useStore();

	const { isPlay } = storeToRefs(music);
</script>

<style lang="scss" scoped>
	@import '../../static/css/mixins.scss';
	.musicButton-container {
		@include flex-center(5px);
		&:hover {
			cursor: pointer;
		}
	}
</style>
