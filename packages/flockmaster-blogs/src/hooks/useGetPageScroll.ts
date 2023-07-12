import {
	Ref,
	nextTick,
	onBeforeMount,
	onMounted,
	reactive,
	ref,
	toRefs
} from 'vue';

export default function (el?: HTMLDivElement) {
	const scrollObj = reactive({
		x: 0,
		y: 0
	});
	// 触发滚动条事件
	onMounted(() => {
		window.onscroll = () => {
			scrollObj.x = parseInt(window.scrollX + '');
			scrollObj.y = parseInt(window.scrollY + '');
		};
	});

	onBeforeMount(() => {
		window.onscroll = null;
	});
	return { ...toRefs(scrollObj) };
}
