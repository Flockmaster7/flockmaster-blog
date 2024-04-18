<template>
	<div class="music-info" @click="gotoMusicDetail">
		<div class="music-cover">
			<img :src="musicCover" alt="" />
			<img
				class="music-changpain"
				src="../../static/images/changpian.png"
				alt="" />
		</div>
		{{ musicInfo }}
	</div>
</template>

<script setup lang="ts">
	import musicConfig from '@/config/music';
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';
	import { computed } from 'vue';
	import { useRouter } from 'vue-router';

	const { music } = useStore();
	const router = useRouter();

	const { currentIndex } = storeToRefs(music);

	const musicInfo = computed(
		() =>
			musicConfig[currentIndex.value]?.name +
			' - ' +
			musicConfig[currentIndex.value]?.artist
	);
	const musicCover = computed(() => musicConfig[currentIndex.value]?.cover);

	const gotoMusicDetail = () => {
		return;
		// router.push('/music/detail');
	};
</script>

<style lang="scss" scoped>
	@import '../../static/css/mixins.scss';

	.music-info {
		@include flex-center(16px);
		font-size: 14px;
		color: var(--theme-text-3);

		.music-cover {
			@include image(50px, 2px);
			z-index: 1;
			position: relative;

			.music-changpain {
				z-index: -1;
				position: absolute;
				top: -5px;
				right: -12px;

				width: 60px;
				height: 60px;
			}
		}

		&:hover {
			cursor: pointer;
		}
	}
</style>
