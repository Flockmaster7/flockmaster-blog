<template>
	<div class="layout-container">
		<!-- 主体区域 -->
		<div class="main-area">
			<!-- <Transition> -->
			<router-view></router-view>
			<!-- </Transition> -->
		</div>
		<!-- 右侧边栏 -->
		<div class="aside-area">
			<Aside></Aside>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

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
		margin: 15px 8px 0;
		.main-area {
			flex-basis: 75%;
			background-color: $white;
		}
		.aside-area {
			flex-basis: 25%;
		}
	}

	// .v-enter-active,
	// .v-leave-active {
	// 	transition: opacity 1.5s ease;
	// }

	// .v-enter-from,
	// .v-leave-to {
	// 	opacity: 0;
	// }
</style>
