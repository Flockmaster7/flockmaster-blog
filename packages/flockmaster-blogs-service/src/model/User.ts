import { Model, Column, Table, DataType } from 'sequelize-typescript';
import { UserModel } from '../types/user';

@Table({ tableName: 'user' })
export default class User extends Model {
	@Column({
		type: DataType.STRING,
		comment: '用户名',
		unique: true,
		allowNull: false
	})
	user_name: string;

	@Column({
		type: DataType.CHAR(64),
		comment: '密码',
		allowNull: false
	})
	password: string;
}
