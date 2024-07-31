// src/Components/Comment.jsx
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import CommentItem from './CommentItem';
import "./Comment.scss";



const Comment = ({ commentsData, isLoadingComments}) => {
 

  if (isLoadingComments) {
    return <div>Loading comments...</div>;
  }



  return (
    <div className="comments-container">
      {commentsData.length === 0 ? (
        <div>No comments yet.</div>
      ) : (
        commentsData.map((comment,Index) => (
          <CommentItem key={Index} comment={comment} />
        ))
      )}
    </div>
  );
};

export default Comment;
