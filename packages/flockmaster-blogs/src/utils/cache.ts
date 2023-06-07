const getCache = (key: string) => {
	return window.localStorage.getItem(key);
};

const setCache = (key: string, value: string) => {
	window.localStorage.setItem(key, value);
};

const removeCache = (key: string) => {
	window.localStorage.removeItem(key);
};

const clearCache = () => {
	window.localStorage.clear();
};

export default { getCache, setCache, removeCache, clearCache };
