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
			const { id, author, title, classify } = ctx.request.body;
			const params = {
				id,
				author,
				title,
				classify
			};
			const data = await blogService.createBlog(params);
			ctx.body = new Result(200, '发布博客成功', data);
		} catch (error) {
			ctx.app.emit('error', ERROR.createBlogError, ctx, error);
		}
	}

	async getBlogList(ctx: Context) {
		try {
			const { pageSize, pageNum } = ctx.params;
			if (!pageSize || !pageNum)
				return ctx.app.emit('error', ERROR.FormValidatorError, ctx);
			const { content_text, author, title, order, classify } =
				ctx.request.body;
			const wrapper = {};
			content_text && Object.assign(wrapper, { content_text });
			author && Object.assign(wrapper, { author });
			title && Object.assign(wrapper, { title });
			order && Object.assign(wrapper, { order });
			classify && Object.assign(wrapper, { classify });
			const data = await blogService.getBlogList(
				pageNum,
				pageSize,
				wrapper
			);
			ctx.body = new Result(200, '获取博客列表成功', data);
		} catch (error) {
			ctx.app.emit('error', ERROR.getBlogListError, ctx, error);
		}
	}

	async getBlogDetail(ctx: Context) {
		try {
			const { id } = ctx.params;
			if (!id)
				return ctx.app.emit('error', ERROR.FormValidatorError, ctx);
			console.log(id);
			const data = await blogService.getBlogInfo(id);
			ctx.body = new Result(200, '获取文章详情成功', data);
		} catch (error) {
			ctx.app.emit('error', ERROR.getBlogDetailError, ctx, error);
		}
	}
}

export default BlogController;
