<template>
	<audio
		ref="audio"
		controls
		hidden="true"
		crossOrigin="anonymous"
		@canplay="music.changeDuration"
		@timeupdate="music.changeSlider"></audio>
	<div
		class="musicDetail-container"
		:style="{
			background: `url(${musicConfig[currentIndex].cover}) center center fixed`
		}">
		<zb-svg-icon name="close" @click="onClose" class="icon"></zb-svg-icon>
		<Visual />
		<Control />
	</div>
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import musicConfig from '@/config/music';
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';
	import Control from './control.vue';
	import Visual from './visual.vue';

	const router = useRouter();
	const { music } = useStore();
	const { currentIndex, audio } = storeToRefs(music);

	const onClose = () => {
		router.go(-1);
	};
</script>

<style lang="scss" scoped>
	@import '../../static/css/mixins.scss';

	.musicDetail-container {
		height: 100vh;
		opacity: 0.5;
		box-sizing: border-box;
		padding: 10px 20px;
		background-size: cover !important;
		@include close-icon();

		.visual {
			height: 80vh;
		}
	}
</style>
