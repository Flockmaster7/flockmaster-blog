<template>
	<div class="layout-container">
		<!-- 右侧边栏 -->
		<div class="left-aside" v-show="!zhankai">
			<LeftAside></LeftAside>
		</div>
		<!-- 主体区域 -->
		<div class="main-area">
			<TopTool></TopTool>
			<TopBg v-show="!zhankai"></TopBg>
			<transition
				enter-active-class="animate__animated animate__fadeInLeft">
				<router-view v-slot="{ Component }">
					<keep-alive :include="['searchResult', 'home']">
						<component :is="Component"></component>
					</keep-alive>
				</router-view>
			</transition>
		</div>
		<!-- 右侧边栏 -->
		<div class="right-aside" v-show="!zhankai">
			<RightAside></RightAside>
		</div>
	</div>
	<ZbBacktop></ZbBacktop>
	<MusicPlayer></MusicPlayer>
</template>

<script setup lang="ts">
	import MusicPlayer from '@/pages/music/musicPlayer.vue';
	import LeftAside from '../leftAside/index.vue';
	import RightAside from '../rightAside/index.vue';
	import TopBg from './topBg.vue';
	import TopTool from './topTool.vue';
	import ZbBacktop from '@/components/common/zb-backtop.vue';
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';

	const { common } = useStore();
	const { zhankai } = storeToRefs(common);
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.main-area {
			flex-basis: 100% !important;
			width: 100% !important;
		}
		.aside-area {
			display: none !important;
		}
	}
	.layout-container {
		display: flex;
		gap: 10px;
		margin: 15px 8px 15px;
		background: var(--theme-card-bg-color);
		border-radius: 10px;
		height: 100%;
		width: 1300px;
		margin: 40px auto;

		.left-aside {
			box-sizing: border-box;
			width: 260px;
			flex-shrink: 0;
			flex-basis: 20%;
			position: sticky;
			top: -300px;
			height: 1007px;
		}

		.main-area {
			background: var(--theme-center-card-bg-color);
			// flex-basis: 60%;
			flex: 1;
		}

		.right-aside {
			min-width: 260px;
			flex-shrink: 0;
			flex-basis: 20%;
			position: sticky;
			top: -70px;
			height: 784px;
		}
	}
</style>
