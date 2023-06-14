import Blog from '../model/Blog';
import Blog_Tag from '../model/Blog_Tag';
import { BlogFind, BlogObject, Blog_tagType } from '../types/blog';
import { Op } from 'sequelize';
class BlogService {
	// 添加博客
	async createBlog(blogObject: BlogObject): Promise<Blog> {
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
	async getBlogInfo(id: string | number): Promise<Blog | null> {
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

	// 添加博客对应的文章标签
	async createBlog_tag(id: number, tags: number[]): Promise<boolean> {
		let addArr: Blog_tagType[] = [];
		tags.forEach((item) => {
			addArr.push({
				blog_id: id,
				tag_id: item
			});
		});
		const res = await Blog_Tag.bulkCreate(addArr as Blog_Tag[]);
		return res ? true : false;
	}

	// 获取博客对应标签
	async getBlog_tag(id: number): Promise<Blog_Tag[] | null> {
		const wrapper = { blog_id: id };
		const res = await Blog_Tag.findAll({ where: wrapper });
		return res ? res : null;
	}

	// 获取标签对应博客列表
	async getBlogListByTag(id: number): Promise<Blog_Tag[] | null> {
		const wrapper = { tag_id: id };
		const res = await Blog_Tag.findAll({ where: wrapper });
		let idList: number[] = [];
		res.forEach((item) => {
			idList.push(item.dataValues.blog_id);
		});
		const blogList = await Blog.findAll({
			where: { id: { [Op.or]: idList } }
		});
		return res ? res : null;
	}
}

export default BlogService;
