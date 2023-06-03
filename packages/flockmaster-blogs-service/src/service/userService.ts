import User from '../model/User';

class UserService {
	async createUser(user_name: string, password: string) {
		const res = await User.create({
			user_name,
			password
		});
		return res;
	}

	// async getUserInfo({ id, user_name, password, is_admin }) {
	// 	const wrapper = {};
	// 	id && Object.assign(wrapper, { id });
	// 	user_name && Object.assign(wrapper, { user_name });
	// 	password && Object.assign(wrapper, { password });
	// 	is_admin && Object.assign(wrapper, { is_admin });
	// 	const res = await User.findOne({
	// 		attributes: ['id', 'user_name', 'password', 'is_admin'],
	// 		where: wrapper
	// 	});
	// 	return res ? res : null;
	// }
}

export default UserService;
