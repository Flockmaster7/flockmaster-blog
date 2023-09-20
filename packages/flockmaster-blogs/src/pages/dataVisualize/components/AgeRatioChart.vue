<template>
	<!-- 年龄比例 -->
	<div id="AgeRatioChart" class="echarts"></div>
</template>

<script setup lang="ts">
	import { ECharts, EChartsOption, init } from 'echarts';
	interface ChartProp {
		value: string;
		name: string;
		percentage: string;
	}
	const initChart = (data: any): ECharts => {
		const charEle = document.getElementById('AgeRatioChart') as HTMLElement;
		const charEch: ECharts = init(charEle);
		/* echarts colors */
		const colors = [
			'#F6C95C',
			'#EF7D33',
			'#1F9393',
			'#184EA1',
			'#81C8EF',
			'#9270CA'
		];
		const option: EChartsOption = {
			color: colors,
			// 配置提示框组件，用于在鼠标悬停在图表上时显示提示信息
			tooltip: {
				show: true,
				trigger: 'item',
				formatter: '{b} <br/>占比：{d}%'
			},
			// 配置图例组件，用于展示图表的数据项及其对应的颜色
			legend: {
				orient: 'vertical',
				right: '20px',
				top: '15px',
				itemGap: 15,
				itemWidth: 14,
				formatter: function (name) {
					let text = '';
					data.forEach((val: ChartProp) => {
						if (val.name === name) {
							text = ' ' + name + '　 ' + val.percentage;
						}
					});
					return text;
				},
				textStyle: {
					color: '#fff'
				}
			},
			// 配置网格组件，用于控制图表的位置和大小
			grid: {
				top: 'bottom',
				left: 10,
				bottom: 10
			},
			series: [
				{
					zlevel: 1,
					name: '分类文章比例',
					type: 'pie',
					selectedMode: 'single',
					radius: [50, 90],
					center: ['35%', '50%'],
					startAngle: 60,
					// hoverAnimation: false,
					label: {
						position: 'inside',
						show: true,
						color: '#fff',
						formatter: function (params: any) {
							return params.data.percentage;
						},
						rich: {
							b: {
								fontSize: 16,
								lineHeight: 30,
								color: '#fff'
							}
						}
					},
					itemStyle: {
						shadowColor: 'rgba(0, 0, 0, 0.2)',
						shadowBlur: 10
					},
					data: data.map((val: ChartProp, index: number) => {
						return {
							value: val.value,
							name: val.name,
							percentage: val.percentage,
							itemStyle: {
								borderWidth: 10,
								shadowBlur: 20,
								borderColor: colors[index],
								borderRadius: 10
							}
						};
					})
				},
				{
					name: '',
					type: 'pie',
					selectedMode: 'single',
					radius: [50, 90],
					center: ['35%', '50%'],
					startAngle: 60,
					data: [
						{
							value: 1000,
							name: '',
							label: {
								show: true,
								formatter: '{a|占比}',
								rich: {
									a: {
										align: 'center',
										color: 'rgb(98,137,169)',
										fontSize: 14
									}
								},
								position: 'center'
							}
						}
					]
				}
			]
		};
		charEch.setOption(option);
		return charEch;
	};
	defineExpose({
		initChart
	});
</script>
<style lang="scss" scoped>
	.echarts {
		width: 100%;
		height: 100%;
	}
</style>
