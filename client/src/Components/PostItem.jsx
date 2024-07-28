import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import UserAvatar from './UserAvatar';
import axios from 'axios';

const fetchLikes = async (postId) => {
  const { data } = await axios.get('/api/like', {
    params: { postid: postId }
  });
  return data.like.length;
};

const PostItem = ({ post, currentUser }) => {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const { data: likesCount, isLoading: isLoadingLikes } = useQuery({
    queryKey: ['likes', post.postid],
    queryFn: () => fetchLikes(post.postid)
  });

  return (
    <div key={post.postid} className="post-container">
      <div className='header-container'>
        <UserAvatar userName={currentUser.user.username} displayUsername={false}></UserAvatar>
        <h2>{post.username}</h2>
        <p>{post.createdAgo}</p>
      </div>
      <div className="content-container">
        <p>{post.content}</p>
      </div>
      <div className="image-container">
        <img src={`api/post/image/${post.username}/${post.postid}`} alt="Post" />
      </div>
      <div className="reaction-container">
        <div className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLike}>
          <i className="fa fa-heart"></i>
          <span className="like-count">
            {isLoadingLikes ? 'Loading...' : likesCount || 0}
          </span>
        </div>
        <div className={`comment-button ${showComments ? 'active' : ''}`} onClick={handleToggleComments}>
          <i className="fa fa-comment"></i>
        </div>
      </div>
      {showComments && (
        <div className="comment-field">
          <input type="text" placeholder="Add a comment..." />
        </div>
      )}
    </div>
  );
};

export default PostItem;
