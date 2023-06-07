import { useRouter } from 'vue-router';

const router = useRouter();

const redirectToLogin = (path: string) => {
	router.replace({
		path: path
	});
};

export default {
	redirectToLogin
};
