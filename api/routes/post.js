// routes/postRouter.js
import fs from 'fs';
import path from 'path';
import express from 'express';
import moment from 'moment/moment.js';
import fileUpload from 'express-fileupload';
import createPostHandler from '../utils/createPostHandler.js';
import uploadFileHandler from '../utils/uploadFileHandler.js';
import saveImageHandler from '../utils/saveImageHandler .js';
import saveTagHandler from '../utils/saveTagHandler.js';
import { dbAll } from '../database/connectionDB.js';



const router = express.Router();
router.use(fileUpload());
// Create a new post, handle file upload, and add image details POST /api/post
router.post('/',createPostHandler,uploadFileHandler,saveImageHandler,saveTagHandler, (req, res) => {
    res.status(201).json({ message: 'Post created successfully', postId: req.postId ,tags:req.tags});
});
// retrive a user posts GET /api/post
router.get("/",async (req,res)=>{
    const { username, fetchFriendsPosts = 'true' } = req.query;
    if (!username) {
        return res.status(400).json({ message: "Please provide a username.", post: null });
    }
    const shouldFetchFriendsPosts = fetchFriendsPosts.toLowerCase() === 'true';
        try {
            let query;
        let queryParams = [username];

        if (shouldFetchFriendsPosts) {
            query = `
                SELECT p.id as postid, p.content, p.created_at, u.username
                FROM Posts p
                INNER JOIN Users u ON p.user_id = u.id
                WHERE u.username = ? OR u.id IN (
                    SELECT followee_id FROM Follows
                    INNER JOIN Users u2 ON Follows.follower_id = u2.id
                    WHERE u2.username = ?
                )
                ORDER BY p.created_at DESC
            `;
            queryParams.push(username);
        } else {
            query = `
                SELECT p.id as postid, p.content, p.created_at, u.username
                FROM Posts p
                INNER JOIN Users u ON p.user_id = u.id
                WHERE u.username = ?
                ORDER BY p.created_at DESC
            `;
        }

        const post = await dbAll(query, queryParams);
       if (!post) {
        return res.status(200).json({ message: "No avaliable posts", post: null });
          }
        // Add createdAgo attribute to each post
         const posts = post.map(p => ({
        ...p,
        createdAgo: moment(p.created_at).fromNow()
         }));
          return res.status(200).json({ message: "Posts fetched successfully", post:posts });
       } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: "An error occurred while trying to get posts. Please try again later.", post: post });
        }

    
});
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