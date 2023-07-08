import { AddCommentWrapper } from '../types/comment';
import Comment from '../model/Comment';
import User from '../model/User';

class CommentService {
	// 发布评论
	async addComment(wrapper: any) {
		const res = await Comment.create(wrapper as Comment);
		if (wrapper.parent_id) {
			const parentComment = await Comment.findOne({
				where: {
					id: wrapper.parent_id
				}
			});
			console.log(parentComment);
			parentComment?.$add('children', res);
		}
		return res.dataValues;
	}

	// 获取评论列表
	async getComment(id: number, pageNum: number, pageSize: number) {
		const offset = (pageNum - 1) * pageSize;
		const { count, rows } = await Comment.findAndCountAll({
			where: {
				blog_id: id,
				parent_id: null
			},
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['id', 'name', 'user_image']
				},
				{
					model: Comment,
					as: 'children',
					include: [
						{
							model: User,
							as: 'user',
							attributes: ['id', 'name', 'user_image']
						},
						{
							model: Comment,
							as: 'targetComment',
							include: [
								{
									model: User,
									as: 'user',
									attributes: ['id', 'name', 'user_image']
								}
							]
						}
					]
				}
			],
			limit: pageSize * 1,
			offset: offset
		});
		return {
			pageNum,
			pageSize,
			count,
			rows: rows
		};
	}

	// 删除评论
	async deleteComment(id: number) {
		const res = await Comment.destroy({
			where: {
				id
			}
		});
		return res > 0 ? true : false;
	}

	//修改评论
	async modifyComment(comment: Comment, id: number) {
		const res = await Comment.update(comment, {
			where: {
				id
			}
		});
		return res[0] > 0 ? true : false;
	}
}

export default CommentService;
