import { useRouter } from 'vue-router';

export default function useHistory() {
	const router = useRouter();

	const gotoBlogDetail = (id?: number) => {
		if (!id) return;
		router.push('/blog/detail?id=' + id);
	};

	return {
		gotoBlogDetail
	};
}
