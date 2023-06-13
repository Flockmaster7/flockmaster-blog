import Tag from '../model/Tag';
import { TagType } from '../types/tag';

class TagService {
	// 添加标签
	async addTag(tag: TagType) {
		const res = await Tag.create(tag as Tag, {
			fields: ['tag_name', 'tag_color', 'tag_classify']
		});
		return res.dataValues;
	}

	// 修改作品
	async modifyTag(id: number, tag: TagType) {
		const wrapper = { id };
		const res = await Tag.update(tag, { where: wrapper });
		return res[0] > 0 ? true : false;
	}

	// 删除作品
	async deleteTag(id: number) {
		const wrapper = { id };
		const res = await Tag.destroy({ where: wrapper });
		return res > 0 ? true : false;
	}

	// 获取标签列表
	async getList(pageNum: number, pageSize: number) {
		const offset = (pageNum - 1) * pageSize;
		const { count, rows } = await Tag.findAndCountAll({
			offset,
			limit: pageSize,
			attributes: [
				'id',
				'tag_name',
				'tag_color',
				'tag_classify',
				'createdAt',
				'updatedAt'
			]
		});
		console.log(count, rows);
		return {
			pageNum,
			pageSize,
			total: count,
			rows
		};
	}

	// 获取当前博客标签列表
	async getCurrentList(id: number) {}
}
export default TagService;
