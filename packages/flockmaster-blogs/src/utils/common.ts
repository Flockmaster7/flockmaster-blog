// 延迟交互
export const sleep = (delay: number) => {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, delay);
	});
};

export const minDelay = async <T>(promise: Promise<T>, delay: number) => {
	const [p] = await Promise.all([promise, sleep(delay)]);
	return p;
};

// 判断不为空字符串
export const validatorNotEmpty = (target: string) => {
	return target.trim() === '';
};

// 处理图片路径
export const imgUrl = (path: string) => {
	return import.meta.env.VITE_IMGURL + path;
};

// 滚动优化
export const rollingOptimization = () => {
	let timer: NodeJS.Timeout | null = null;
	window.addEventListener('scroll', function () {
		document.body.style.pointerEvents = 'none';
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			document.body.style.pointerEvents = 'auto';
		}, 100);
	});
};
