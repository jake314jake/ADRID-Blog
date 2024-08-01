import { dbGet, dbRun } from "../database/connectionDB.js";

const createNotficationHandler = async (req, res, next) => {
  const { recipientUsername, senderUsername,type,postId } = req;
  
  try {
   

     await dbRun('INSERT INTO Notifications (recipientUsername, senderUsername, type, postId,createAt) VALUES (?, ?, ?, ?)'
        , [recipientUsername,senderUsername,type,postId,new Date().toISOString()]);


    next(); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default createNotficationHandler;
