<template>
	<div class="controlOperator-container">
		<zb-svg-icon
			:size="26"
			:name="muted ? 'jingyin' : 'shengyin'"
			@click="mute" />
		<div class="slider">
			<el-slider
				v-model="currentVolume"
				size="small"
				:max="100"
				@input="changeVolume" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';
	import { ref } from 'vue';

	const { music } = useStore();

	const { audio } = storeToRefs(music);

	const currentVolume = ref(100);
	const muted = ref(false);

	const changeVolume = (val: number) => {
		if (val === 0) {
			muted.value = true;
		} else {
			muted.value = false;
		}
		if (audio.value) {
			audio.value.volume = val / 100;
			audio.value.muted = muted.value;
		}
	};

	const controlVolume = () => {
		if (!muted.value) {
			currentVolume.value = 100;
			audio.value!.volume = 1;
		} else {
			currentVolume.value = 0;
			audio.value!.volume = 0;
		}
	};

	const mute = () => {
		muted.value = !muted.value;
		controlVolume();
		if (audio.value) audio.value.muted = muted.value;
	};
</script>

<style lang="scss" scoped>
	@import '../../static/css/mixins.scss';

	.controlOperator-container {
		@include flex-center(12px);
		width: 140px;

		.slider {
			width: 100px;
		}

		&:hover {
			cursor: pointer;
		}
	}
</style>
