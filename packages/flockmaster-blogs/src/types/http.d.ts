// http请求返回data类型
export interface HttpResponse<T = any> {
	readonly code: number | string;
	readonly data: T;
	readonly message: string;
}

export interface HttpError<T = any> {
	readonly code: number | string;
	readonly data: T;
	readonly message: string;
}

export interface PageRequest<T> {
	readonly pageNum: string;
	readonly pageSize: string;
	readonly total: number;
	readonly count?: number;
	readonly rows: T[];
}

export interface WebSiteInfoType {
	readonly website_visit: number;
	readonly website_visit_today: number;
}
