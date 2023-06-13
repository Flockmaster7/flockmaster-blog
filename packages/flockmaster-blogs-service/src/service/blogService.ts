import Blog from '../model/Blog';
import { BlogFind, BlogObject } from '../types/blog';
import { Op } from 'sequelize';
class BlogService {
	// 添加博客
	async createBlog(blogObject: BlogObject) {
		const res = await Blog.create(blogObject as Blog);
		console.log(res.dataValues);
		return res.dataValues;
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
				'blog_image',
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
				'blog_image',
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
