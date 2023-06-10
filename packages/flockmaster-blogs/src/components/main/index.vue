<template>
	<div class="container">
		<!-- 主体区域 -->
		<div class="mian">
			<router-view></router-view>
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
</style>
