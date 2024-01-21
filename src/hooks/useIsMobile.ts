import { onMounted, onUnmounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import useStore from '@/store';

export default function () {
	const { common } = useStore();
	const { isMobile } = storeToRefs(common);
	const isMobileRef = ref(false);
	const result = ref(false);

	onMounted(() => {
		result.value = window.matchMedia('(max-width: 540px)').matches;
		isMobileRef.value = result.value;
		isMobile.value = result.value;
		window.onresize = function () {
			result.value = window.matchMedia('(max-width: 540px)').matches;
		};
	});

	onUnmounted(() => {
		window.onresize = null;
	});

	watch(result, (newval) => {
		isMobileRef.value = newval;
		isMobile.value = newval;
	});

	return {
		isMobileRef
	};
}
