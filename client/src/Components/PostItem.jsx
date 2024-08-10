import React, { useState, useEffect } from 'react';
import UserAvatar from './UserAvatar';
import PostContent from './PostContent';
import PostBody from './PostBody';
import PostLike from './PostLike';
import PostComment from './PostComment';
import PostShare from './PostShare';
import "./PostItem.scss";

const PostItem = ({ post, currentUser }) => {
  
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // Handle like functionality

  return (
    <div key={post.postid} className="post-container">
      <div className='header-container'>
        <UserAvatar userName={post.username} displayUsername={false} />
        <h2>{post.username}</h2>
        <p>{post.createdAgo}</p>
      </div>
      <div className="content-container">
        <PostContent content={post.content} />
      </div>
      <PostBody username={post.username} postid={post.postid} />
      <div className="reaction-container">
        <PostLike 
          post={post} 
          currentUser={currentUser} 
          liked={liked} 
          setLiked={setLiked} 
        />
        <PostComment 
          postid={post.postid} 
          showComments={showComments} 
          setShowComments={setShowComments} 
        />
        <PostShare 
          postid={post.postid} 
          currentUser={currentUser} 
        />
      </div>
    </div>
  );
};

export default PostItem;
