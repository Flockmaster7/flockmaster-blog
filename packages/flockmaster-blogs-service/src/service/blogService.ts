import Blog from '../model/Blog';
import { BlogFind, BlogObject } from '../types/blog';
import { Op } from 'sequelize';
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

	//获取文章列表
	async getBlogList(
		pageNum: number = 1,
		pageSize: number = 10,
		wrapper: BlogFind
	) {
		const offset = (pageNum - 1) * pageSize;
		let option: any = {
			offset: offset,
			limit: pageSize * 1,
			order: [['createdAt', 'DESC']],
			attributes: [
				'id',
				'title',
				'author',
				'classify',
				'createdAt',
				'updatedAt'
			]
		};
		// 升序降序，默认降序
		if (wrapper.order) option.order[0][1] = wrapper.order;

		const filter: any = [];
		if (wrapper.author)
			filter.push({
				author: {
					[Op.like]: `%${wrapper?.author}%`
				}
			});
		if (wrapper.title)
			filter.push({
				title: {
					[Op.like]: `%${wrapper?.title}%`
				}
			});
		if (wrapper.content_text)
			filter.push({
				content_text: {
					[Op.like]: `%${wrapper?.content_text}%`
				}
			});
		if (wrapper.classify)
			filter.push({
				classify: {
					[Op.like]: `%${wrapper?.classify}%`
				}
			});
		// 传了限制条件
		if (filter.length !== 0) {
			option.where = filter;
		}
		const { count, rows } = await Blog.findAndCountAll(option);
		return {
			pageNum,
			pageSize,
			total: count,
			rows
		};
	}

	//获取文章详情
	async getBlogInfo(id: string | number) {
		const wrapper = { id };
		const res = await Blog.findOne({
			attributes: [
				'id',
				'author',
				'title',
				'classify',
				'content_text',
				'content_html',
				'createdAt',
				'updatedAt'
			],
			where: wrapper
		});
		return res ? res.dataValues : null;
	}
}

export default BlogService;
