import React, { useState } from 'react';
import Comment from './Comment';
import CommentInput from './CommentInput';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchComments = async (postId) => {
  const { data } = await axios.get('/api/comment', {
    params: { postid: postId }
  });
  return data.comment;
};

const PostComment = ({ postid, showComments, setShowComments }) => {
  const { data: commentsData, isLoading: isLoadingComments } = useQuery({
    queryKey: ['comments', postid],
    queryFn: () => fetchComments(postid)
  });

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div>
      <div className={`comment-button ${showComments ? 'active' : ''}`} onClick={handleToggleComments}>
        <i className="fa fa-comment"></i>
        <span className="comment-count">
          {isLoadingComments ? 'Loading...' : commentsData ? commentsData.length : 0}
        </span>
      </div>
      {showComments && (
        <div className="comment-section">
          <CommentInput postid={postid} postowner={post.username} />
          <Comment commentsData={commentsData} isLoadingComments={isLoadingComments} />
        </div>
      )}
    </div>
  );
};

export default PostComment;
