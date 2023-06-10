<template>
	<div class="header-container">
		<div class="leftBox">
			<div class="logo">
				<div class="logo--text">Flockmaster</div>
				<div class="logo--logo">blogs</div>
			</div>
		</div>
		<div class="mainBox">
			<div class="navLink" v-for="(item, index) in navLinkList">
				<router-link :to="item.src">{{ item.title }}</router-link>
			</div>
		</div>
		<div class="search">
			<el-input
				v-model="searchText"
				placeholder="你想要的这里都有"
				:suffix-icon="Search" />
		</div>
		<div class="rightBox">
			<div class="avater" @click="toUserDetail">
				<img src="@/static/images/login_bg.png" alt="" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import { navLinkList } from './nav';
	import { isLogin } from '@/utils/isLogin';
	import { Search } from '@element-plus/icons-vue';
	import { ref } from 'vue';

	const router = useRouter();

	const toUserDetail = () => {
		if (!isLogin()) return;
		router.push('/my');
	};

	const searchText = ref('');
</script>

<style lang="scss" scoped>
	.header-container {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 10px 60px;
		background-color: #fff;

		.leftBox {
			display: flex;
			justify-content: center;
			align-items: center;
			.logo {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 40px;
				line-height: 40px;
				text-align: center;
				margin-right: 30px;
				img {
					width: 40px;
					height: 40px;
					border-radius: 50%;
				}
				&--text {
					font-size: 24px;
					font-weight: 700;
					margin-left: 5px;
				}

				&--logo {
					position: relative;
					left: 5px;
					bottom: 5px;
				}
			}
		}

		.mainBox {
			display: flex;
			justify-content: center;
			align-items: center;
			.navLink {
				width: 100px;
				height: 100%;
				text-align: center;
				// border-left: 2px solid skyblue;

				a {
					color: black;
				}

				a:hover {
					color: rgb(190, 47, 47);
				}
			}
		}

		.rightBox {
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			.avater {
				img {
					width: 35px;
					height: 35px;
					border-radius: 50%;
				}
			}
		}
	}
</style>
