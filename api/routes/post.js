// routes/postRouter.js
import fs from 'fs';
import path from 'path';
import express from 'express';
import fileUpload from 'express-fileupload';
import createPostHandler from '../utils/createPostHandler.js';
import uploadFileHandler from '../utils/uploadFileHandler.js';
import saveImageHandler from '../utils/saveImageHandler .js';
import { dbAll } from '../database/connectionDB.js';



const router = express.Router();
router.use(fileUpload());
// Create a new post, handle file upload, and add image details POST /api/post
router.post('/',createPostHandler,uploadFileHandler,saveImageHandler, (req, res) => {
    res.status(201).json({ message: 'Post created successfully', postId: req.postId });
});
// retrive a user posts GET /api/post
router.get("/",async (req,res)=>{
    const {username}=req.query
    if (!username) {
        return res.status(400).json({ message: "Please provide a username.", post: null });
    }
        try {
       const post=  await dbAll("SELECT * from Posts as p INNER join Users as u ON  p.user_id=u.id where  u.username=?",[username])
       if (!post) {
        return res.status(200).json({ message: "No avaliable posts", post: null });
          }
          return res.status(200).json({ message: "Posts fetched successfully", post:post });
       } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: "An error occurred while trying to get posts. Please try again later.", post: post });
        }

    
})
router.get('/image/:username/:postId', (req, res) => {
    const { username, postId } = req.params;
    const imageDir = `public/upload/post/${username}/${postId}`;
    
    fs.readdir(imageDir, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return res.status(404).json({ message: 'Image not found' });
        }

        if (files.length === 0) {
            return res.status(404).json({ message: 'Image not found' });
        }

        const imagePath = path.resolve(imageDir, files[0]);
        res.sendFile(imagePath);
    });
});
export default router