const getCache = <T>(key: string): T => {
	return JSON.parse(window.localStorage.getItem(key) as string);
};

const setCache = <T>(key: string, value: T) => {
	window.localStorage.setItem(key, JSON.stringify(value));
};

const removeCache = (key: string) => {
	window.localStorage.removeItem(key);
};

const clearCache = () => {
	window.localStorage.clear();
};

const getShortCache = <T>(key: string): T => {
	return JSON.parse(window.sessionStorage.getItem(key) as string);
};

const setShortCache = <T>(key: string, value: T) => {
	window.sessionStorage.setItem(key, JSON.stringify(value));
};

const removeShortCache = (key: string) => {
	window.sessionStorage.removeItem(key);
};

const clearShortCache = () => {
	window.sessionStorage.clear();
};

export default {
	getCache,
	setCache,
	removeCache,
	clearCache,
	getShortCache,
	setShortCache,
	removeShortCache,
	clearShortCache
};
