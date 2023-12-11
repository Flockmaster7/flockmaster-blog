import { onMounted } from 'vue';
import useStore from '@/store';
import { storeToRefs } from 'pinia';

export default function () {
	const { user } = useStore();
	const { admin } = storeToRefs(user);

	onMounted(async () => {
		await user.getAdminInfo();
	});

	return { admin };
}
