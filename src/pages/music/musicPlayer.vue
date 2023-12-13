<template>
	<div
		id="aplayer"
		draggable="true"
		@dragstart="dragStart"
		@dragend="dragEnd"></div>
</template>

<script setup lang="ts">
	import 'aplayer/dist/APlayer.min.css';
	import APlayer from 'aplayer';
	import { onMounted, ref } from 'vue';
	import music from '@/config/music';

	onMounted(() => {
		addMyAudio();
	});

	const playerInfo = ref({
		fixed: true,
		mini: true
		// autoplay: true
	});

	const addMyAudio = () => {
		new APlayer({
			container: document.getElementById('aplayer'),
			audio: music,
			...playerInfo.value
		});
	};

	const dragStart = (e: DragEvent) => {
		console.log(e);
	};
	const dragEnd = (e: DragEvent) => {
		console.log(e);
	};
</script>

<style lang="scss" scoped>
	.aplayer {
		background: var(--theme-center-card-bg-color) !important;
	}

	.aplayer-fixed {
		bottom: 200px !important;
	}

	.aplayer-info {
		bottom: 200px !important;
	}

	:deep(.aplayer-body) {
		background: var(--theme-center-card-bg-color) !important;
		bottom: 200px !important;
	}

	:deep(.aplayer-list) {
		.aplayer-list-light {
			background: var(--theme-data-show-1) !important;
		}
		ol li:hover {
			background: var(--theme-data-show-1) !important;
		}
	}
</style>
