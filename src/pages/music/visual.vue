<template>
	<div class="visual-container">
		<canvas ref="canvas" id="canvas"></canvas>
	</div>
</template>

<script setup lang="ts">
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';
	import { onMounted, ref } from 'vue';

	const { music } = useStore();
	const { audio } = storeToRefs(music);

	const canvas = ref<HTMLCanvasElement>();
	const audioContext = ref<AudioContext | null>(null);
	const audioSource = ref<MediaElementAudioSourceNode | null>(null);
	const audioAnalyser = ref<AnalyserNode | null>(null);
	const ctx = ref();

	const render = () => {
		// 利用cancas渐变进行音频绘制
		if (!canvas.value) return;
		ctx.value = canvas.value?.getContext('2d')!;
		canvas.value.width = 1500;
		canvas.value.height = 500;
		const oW = canvas.value.width;
		const oH = canvas.value.height;
		const color1 = ctx.value.createLinearGradient(
			oW / 2,
			oH / 2 - 30,
			oW / 2,
			oH / 2 - 100
		);
		const color2 = ctx.value.createLinearGradient(
			oW / 2,
			oH / 2 + 30,
			oW / 2,
			oH / 2 + 100
		);
		color1?.addColorStop(0, '#000');
		color1?.addColorStop(0.5, '#069');
		color1?.addColorStop(1, '#f6f');
		color2?.addColorStop(0, '#000');
		color2?.addColorStop(0.5, '#069');
		color2?.addColorStop(1, '#f6f');
		// 音频图的条数
		const count = 150;
		// // 缓冲区:进行数据的缓冲处理，转换成二进制数据
		const voiceHeight = new Uint8Array(
			audioAnalyser.value?.frequencyBinCount!
		);

		function draw() {
			// 将当前的频率数据复制到传入的无符号字节数组中，做到实时连接
			audioAnalyser.value?.getByteFrequencyData(voiceHeight);

			// 自定义获取数组里边数据的频步
			const step = Math.round(voiceHeight.length / count);
			ctx.value.clearRect(0, 0, oW, oH);
			for (let i = 0; i < count; i++) {
				let audioHeight = voiceHeight[step * i];
				ctx.value.fillStyle = color1; // 绘制向上的线条
				ctx.value.fillRect(oW / 2 + i * 10, oH / 2, 7, -audioHeight);
				ctx.value.fillRect(oW / 2 - i * 10, oH / 2, 7, -audioHeight);
				ctx.value.fillStyle = color2; // 绘制向下的线条
				ctx.value.fillRect(oW / 2 + i * 10, oH / 2, 7, audioHeight);
				ctx.value.fillRect(oW / 2 - i * 10, oH / 2, 7, audioHeight);
			}
			window.requestAnimationFrame(draw);
		}
		draw();
	};

	onMounted(() => {
		audioContext.value = new AudioContext();
		audioSource.value = audioContext.value.createMediaElementSource(
			audio.value!
		);
		audioAnalyser.value = audioContext.value.createAnalyser();
		audioSource.value.connect(audioAnalyser.value);
		audioAnalyser.value.connect(audioContext.value.destination);
		render();
	});
</script>

<style lang="scss" scoped>
	.visual-container {
		height: 80vh;

		#canvas {
			display: block;

			background: linear-gradient(
				135deg,
				rgb(142, 13, 133) 0%,
				rgb(230, 132, 110) 100%
			);
		}
	}
</style>
