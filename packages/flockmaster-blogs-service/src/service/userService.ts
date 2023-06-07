import User from '../model/User';
import { GetUserInfoParamsType, UpdateUserInfoParamsType } from '../types/user';

class UserService {
	async createUser(user_name: string, password: string): Promise<User> {
		const res = await User.create(
			{
				user_name,
				password
			} as User,
			{
				fields: ['user_name', 'password']
			}
		);
		return res.dataValues;
	}

	async getUserInfo({
		id,
		user_name,
		password,
		is_admin,
		name,
		description
	}: GetUserInfoParamsType) {
		const wrapper = {};
		id && Object.assign(wrapper, { id });
		user_name && Object.assign(wrapper, { user_name });
		password && Object.assign(wrapper, { password });
		is_admin && Object.assign(wrapper, { is_admin });
		name && Object.assign(wrapper, { name });
		description && Object.assign(wrapper, { description });
		const res = await User.findOne({
			attributes: [
				'id',
				'user_name',
				'password',
				'is_admin',
				'name',
				'description'
			],
			where: wrapper
		});
		return res ? res.dataValues : null;
	}

	async updateUser(userInfo: UpdateUserInfoParamsType) {
		const wrapper = { id: userInfo.id };
		const res = await User.update(userInfo, { where: wrapper });
		console.log(res);
		return res[0] > 0 ? true : false;
	}
}

export default UserService;
