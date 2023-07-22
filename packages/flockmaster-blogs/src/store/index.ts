import { useBlogStore } from './blog';
import { useCommonStore } from './common';
import { useLeaveWordStore } from './leaveWord';
import { useTagStore } from './tag';
import { useUserStore } from './user';
import { useWorkStore } from './work';
import pinia from '@/store/store';

export default function useStore() {
	return {
		blog: useBlogStore(pinia),
		common: useCommonStore(pinia),
		tag: useTagStore(pinia),
		user: useUserStore(pinia),
		work: useWorkStore(pinia),
		leaveWord: useLeaveWordStore(pinia)
	};
}
