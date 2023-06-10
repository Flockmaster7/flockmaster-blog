import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'blog' })
export default class Blog extends Model<Blog> {
	@Column({
		type: DataType.CHAR(64),
		allowNull: true,
		comment: '文章标题'
	})
	title: string;

	@Column({
		type: DataType.STRING,
		allowNull: true,
		comment: '文章作者'
	})
	author: string;

	@Column({
		type: DataType.STRING,
		allowNull: true,
		comment: '文章分类(1: 前端，2：后端)'
	})
	classify: string;

	@Column({
		type: DataType.TEXT,
		allowNull: true,
		comment: '文章内容(html)'
	})
	content_html: string;

	@Column({
		type: DataType.TEXT,
		allowNull: true,
		comment: '文章内容(text)'
	})
	content_text: string;
}
