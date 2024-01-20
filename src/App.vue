<template>
	<vue-particles id="tsparticles" :options="particleOption" />
	<router-view></router-view>
</template>

<script lang="ts" setup>
	import particleOption from '@/config/particles.json';
</script>

<style scoped lang="scss">
	#tsparticles {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		// background: #000000;
		z-index: -10;
	}
</style>
