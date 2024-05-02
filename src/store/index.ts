import { useAlbumStore } from './album';
import { useBlogStore } from './blog';
import { useCircleFriendStore } from './circleFriend';
import { useCommonStore } from './common';
import { useDataStore } from './data';
import { useLeaveWordStore } from './leaveWord';
import { useMusicStore } from './music';
import { useNoticeStore } from './notice';
import { useTagStore } from './tag';
import { useUserStore } from './user';
import { useWorkStore } from './work';
import pinia from '@/store/store';

export default function useStore() {
	return {
		music: useMusicStore(pinia),
		blog: useBlogStore(pinia),
		common: useCommonStore(pinia),
		tag: useTagStore(pinia),
		user: useUserStore(pinia),
		work: useWorkStore(pinia),
		leaveWord: useLeaveWordStore(pinia),
		album: useAlbumStore(pinia),
		data: useDataStore(pinia),
		circleFriend: useCircleFriendStore(pinia),
		notice: useNoticeStore(pinia)
	};
}
