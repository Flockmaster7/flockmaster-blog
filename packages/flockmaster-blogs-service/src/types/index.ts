export interface ResultType<T> {
	code: number;
	data: T;
	message: string;
}

export interface WebsiteType {
	website_visit: string | number;
	website_visit_today: string | number;
}
