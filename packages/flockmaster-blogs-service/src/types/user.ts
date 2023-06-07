export interface UserModel {
	user_name: string;
	password?: string;
}

export interface GetUserInfoParamsType {
	id?: number | string;
	user_name?: string;
	password?: string;
	is_admin?: number;
}

export interface UpdateUserInfoParamsType {
	id?: number | string;
	user_name?: string;
	password?: string;
	is_admin?: number;
	name?: string;
	description?: string;
}
