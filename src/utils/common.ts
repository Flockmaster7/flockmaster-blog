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

/**
 * @description 生成随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @returns {Number}
 */
export function randomNum(min: number, max: number): number {
	let num = Math.floor(Math.random() * (min - max) + max);
	return num;
}

export function extractDominantColor(imageUrl: string) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.crossOrigin = 'Anonymous';
		img.onload = function () {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			canvas.width = img.width;
			canvas.height = img.height;
			ctx?.drawImage(img, 0, 0, img.width, img.height);
			const imageData = ctx?.getImageData(
				0,
				0,
				canvas.width,
				canvas.height
			).data!;
			const colorCount: { [key: string]: any } = {};
			let maxCount = 0;
			let dominantColor = null;

			for (let i = 0; i < imageData?.length; i += 4) {
				const r = imageData[i];
				const g = imageData[i + 1];
				const b = imageData[i + 2];
				const rgb = `${r},${g},${b}`;

				if (colorCount[rgb]) {
					colorCount[rgb]++;
				} else {
					colorCount[rgb] = 1;
				}

				if (colorCount[rgb] > maxCount) {
					maxCount = colorCount[rgb];
					dominantColor = rgb;
				}
			}

			resolve(dominantColor);
		};

		img.onerror = function () {
			reject(new Error('Failed to load image'));
		};

		img.src = imageUrl;
	});
}
