import { addNotice } from '@/http/notice';
import cache from './cache';
import { UserInfo } from '@/types';
import { ADMIN } from '@/constant';

export const systemNotice = async (type: number) => {
	try {
		await addNotice({
			userId: cache.getCache<UserInfo>(ADMIN)?.id,
			messageId: type
		});
	} catch (error) {
		return new Error('消息通知失败');
	}
};
