<template>
	<!-- <audio
		ref="audio"
		@canplay="changeDuration"
		@timeupdate="changeSlider"></audio> -->

	<div class="control-container">
		<div class="music-slider">
			<el-slider
				:show-tooltip="false"
				v-model="currentTime"
				size="small"
				:max="sliderLength"
				@input="changeTime" />
		</div>

		<div class="music-control">
			<ControlInfo />
			<ControlButton />
			<ControlOperator />
			<!-- <div class="music-info" @click="gotoMusicDetail">
				<div class="music-cover">
					<img :src="musicCover" alt="" />
					<img
						class="music-changpain"
						src="../../static/images/changpian.png"
						alt="" />
				</div>
				{{ musicInfo }}
			</div> -->
			<!-- <div class="music-icon">
				<zb-svg-icon :size="26" name="presong" @click="music.pre" />
				<zb-svg-icon
					:size="36"
					:name="isPlay ? 'pause' : 'play'"
					@click="music.playOrPause" />
				<zb-svg-icon :size="26" name="nextsong" @click="music.next" />
			</div> -->
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed, onMounted, onUnmounted, watch } from 'vue';
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';
	// import musicConfig from '@/config/music';
	// import { useRouter } from 'vue-router';
	import ControlButton from './controlButton.vue';
	import ControlInfo from './controlInfo.vue';
	import ControlOperator from './controlOperator.vue';

	// interface Props {
	// 	audio: Ref<HTMLAudioElement | null>;
	// }

	// const { audio } = defineProps<Props>();

	// const router = useRouter();
	// const audio = ref<HTMLAudioElement | null>(null);
	// const musicInfo = computed(
	// 	() =>
	// 		musicConfig[currentIndex.value].name +
	// 		'-' +
	// 		musicConfig[currentIndex.value].artist
	// );
	// const musicCover = computed(() => musicConfig[currentIndex.value].cover);

	// const currentTime = ref(0);
	// const sliderLength = ref(100);
	// const playDuration = ref(0.0);
	const { music } = useStore();

	const { currentIndex, audio, sliderLength, currentTime } =
		storeToRefs(music);

	onMounted(() => {
		music.initMusic();
	});

	onUnmounted(() => {
		music.pauseMusic();
	});

	const changeTime = (val: number) => {
		if (audio.value) {
			currentTime.value = val;
			audio.value.currentTime = val;
			music.playMusic();
		}
	};

	// const changeSlider = () => {
	// 	currentTime.value = audio.value?.currentTime as number;
	// 	if (currentTime.value === audio.value?.duration) {
	// 		currentIndex.value += 1;
	// 		changeMusic();
	// 	}
	// };

	// const changeDuration = () => {
	// 	if (audio.value && playDuration.value !== audio.value.duration) {
	// 		//修改进度条的最大值
	// 		sliderLength.value = audio.value.duration;
	// 		//修改歌曲播放时间
	// 		playDuration.value = audio.value.duration;
	// 	}
	// };

	// const playOrPause = () => {
	// 	if (isPlay.value) pauseMusic();
	// 	else playMusic();
	// };
	// const playMusic = () => {
	// 	if (audio.value) {
	// 		isPlay.value = true;
	// 		audio.value.play();
	// 	}
	// };
	// const pauseMusic = () => {
	// 	if (audio.value) {
	// 		isPlay.value = false;
	// 		audio.value.pause();
	// 	}
	// };
	// const next = () => {
	// 	currentIndex.value += 1;
	// 	changeMusic();
	// };
	// const pre = () => {
	// 	currentIndex.value -= 1;
	// 	changeMusic();
	// };

	// const initMusic = () => {
	// 	if (audio.value) {
	// 		audio.value.src = musicConfig[currentIndex.value].url;
	// 		audio.value.load();
	// 	}
	// };

	// const changeMusic = () => {
	// 	pauseMusic();
	// 	initMusic();
	// 	playMusic();
	// };

	watch(currentIndex, () => {
		music.changeMusic();
	});

	// const gotoMusicDetail = () => {
	// 	router.push('/music/detail');
	// };
</script>

<style lang="scss" scoped>
	@import '../../static/css/mixins.scss';

	.el-slider--small {
		height: 0px !important;
	}

	.control-container {
		@include flex-column-box(0);
		@include flex-center(0);
		width: 100%;
		box-sizing: border-box;

		// background: var(--theme-box-show-2);

		.music-slider {
			@include flex-center(0);
			width: 100%;
		}

		.music-control {
			width: 90%;
			box-sizing: border-box;
			margin: 10px 0;
			@include flex-between(10px);

			// .music-info {
			// 	@include flex-center(16px);
			// 	font-size: 14px;
			// 	color: var(--theme-text-3);

			// 	.music-cover {
			// 		@include image(50px, 2px);
			// 		z-index: 1;
			// 		position: relative;

			// 		.music-changpain {
			// 			z-index: -1;
			// 			position: absolute;
			// 			top: -5px;
			// 			right: -12px;

			// 			width: 60px;
			// 			height: 60px;
			// 		}
			// 	}

			// 	&:hover {
			// 		cursor: pointer;
			// 	}
			// }

			// .music-icon {
			// 	@include flex-center(5px);
			// 	&:hover {
			// 		cursor: pointer;
			// 	}
			// }
		}
	}
</style>
