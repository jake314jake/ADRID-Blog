import React, { useContext, useState, useEffect } from 'react';
import "./CommentItem.scss";
import UserAvatar from './UserAvatar';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchCommentsLike = async (commentid) => {
  const { data } = await axios.get('/api/commentlike', {
    params: { commentid }
  });
  return data.like;
};

const likeComment = async ({ username, commentid }) => {
  await axios.post('/api/commentlike', { username, commentid });
};

const unlikeComment = async ({ username, commentid }) => {
  await axios.delete('/api/commentlike', { data: { username, commentid } });
};

const CommentItem = ({ comment }) => {
  const { currentUser } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(false);
  const queryClient = useQueryClient();

  const { data: likes = [], isLoading } = useQuery({
    queryKey: ['Commentlikes', comment.comment_id],
    queryFn: () => fetchCommentsLike(comment.comment_id),
    onSuccess: (data) => {
      
    }
  });

  const likeMutation = useMutation({
    mutationFn: likeComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['Commentlikes', comment.comment_id]);
    }
  });

  const unlikeMutation = useMutation({
    mutationFn: unlikeComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['Commentlikes', comment.comment_id]);
    }
  });
  useEffect(() => {
    if (likes) {
      setIsLiked(likes.some((like) => like.user_id === currentUser.user.id));
    }
  }, [likes]);

  const handleClick = () => {
    if (isLiked) {
      unlikeMutation.mutate({ username: currentUser.user.username, commentid: comment.comment_id });
      setIsLiked(false);
    } else {
      likeMutation.mutate({ username: currentUser.user.username, commentid: comment.comment_id });
      setIsLiked(true);
    }
  };

  return (
    <div className="comment-item">
      <div className="comment-header">
        <UserAvatar userName={comment.username} displayUsername={true} />
        <span>{comment.createdAgo}</span>
      </div>
      
      <div className="comment-content-container">
        <p className="comment-content">{comment.content}</p>
        <div className="comment-reaction-container">
          <div className={`like-button ${isLiked ? 'liked' : ''}`} onClick={handleClick}>
            <i className="fa fa-heart"></i>
            <span className="like-count">{likes.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
