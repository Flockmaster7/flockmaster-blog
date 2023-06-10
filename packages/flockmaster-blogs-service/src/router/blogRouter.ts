import Router from 'koa-router';
import { auth } from '../middleware/auth';
import BlogController from '../controller/blogController';
import {
	createBlogFormValidator,
	markdownRender,
	verifyUpload
} from '../middleware/blogMiddleware';
const router = new Router({ prefix: '/blog' });

const blogController = new BlogController();

//上传md文件
router.post(
	'/upload',
	auth,
	verifyUpload,
	markdownRender,
	blogController.uploadBlog
);

router.post(
	'/create',
	auth,
	createBlogFormValidator,
	blogController.createBlog
);

module.exports = router;
