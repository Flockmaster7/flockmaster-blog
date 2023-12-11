<template>
	<div>
		<canvas ref="canvasRef" class="canvas"></canvas>
		<div class="bottom-area">
			<el-input v-model="barrage.text"></el-input>
			<el-button @click="sendBarrage">发送</el-button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { nextTick, ref } from 'vue';

	interface BarrageType {
		text: string;
		x: number;
		y: number;
	}

	const canvasRef = ref<HTMLCanvasElement>();

	const barrage = ref<BarrageType>({
		text: '',
		x: 600,
		y: 0
	});

	const dmList = ref<BarrageType[]>([]);
	const dmY = [18, 36, 54];
	const ctx = ref();

	// 定义方法 进行弹幕每一帧不同位置的绘制
	const draw = () => {
		// 每调用一次函数就会x坐标-1 调用频率为 每秒60帧
		dmList.value.forEach((item) => item.x--);
		// 利用requestAnimationFrame这个新特性 它可以获取到电脑的分辨率 使绘制动画更丝滑
		requestAnimationFrame(() => {
			// 每次绘制的时候都要清除上一次的位置
			// clearRect 四个值 我们要全屏清除 那么就从左上角开始 然后就是canvas的宽度了 高度随便给一个(因为只用到了前三行)
			ctx.value.clearRect(0, 0, 600, 300);
			// 等会看看不同
			// 在进行弹幕文字绘制
			dmList.value.forEach((item) =>
				ctx.value.fillText(item.text, item.x, item.y)
			);
		});
		// 每秒60帧 调用
		setTimeout(() => {
			draw();
		}, 1000 / 60);
	};

	nextTick(() => {
		if (canvasRef.value) {
			ctx.value = canvasRef.value.getContext('2d')!;
			ctx.value.font = '16px 微软雅黑';
			ctx.value.fillStyle = '#fff';
			draw();
		}
	});

	const sendBarrage = () => {
		dmList.value.push({
			text: barrage.value.text,
			// x坐标是canvas的宽度 因为我们需要从最右边滑动出左侧
			x: 600,
			// y轴需求为最上面的三行 已知要设置弹幕字体大小为18px 那么我们要设置三个位置 进行随机获取
			// dmY = [18, 36, 54] 为什么这么设置呢 因为canvas文字绘制的基点为左下角 那么第一行的位置就得是文字的大小了,也是文字的高度 如果不理解 想一想 如果基点为左上角 是不是要将 0 作为第一行,现在是左下角哈 很好理解的
			// parseInt(Math.random() * 3) 0-2三个数字随机选取
			y: 0
		});
		barrage.value.text = '';
	};
</script>

<style lang="scss" scoped>
	.canvas {
		width: 600px;
		background: url('../../../static/images/album_bg.png');
	}
	.bottom-area {
		display: flex;
		justify-content: center;
	}
</style>
