import express from "express";
import {dbGet,dbRun,dbAll} from "../database/connectionDB.js";
const router = express.Router();

// POST /api/follow - The user can follow another user

router.post("/", async (req, res) => {
    const { username, followUsername } = req.body;

    // Check if the required fields are provided
    if (!username || !followUsername) {
        return res.status(400).json({ message: "Please provide both username and followUsername.", user: null });
    }

    try {
        // Check if the user exists
        const user = await dbGet('SELECT id FROM users WHERE username = ?', [username]);
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: "User not found.", user: null });
        }

        // Check if the followee exists
        const followee = await dbGet('SELECT id FROM users WHERE username = ?', [followUsername]);
        console.log(followee)
        if (!followee) {
            return res.status(404).json({ message: "User to follow not found.", user: null });
        }

        // Insert the follow record
        await dbRun('INSERT INTO follows (follower_id, followee_id) VALUES (?, ?)', [user.id, followee.id]);

        res.status(201).json({ message: `${username} is now following ${followUsername}`, user: { username, followUsername } });
    } catch (error) {
        console.error('Error following user:', error);
        res.status(500).json({ message: "An error occurred while trying to follow the user. Please try again later.", user: null });
    }
});
// GET /api/follow?username=username
router.get("/", async (req, res) => {
    const { username } = req.query;
    
    if (!username) {
        return res.status(400).json({ message: "Please provide a username.", follow: null });
    }
    
    try {
        const user = await dbGet('SELECT id FROM users WHERE username = ?', [username]);
        if (!user) {
            return res.status(404).json({ message: "User not found.", follow: null });
        }
        
        const follow = await dbAll(
            'SELECT Users.id, Users.username, Users.email FROM Users JOIN Follows ON Users.id = Follows.followee_id WHERE Follows.follower_id = ?;',
            [user.id]
        );
        
        return res.status(200).json({ message: "Followers fetched successfully", follow });
    } catch (error) {
        console.error('Error fetching followers:', error);
        res.status(500).json({ message: "An error occurred while trying to get followers. Please try again later.", follow: null });
    }
});

// DELETE /api/follow - The user can unfollow another user
router.delete("/", async (req, res) => {
    const { username, followUsername } = req.body;
    console.debug(username)
    console.debug(followUsername)
    // Check if the required fields are provided
    if (!username || !followUsername) {
        return res.status(400).json({ message: "Please provide both username and followUsername.", user: null });
    }

    try {
        // Check if the user exists
        const user = await dbGet('SELECT id FROM users WHERE username = ?', [username]);
        if (!user) {
            return res.status(404).json({ message: "User not found.", user: null });
        }

        // Check if the followee exists
        const followee = await dbGet('SELECT id FROM users WHERE username = ?', [followUsername]);
        if (!followee) {
            return res.status(404).json({ message: "User to unfollow not found.", user: null });
        }

        // Delete the follow record
        await dbRun('DELETE FROM follows WHERE follower_id = ? AND followee_id = ?', [user.id, followee.id]);

        res.status(200).json({ message: `${username} has unfollowed ${followUsername}`, user: { username, followUsername } });
    } catch (error) {
        console.error('Error unfollowing user:', error);
        res.status(500).json({ message: "An error occurred while trying to unfollow the user. Please try again later.", user: null });
    }
});
// GET /api/follow/shuffle - Shuffle random N users that the user doesn't already follow
router.get("/shuffle", async (req, res) => {
    const { username } = req.query;
    const LIMIT_USERS=10

    if (!username ) {
        return res.status(400).json({ message: "Please provide  username .", users: null });
    }

    try {
        // Check if the user exists
        const user = await dbGet('SELECT id FROM users WHERE username = ?', [username]);
        if (!user) {
            return res.status(404).json({ message: "User not found.", users: null });
        }

        
        const randomUsers = await dbAll(
            `SELECT id, username, email FROM users 
             WHERE id NOT IN (SELECT followee_id FROM follows WHERE follower_id = ?)  AND id != ?
             ORDER BY RANDOM() 
             LIMIT ?`,
            [user.id,user.id,LIMIT_USERS]
        );

        res.status(200).json({ message: "Random users fetched successfully", users: randomUsers });
    } catch (error) {
        console.error('Error fetching random users:', error);
        res.status(500).json({ message: "An error occurred while trying to fetch random users. Please try again later.", users: null });
    }
});




export default router;