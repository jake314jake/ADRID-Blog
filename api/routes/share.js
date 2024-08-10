import express from 'express';
import { dbRun,dbAll } from '../database/connectionDB.js';
const router = express.Router();

// POST /api/share - Share a post with another user
router.post("/", async (req, res) => {
    const { username, usershareto, postid } = req.body;

    if (!username || !usershareto || !postid) {
        return res.status(400).json({ message: 'Missing required fields' ,share:null});
    }

    try {
        await dbRun(
            'INSERT INTO Share (username, usersharedto, postid, createdAt) VALUES (?, ?, ?, ?)',
            [username, usershareto, postid, new Date().toISOString()]
        );
        res.status(201).json({ message: 'Post shared successfully' ,share:true});
    } catch (error) {
        console.error('Error sharing post:', error);
        res.status(500).json({ message: 'Internal server error',share:null });
    }
});
// GET /api/share/  Get all shares for a specific post
router.get("/", async (req, res) => {
    const { postid } = req.query;

    // Validate input
    if (!postid) {
        return res.status(400).json({ message: 'Missing post ID' ,share:null});
    }

    try {
        const shares = await dbAll(
            'SELECT * FROM Share WHERE postid = ?',
            [postid]
        );
        res.status(200).json({  message: 'fetching shares',share:shares });
    } catch (error) {
        console.error('Error fetching shares:', error);
        res.status(500).json({ message: 'Internal server error',share:null });
    }
});

export default router;
