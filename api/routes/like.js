import express, { Router } from "express";
import {dbGet,dbRun,dbAll} from "../database/connectionDB.js";
const router = express.Router();

// POST /api/like   a user can like a post 
router.post("/",async (req,res) => {
    const reaction_type_id=1
    const { username, postid } = req.body;
    if (!username || !postid) {
        return res.status(400).json({ message: "Please provide both username and post id.", like: null });

    }
    try {
        const user = await dbGet('SELECT id FROM users WHERE username = ?', [username]);
        if (!user) {
            return res.status(404).json({ message: "User not found.", like: null });
        }
        await dbRun('INSERT INTO Reactions (post_id, user_id,reaction_type_id,created_at) VALUES (?, ?,?,?)', [postid,user.id, reaction_type_id,new Date().toISOString()]);
        res.status(201).json({ message: `${username} liked a post ${postid}!`, like: true });
        
    } catch (error) {
        
        res.status(500).json({ message: "An error occurred while trying to like a post. Please try again later.", like: null });
    }



});
// GET /api/like   GET THR REACTIONS FOR A POST
router.get("/",async (req,res)=> {
const {postid}=req.query;
try {
    if (!postid) {
        return res.status(400).json({ message: "Please provide post id.", like: null });
    
    }
    const reactions =await dbAll("SELECT * FROM Reactions as r WHERE r.post_id=? ",[postid]);
    res.status(201).json({ message: `reatcions for the  post ${postid}!`, like: reactions });
} catch (error) {
    res.status(500).json({ message: "An error occurred while trying to like a post. Please try again later.", reactions: null });

}



}) 

export default router;