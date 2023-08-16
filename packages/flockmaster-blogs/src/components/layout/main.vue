<template>
	<div class="layout-container">
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
		<div class="aside-area">
			<Aside></Aside>
		</div>
	</div>
</template>

<script setup lang="ts">
	import Aside from './aside.vue';
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
		.main-area {
			flex-basis: 75%;
		}
		.aside-area {
			flex-basis: 25%;
		}
	}
</style>
