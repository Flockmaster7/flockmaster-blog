import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useCommonStore } from '@/store/common';
import { storeToRefs } from 'pinia';

export default function () {
	const commonStore = useCommonStore();
	const { isMobile } = storeToRefs(commonStore);
	const result = ref(false);

	onMounted(() => {
		result.value = window.matchMedia('(max-width: 540px)').matches;
		isMobile.value = result.value;
		window.onresize = function () {
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
