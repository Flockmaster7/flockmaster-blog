import useStore from '@/store';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { HeaderNavType } from '@/types';

export default function () {
	const { user, common } = useStore();
	const { userInfo } = storeToRefs(user);
	const { activeNav } = storeToRefs(common);

	const router = useRouter();

	const changeTab = (nav: HeaderNavType) => {
		router.push(nav.src);
		window.scrollTo({
			top: 0
		});
		common.changeActiveNav(nav.src);
	};

	return { userInfo, activeNav, changeTab };
}
