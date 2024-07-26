import { dbGet, dbRun } from "../database/connectionDB.js";

const createPostHandler = async (req, res, next) => {
  const { username, content } = req.body;
  console.log('user',username);
  try {
    console.log('createPostHandler: Start', { username, content });

    const user = await dbGet('SELECT id FROM Users WHERE username = ?', [username]);

    if (!user) {
      console.log('createPostHandler: User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    const postResult = await dbRun('INSERT INTO Posts (user_id, content, created_at) VALUES (?, ?, ?)', [
      user.id,
      content,
      new Date().toISOString()
    ]);

    if (!postResult || postResult.lastID === undefined) {
    
      return res.status((500)).json({ message: 'Failed to retrieve post ID' });
    }

    req.postId = postResult.lastID; 
    req.username=username

    console.log('createPostHandler: Success', { postId: req.postId, username: req.username });

    next(); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default createPostHandler;
