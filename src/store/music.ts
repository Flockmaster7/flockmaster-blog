import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import musicConfig from '@/config/music';

export const useMusicStore = defineStore('data', () => {
	const currentIndex = ref(0);
	const isPlay = ref(false);
	const audio = ref<HTMLAudioElement | null>(null);
	const playDuration = ref(0.0);
	const currentTime = ref(0);
	const sliderLength = ref(100);

	const currentMusic = computed(() => musicConfig[currentIndex.value]);

	const playOrPause = () => {
		if (isPlay.value) pauseMusic();
		else playMusic();
	};

	const playMusic = () => {
		if (audio.value) {
			isPlay.value = true;
			audio.value.play();
			console.log(audio.value.src);
		}
	};

	const pauseMusic = () => {
		if (audio.value) {
			isPlay.value = false;
			audio.value.pause();
		}
	};

	const next = () => {
		if (currentIndex.value === musicConfig.length - 1) return;
		currentIndex.value += 1;
		changeMusic();
	};

	const pre = () => {
		if (currentIndex.value === 0) return;
		currentIndex.value -= 1;
		changeMusic();
	};

	const initMusic = () => {
		if (audio.value) {
			currentTime.value = 0;
			audio.value.src = musicConfig[currentIndex.value].url;
			audio.value.load();
		}
	};

	const changeMusic = () => {
		pauseMusic();
		initMusic();
		playMusic();
	};

	const changeSlider = () => {
		currentTime.value = audio.value?.currentTime as number;
		if (currentTime.value === audio.value?.duration) {
			currentIndex.value += 1;
			changeMusic();
		}
	};

	const changeDuration = () => {
		if (audio.value && playDuration.value !== audio.value.duration) {
			//修改进度条的最大值
			sliderLength.value = audio.value.duration;
			//修改歌曲播放时间
			playDuration.value = audio.value.duration;
		}
	};

	return {
		currentMusic,
		currentTime,
		audio,
		isPlay,
		currentIndex,
		playDuration,
		sliderLength,
		next,
		pre,
		initMusic,
		playOrPause,
		playMusic,
		pauseMusic,
		changeSlider,
		changeDuration,
		changeMusic
	};
});
