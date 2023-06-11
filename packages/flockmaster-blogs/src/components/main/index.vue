<template>
	<div class="container">
		<!-- 主体区域 -->
		<div class="mian">
			<Transition>
				<router-view></router-view>
			</Transition>
		</div>
		<!-- 右侧边栏 -->
		<div class="aside">
			<Aside></Aside>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
	.container {
		display: flex;
		.mian {
			flex-basis: 75%;
		}
		.aside {
			flex-basis: 25%;
		}
	}

	.v-enter-active,
	.v-leave-active {
		transition: opacity 1.5s ease;
	}

	.v-enter-from,
	.v-leave-to {
		opacity: 0;
	}
</style>
