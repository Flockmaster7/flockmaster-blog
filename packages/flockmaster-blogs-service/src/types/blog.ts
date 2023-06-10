export interface BlogObject {
	id?: number;
	author?: string;
	title?: string;
	classify?: string;
	content_html?: string;
	content_text?: string;
}

export interface BlogFind {
	id?: number;
	author?: string;
	title?: string;
	classify?: string;
	content_text?: string;
	order?: string;
}
