// routes/postRouter.js
import express from 'express';
import fileUpload from 'express-fileupload';
import createPostHandler from '../utils/createPostHandler.js';
import uploadFileHandler from '../utils/uploadFileHandler.js';
import saveImageHandler from '../utils/saveImageHandler .js';



const router = express.Router();
router.use(fileUpload());
// Create a new post, handle file upload, and add image details POST /api/post
router.post('/',createPostHandler,uploadFileHandler,saveImageHandler, (req, res) => {
    res.status(201).json({ message: 'Post created successfully', postId: req.postId });
});

export default router