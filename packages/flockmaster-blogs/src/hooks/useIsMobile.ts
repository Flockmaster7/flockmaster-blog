import { onMounted, onUnmounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import useStore from '@/store';

export default function () {
	const { common } = useStore();
	const { isMobile } = storeToRefs(common);
	const result = ref(false);

	onMounted(() => {
		result.value = window.matchMedia('(max-width: 540px)').matches;
		isMobile.value = result.value;
		window.onresize = function () {
			console.log('触发resize');
			result.value = window.matchMedia('(max-width: 540px)').matches;
		};
	});

	onUnmounted(() => {
		window.onresize = null;
	});

	watch(result, (newval) => {
		isMobile.value = newval;
	});
}
