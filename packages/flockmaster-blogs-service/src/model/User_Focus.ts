import {
	Column,
	DataType,
	DeletedAt,
	ForeignKey,
	Model,
	Table
} from 'sequelize-typescript';
import User from './User';
import Blog from './Blog';

@Table({ tableName: 'user_focus' })
export default class User_Focus extends Model<User_Focus> {
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
		comment: '关联id'
	})
	id: number = 1;

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: true,
		comment: '被关注用户id'
	})
	focus_id: number;

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: true,
		comment: '关注用户id'
	})
	fans_id: number;

	// @DeletedAt
	// @Column({
	// 	type: DataType.DATE,
	// 	comment: '删除时间'
	// })
	// isDeleted: Date | null;
}
