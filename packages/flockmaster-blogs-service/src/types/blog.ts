import { TagType } from './tag';

export interface BlogObject {
	dataValues?: {
		id?: number;
		author?: string;
		title?: string;
		classify?: string;
		content_html?: string;
		content_text?: string;
		blog_image?: string;
		tags?: TagType[];
	};
	id?: number;
	author?: string;
	title?: string;
	classify?: string;
	content_html?: string;
	content_text?: string;
	blog_image?: string;
	tags?: TagType[];
}

export interface BlogFind {
	id?: number;
	author?: string;
	title?: string;
	classify?: string;
	content_text?: string;
	order?: string;
}

export interface Blog_tagType {
	blog_id: number;
	tag_id: number;
}
