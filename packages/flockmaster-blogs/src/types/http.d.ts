// http请求返回data类型
export interface HttpResponse<T = any> {
	code: number;
	data: T;
	message: string;
}
