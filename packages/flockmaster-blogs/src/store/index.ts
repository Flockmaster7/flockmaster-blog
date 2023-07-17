import { useBlogStore } from './blog';
import { useCommonStore } from './common';
import { useLeaveWordStore } from './leaveWord';
import { useTagStore } from './tag';
import { useUserStore } from './user';
import { useWorkStore } from './work';

export default function useStore() {
	return {
		blog: useBlogStore(),
		common: useCommonStore(),
		tag: useTagStore(),
		user: useUserStore(),
		work: useWorkStore(),
		leaveWord: useLeaveWordStore()
	};
}
