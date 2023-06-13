import {
	Column,
	DataType,
	DeletedAt,
	Model,
	Table
} from 'sequelize-typescript';

@Table({ tableName: 'blog_tag' })
export default class Blog_Tag extends Model<Blog_Tag> {
	@Column({
		type: DataType.INTEGER,
		allowNull: true,
		comment: '博客id'
	})
	blog_id: number;

	@Column({
		type: DataType.INTEGER,
		allowNull: true,
		comment: '标签id'
	})
	tag_id: number;

	@Column({
		type: DataType.DATE,
		comment: '删除时间'
	})
	isDeleted: Date | null;
}
