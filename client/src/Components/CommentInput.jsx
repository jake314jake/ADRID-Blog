import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import './CommentInput.scss'
import { AuthContext } from '../Context/AuthContext';


const addComment = async ({ username, postid, content }) => {
    console.log(username)
  const { data } = await axios.post('/api/comment', {
    username,
    postid,
    content
  });
  return data;
};
const notify =async (username,type)=>{
    const { data } = await axios.post('/api/notify', {
        username,
        type
      });
      return data;
}
const CommentInput = ({ postid ,postowner}) => {
    const { currentUser } = useContext(AuthContext);
  const [commentContent, setCommentContent] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation( {
    mutationFn:addComment,
    onSuccess: () => {
      // Invalidate and refetch the comments query to show the new comment
      queryClient.invalidateQueries(['comments', postid]);
      setCommentContent(""); // Clear the input after successful comment submission
      notify(postowner,"comment");
    },
    onError: (error) => {
      console.error('Error adding comment:', error);
      // Handle the error, e.g., show a notification to the user
    },
  });

  const handleAddComment = (event) => {
    event.preventDefault();
    mutation.mutate({
      username: currentUser.user.username,
      postid:postid,
      content: commentContent
    });
  };

  return (
    <div className="comment-input-container">
      <form onSubmit={handleAddComment}>
        <input 
          type="text" 
          placeholder="Add a comment..." 
          value={commentContent} 
          onChange={(e) => setCommentContent(e.target.value)} 
          required 
        />
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  );
};

export default CommentInput;
