import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'blog' })
export default class Blog extends Model<Blog> {
	// @Column({
	// 	type: DataType.CHAR(64),
	// 	allowNull: false,
	// 	comment: '文章标题'
	// })
	// image: string;

	@Column({
		type: DataType.CHAR(64),
		allowNull: false,
		comment: '文章标题'
	})
	title: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
		comment: '文章作者'
	})
	author: string;

	@Column({
		type: DataType.TEXT,
		allowNull: false,
		comment: '文章内容(html)'
	})
	content_html: string;

	@Column({
		type: DataType.TEXT,
		allowNull: false,
		comment: '文章内容(text)'
	})
	content_text: string;
}
