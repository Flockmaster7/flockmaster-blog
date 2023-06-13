import Router from 'koa-router';
import { auth } from '../middleware/auth';
import BlogController from '../controller/blogController';
import {
	validatorBlogForm,
	markdownRender,
	verifyUpload,
	verifyUploadImg
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

//上传文章封面
router.post('/uploadImg', auth, verifyUploadImg, blogController.uploadBlogImg);

// 添加文章
router.post('/create', auth, validatorBlogForm, blogController.createBlog);

router.get('/getdetail/:id', blogController.getBlogDetail);

router.post('/getList/:pageNum?/:pageSize?', blogController.getBlogList);

module.exports = router;
