import Blog from '../model/Blog';
import User from '../model/User';
import { BlogObject } from '../types/blog';
class BlogService {
	// 上传博客文件
	async saveBlog(blogObject: BlogObject) {
		const res = await Blog.create(blogObject as Blog, {
			fields: ['content_html', 'content_text']
		});
		console.log(res.dataValues);
		return res.dataValues;
	}

	// 上传博客文章信息
	async createBlog(blogObject: BlogObject) {
		const wrapper = { id: blogObject.id };
		const res = await Blog.update(blogObject as Blog, {
			where: wrapper
		});
		console.log(res);
		return res[0] > 0 ? true : false;
	}
}

export default BlogService;
