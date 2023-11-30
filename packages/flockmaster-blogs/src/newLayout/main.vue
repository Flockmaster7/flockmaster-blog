<template>
	<div class="layout-container">
		<!-- 右侧边栏 -->
		<div class="left-aside">
			<LeftAside></LeftAside>
		</div>
		<!-- 主体区域 -->
		<div class="main-area">
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
</template>

<script setup lang="ts">
	import Aside from './aside/index.vue';
	import LeftAside from './leftAside/index.vue';
	import RightAside from './rightAside/index.vue';
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
		background: hsla(0, 0, 100%, 0.7);
		border-radius: 10px;

		.left-aside {
			flex-basis: 20%;
			max-width: 20%;
		}
		.main-area {
			background-color: #fff;
			flex-basis: 60%;
		}
		.right-aside {
			flex-basis: 20%;
		}
	}
</style>
