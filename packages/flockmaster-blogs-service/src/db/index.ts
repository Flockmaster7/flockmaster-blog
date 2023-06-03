import { Sequelize } from 'sequelize-typescript';
import processEnv from '../config/config.default';
import path from 'path';

const { MYSQL_DB, MYSQL_HOST, MYSQL_USER, MYSQL_PWD } = processEnv;

const sequelize = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
	host: MYSQL_HOST,
	dialect: 'mysql',
	models: [
		`${path.resolve(__dirname, '../model')}/*.ts`,
		`${path.resolve(__dirname, '../model')}/*.js`
	] // 数据库模板存放地址
});

// sequelize.sync({ force: true });

sequelize
	.authenticate()
	.then(() => {
		console.log('数据库连接成功');
	})
	.catch((err: any) => {
		console.log('数据库连接失败', err);
	});

export default sequelize;
