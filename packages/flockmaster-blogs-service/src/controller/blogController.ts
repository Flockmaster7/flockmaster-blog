import { Context } from 'koa';
import Result from '../utils/Result';
import ERROR from '../utils/Error';
import BlogService from '../service/blogService';

const blogService = new BlogService();

class BlogController {
	async uploadBlog(ctx: Context) {
		try {
			const { blogHtml, content } = ctx.state.dataBlog;
			const params = {
				content_html: blogHtml,
				content_text: content
			};
			const data = await blogService.saveBlog(params);
			ctx.body = new Result(200, '上传文件成功', data);
		} catch (error) {
			ctx.app.emit('error', ERROR.uploadError, ctx, error);
		}
	}

	async createBlog(ctx: Context) {
		try {
			const { id, author, title } = ctx.request.body;
			const params = {
				id,
				author,
				title
			};
			const data = await blogService.createBlog(params);
			ctx.body = new Result(200, '发布博客成功', data);
		} catch (error) {
			ctx.app.emit('error', ERROR.createBlogError, ctx, error);
		}
	}
}

export default BlogController;
