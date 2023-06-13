import {
	BelongsTo,
	Column,
	DataType,
	DeletedAt,
	ForeignKey,
	Model,
	Table
} from 'sequelize-typescript';
import Blog from './Blog';

@Table({ tableName: 'tag' })
export default class Tag extends Model<Tag> {
	@Column({
		type: DataType.CHAR(64),
		allowNull: true,
		comment: '标签名称'
	})
	tag_name: string;

	@Column({
		type: DataType.STRING,
		allowNull: true,
		comment: '标签颜色'
	})
	tag_color: string;

	@Column({
		type: DataType.STRING,
		allowNull: true,
		comment: '标签所属分类'
	})
	tag_classify: string;

	@DeletedAt
	@Column({
		type: DataType.DATE,
		comment: '删除时间'
	})
	isDeleted: Date | null;
}
