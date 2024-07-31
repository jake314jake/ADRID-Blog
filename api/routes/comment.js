import express from "express";
import { dbGet,dbRun,dbAll } from "../database/connectionDB.js";
import moment from "moment/moment.js";
const router =express.Router();

//POST /api/comment a user can add a comment to a post
router.post("/",async (req,res)=> {
 const {username,postid,content}=req.body;
 console.debug(username,postid,content)
 if (!username || !postid || !content) {
    return res.status(400).json({ message: "Please provide both username and post id.", comment: null });
}
const user = await dbGet('SELECT id FROM users WHERE username = ?', [username]);
if (!user) {
    return res.status(404).json({ message: "User not found.", comment: null });
}
try {
await dbRun('INSERT INTO Comments (post_id, user_id,content,created_at) VALUES (?, ?,?,?)', [postid,user.id, content,new Date().toISOString()]);
res.status(201).json({ message: `${username} comment on post ${postid}!`, comment: true });

    
} catch (error) {
    res.status(500).json({ message: "An error occurred while trying to comment. Please try again later.", comment: null });
    
}


})
router.get("/",async (req,res)=> {
    const {postid}=req.query;
    if(!postid){
        res.status(400).json({message:"you should provide postid",comment:null});
    }
    try {
        const comment=await dbAll("SELECT * FROM posts as p INNER JOIN comments as c ON p.id=c.post_id INNER JOIN Users AS u ON u.id=c.user_id  WHERE p.id=? ORDER BY c.created_at DESC ",[postid]);
        const comments = comment.map(c => ({
            ...c,
            createdAgo: moment(c.created_at).fromNow()
             }));
       
       
       
        res.status(200).json({message:"comment fetched ",comment:comments});
    
    } catch (error) {
        res.status(500).json({ message: "An error occurred while trying to fetch comments. Please try again later.", comment: null });
    }
    
})
export default router;