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
			<transition enter-active-class="animate__animated animate__fadeIn">
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
	<MobileNav />
	<ZbBacktop></ZbBacktop>
	<MusicPlayer v-if="!isMobileRef"></MusicPlayer>
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
	import MobileNav from './mobileNav.vue';
	import useIsMobile from '@/hooks/useIsMobile';

	const { common } = useStore();
	const { zhankai } = storeToRefs(common);
	const { isMobileRef } = useIsMobile();
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.layout-container {
			max-width: 100vw;
			margin: 0 !important;
		}

		.left-aside,
		.right-aside {
			display: none !important;
		}
	}

	.layout-container {
		display: flex;
		gap: 10px;
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
			width: 760px;
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
