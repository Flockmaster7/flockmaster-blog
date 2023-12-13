<template>
	<div class="layout-container">
		<!-- 右侧边栏 -->
		<div class="left-aside">
			<LeftAside></LeftAside>
		</div>
		<!-- 主体区域 -->
		<div class="main-area">
			<TopTool></TopTool>
			<TopBg></TopBg>
			<transition
				enter-active-class="animate__animated animate__bounceInLeft">
				<router-view v-slot="{ Component }">
					<keep-alive :include="['searchResult', 'home']">
						<component :is="Component"></component>
					</keep-alive>
				</router-view>
			</transition>
		</div>
		<!-- 右侧边栏 -->
		<div class="right-aside">
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
			flex-basis: 20%;
			max-width: 20%;
			position: sticky;
			top: -50px;
			height: 767px;
		}

		.main-area {
			background: var(--theme-center-card-bg-color);
			flex-basis: 60%;
		}

		.right-aside {
			flex-basis: 20%;
			position: sticky;
			top: -70px;
			height: 784px;
		}
	}
</style>
