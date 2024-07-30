// src/Components/CommentItem.jsx
import React from 'react';
import "./CommentItem.scss";
import UserAvatar from './UserAvatar';

const CommentItem = ({ comment }) => {
  return (
    <div className="comment-item">
      <div className="comment-header">
        <UserAvatar userName={comment.username} displayUsername={true}></UserAvatar>
        <span>{comment.createdAgo}</span>
      </div>
      <p className="comment-content">{comment.content}</p>
    </div>
  );
};

export default CommentItem;
