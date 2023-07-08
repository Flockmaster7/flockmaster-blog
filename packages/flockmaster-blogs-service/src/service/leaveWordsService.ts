import LeaveWords from '../model/LeaveWords';
import User from '../model/User';

class LeaveWordsService {
	// 发布评论
	async createLeaveWords(wrapper: any) {
		const res = await LeaveWords.create(wrapper as LeaveWords);
		if (wrapper.parent_id) {
			const parentLeaveWords = await LeaveWords.findOne({
				where: {
					id: wrapper.parent_id
				}
			});
			console.log(parentLeaveWords);
			parentLeaveWords?.$add('children', res);
		}
		return res.dataValues;
	}

	// 获取评论列表
	async getLeaveWords(pageNum: number, pageSize: number) {
		const offset = (pageNum - 1) * pageSize;
		const { count, rows } = await LeaveWords.findAndCountAll({
			where: {
				parent_id: null
			},
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['id', 'name', 'user_image']
				},
				{
					model: LeaveWords,
					as: 'children',
					include: [
						{
							model: User,
							as: 'user',
							attributes: ['id', 'name', 'user_image']
						},
						{
							model: LeaveWords,
							as: 'targetLeaveWords',
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
	async deleteLeaveWords(id: number) {
		const res = await LeaveWords.destroy({
			where: {
				id
			}
		});
		return res > 0 ? true : false;
	}

	//修改留言
	async modifyLeaveWords(leaveWords: LeaveWords, id: number) {
		const res = await LeaveWords.update(leaveWords, {
			where: {
				id
			}
		});
		return res[0] > 0 ? true : false;
	}
}

export default LeaveWordsService;
