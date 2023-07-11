/**
 *
 * @param type 环境
 * @returns
 */
export const getImgBaseUrl = (type: string) => {
	if (type === 'development') return 'http://localhost:7070';
	else if (type === 'production') return 'http://159.75.177.56:7070';
};
