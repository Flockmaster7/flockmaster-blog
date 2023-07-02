import User_Focus from '../model/User_Follow';

class User_FocusService {
	// 删除
	async deleteUserFollow(focus_id: number, fans_id: number) {
		const wrapper = {
			focus_id,
			fans_id
		};
		const res = await User_Focus.destroy({ where: wrapper });
		return res > 0 ? true : false;
	}
}

export default User_FocusService;
