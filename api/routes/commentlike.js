import express from "express";
import { dbGet, dbRun, dbAll } from "../database/connectionDB.js";

const router = express.Router();

// POST /api/commentlike - A user can like a comment
router.post("/", async (req, res) => {
    const reaction_type_id = 1; // Assuming 1 represents a 'like'
    const { username, commentid } = req.body;
    
    if (!username || !commentid) {
        return res.status(400).json({ message: "Please provide both username and comment id.", like: null });
    }

    try {
        const user = await dbGet('SELECT id FROM users WHERE username = ?', [username]);
        if (!user) {
            return res.status(404).json({ message: "User not found.", like: null });
        }

        await dbRun('INSERT INTO CommentReactions (comment_id, user_id, reaction_type_id, created_at) VALUES (?, ?, ?, ?)', 
            [commentid, user.id, reaction_type_id, new Date().toISOString()]);

        res.status(201).json({ message: `${username} liked a comment ${commentid}!`, like: true });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while trying to like a comment. Please try again later.", like: null });
    }
});

// DELETE /api/commentlike - A user can unlike a comment
router.delete("/", async (req, res) => {
    const { username, commentid } = req.body;
    
    if (!username || !commentid) {
        return res.status(400).json({ message: "Please provide both username and comment id.", like: null });
    }

    try {
        const user = await dbGet('SELECT id FROM users WHERE username = ?', [username]);
        if (!user) {
            return res.status(404).json({ message: "User not found.", like: null });
        }

        await dbRun('DELETE FROM CommentReactions WHERE comment_id = ? AND user_id = ?', [commentid, user.id]);
        res.status(200).json({ message: `${username} unliked a comment ${commentid}!`, like: true });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while trying to unlike a comment. Please try again later.", like: null });
    }
});

// GET /api/commentlike - Get the reactions for a comment
router.get("/", async (req, res) => {
    const { commentid } = req.query;

    if (!commentid) {
        return res.status(400).json({ message: "Please provide comment id.", like: null });
    }

    try {
        const reactions = await dbAll("SELECT * FROM CommentReactions WHERE comment_id = ?", [commentid]);
        res.status(200).json({ message: `Reactions for the comment ${commentid}!`, like: reactions });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching reactions for the comment. Please try again later.", reactions: null });
    }
});

export default router;
