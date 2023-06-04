import User from '../model/User';
import { GetUserInfoParamsType } from '../types/user';

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
		is_admin
	}: GetUserInfoParamsType) {
		const wrapper = {};
		id && Object.assign(wrapper, { id });
		user_name && Object.assign(wrapper, { user_name });
		password && Object.assign(wrapper, { password });
		is_admin && Object.assign(wrapper, { is_admin });
		const res = await User.findOne({
			attributes: ['id', 'user_name', 'password', 'is_admin'],
			where: wrapper
		});
		return res ? res.dataValues : null;
	}
}

export default UserService;
