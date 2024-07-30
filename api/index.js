import express from "express"
import dotenv from 'dotenv';


import registerRoute from './routes/add.js'
import usersRouter from './routes/users.js'; // Import the users route handler
import loginRouter from './routes/login.js'
import logoutRouter from './routes/logout.js'
import followRouter from './routes/follow.js'
import postRouter from './routes/post.js'
import likeRouter from  './routes/like.js'
import commentRouter from './routes/comment.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
const port = process.env.PORT || 8800; 
dotenv.config();
const app= express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(express.urlencoded({ extended: true }));

// static files 



app.use('/api/users', usersRouter);
app.use('/api/register',registerRoute);
app.use('/api/login',loginRouter);
app.use('/api/logout',logoutRouter);
app.use('/api/follow',followRouter);
app.use('/api/post',postRouter);
app.use('/api/like',likeRouter);
app.use('/api/comment',commentRouter);
// Start server


  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });


