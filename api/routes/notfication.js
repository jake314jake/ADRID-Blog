import express from "express";
import {dbGet,dbRun,dbAll} from "../database/connectionDB.js";
import moment from "moment/moment.js";
const router = express.Router();

// POST /api/notify   notify a user for an event 
router.post("/",async (req,res) => {
    const { username,type } = req.body;
    console.debug(username)
    console.debug(type)
    try {
        await dbRun('INSERT INTO Notifications (username, type,createdAt) VALUES (?, ?, ?)'
            , [username,type,new Date().toISOString()]);

        res.status(201).json({ message: 'Notification created successfully' ,notfication:true });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error',notfication:null });
    }
})
// GET /api/notify    get notfication for a user
router.get("/",async (req,res)=> {
    const { username } = req.query
    try {
        const notification= await dbAll("SELECT * FROM Notifications WHERE isRead=0 AND username=? "
            ,[username]
        )
        const notifications = notification.map(n => ({
            ...n,
            createdAgo: moment(n.createdAt).fromNow()
             }));
        res.status(200).json({ message: 'Notification fetched successfully' ,notfication:notifications });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error',notfication:null });
    }

})
// PATCH /api    make a noyfication as reade
router.patch("/",async (req,res)=> {
    const { notficationID} = req.body;
    try {
        await dbGet("UPDATE Notifications SET isRead=1 WHERE id=? ",[notficationID])
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error',notfication:null });
        
    }
})
export default router;