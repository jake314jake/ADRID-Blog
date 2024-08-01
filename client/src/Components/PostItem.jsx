import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import UserAvatar from './UserAvatar';
import PostContent from './PostContent';
import Comment from './Comment';
import CommentInput from './CommentInput';
import axios from 'axios';
import "./PostItem.scss"
const fetchLikes = async (postId) => {
  const { data } = await axios.get('/api/like', {
    params: { postid: postId }
  });
  return data.like;
};
const fetchComments = async (postId) => {
  const { data } = await axios.get('/api/comment', {
    params: { postid: postId }
  });
  return data.comment;
};
const notify =async (username,type)=>{
  const { data } = await axios.post('/api/notify', {
      username,
      type
    });
    return data;
}

const PostItem = ({ post, currentUser }) => {
  const queryClient = useQueryClient();
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const { data: likesData, isLoading: isLoadingLikes } = useQuery({
    queryKey: ['likes', post.postid],
    queryFn: () => fetchLikes(post.postid)
  });
  const { data: commentsData, isLoading:isLoadingComments } = useQuery({
    queryKey: ['comments', post.postid],
    queryFn: () => fetchComments(post.postid),
  });
  useEffect(() => {
    if (likesData) {
      setLiked(likesData.some(reaction => reaction.user_id === currentUser.user.id));
    }
  }, [likesData, currentUser.user.id]);

  const handleLike = async () => {
    if (liked) {
      await axios.delete('/api/like', {
        data: { username: currentUser.user.username, postid: post.postid }
      });
    } else {
      await axios.post('/api/like', {
        username: currentUser.user.username,
        postid: post.postid
      });
      notify(post.username,"like");
    }
    setLiked(!liked);
    queryClient.invalidateQueries(['likes', post.postid]);
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div key={post.postid} className="post-container">
      <div className='header-container'>
        <UserAvatar userName={post.username} displayUsername={false}></UserAvatar>
        <h2>{post.username}</h2>
        <p>{post.createdAgo}</p>
      </div>
      <div className="content-container">
      <PostContent content={post.content}></PostContent>
      </div>
      <div className="image-container">
        <img src={`api/post/image/${post.username}/${post.postid}`} alt="Post" />
      </div>
      <div className="reaction-container">
        <div className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLike}>
          <i className="fa fa-heart"></i>
          <span className="like-count">
            {isLoadingLikes ? 'Loading...' : likesData ? likesData.length : 0}
          </span>
        </div>
        <div className={`comment-button ${showComments ? 'active' : ''}`} onClick={handleToggleComments}>
          <i className="fa fa-comment"></i>
          <span className="like-count">
            {isLoadingComments ? 'Loading...' : commentsData ? commentsData.length : 0}
          </span>
        </div>
      </div>
      {showComments && (
        <div className="comment-section">
          <CommentInput postid={post.postid} postowner={post.username} ></CommentInput>
          <Comment commentsData={commentsData} isLoadingComments={isLoadingComments} />
        </div>
      )}
    </div>
  );
};

export default PostItem;
