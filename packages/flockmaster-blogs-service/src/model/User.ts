import {
	Model,
	Column,
	Table,
	DataType,
	DeletedAt
} from 'sequelize-typescript';

@Table({ tableName: 'user' })
export default class User extends Model<User> {
	@Column({
		type: DataType.STRING,
		comment: '用户账号',
		unique: true,
		allowNull: false
	})
	user_name: string;

	@Column({
		type: DataType.CHAR(64),
		comment: '用户密码',
		allowNull: false
	})
	password: string;

	@Column({
		type: DataType.BOOLEAN,
		allowNull: false,
		defaultValue: 0,
		comment: '是否为管理员, 0不是, 1是'
	})
	is_admin: number;

	@Column({
		type: DataType.STRING,
		comment: '用户名',
		allowNull: true
	})
	name: string;

	@Column({
		type: DataType.CHAR(255),
		comment: '用户签名',
		allowNull: true
	})
	description: string;

	@DeletedAt
	@Column({
		type: DataType.DATE,
		comment: '删除时间'
	})
	isDeleted: Date | null;
}
