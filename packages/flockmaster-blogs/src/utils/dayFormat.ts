import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';

// dayjs引入
dayjs.extend(relativeTime); // 相对时间
dayjs.locale('zh-cn'); // 使用本地化语言

export const getTimeFormNow = (time: string) => {
	return dayjs(time).fromNow().replace(' ', '');
};
