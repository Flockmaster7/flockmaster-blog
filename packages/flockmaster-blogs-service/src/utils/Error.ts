const errorForm = (code: string | number, message: string, data: string) => {
	return {
		code,
		message,
		data
	};
};

export default {
	userFormateError: errorForm('10001', '用户名或密码不能为空', ''),
	userAlreadExist: errorForm('10002', '用户已经存在', ''),
	userRegisterError: errorForm('10003', '用户注册失败', ''),
	userDoesNotExist: errorForm('10004', '用户不存在', ''),
	userLoginError: errorForm('10005', '用户登录失败', ''),
	validatPasswordError: errorForm('10006', '密码错误', ''),
	tokenExpiredError: errorForm('401', 'token已过期', ''),
	invalidTokenError: errorForm('10102', '无效token', ''),
	userChangePasswordError: errorForm('10007', '修改密码失败', ''),
	getUserInfoError: errorForm('10008', '获取用户信息失败', ''),
	updateUserInfoError: errorForm('10009', '修改用户信息失败', '')
};
