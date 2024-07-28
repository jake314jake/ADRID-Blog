import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import PostItem from './PostItem';
import './Post.scss'; 

const Post = ({ currentUser }) => {
  const { data: posts, error, isLoading } = useQuery({
    queryKey: ['posts', currentUser.user.username],
    queryFn: async () => {
      const { data } = await axios.get('/api/post', {
        params: { username: currentUser.user.username }
      });
      return data.post;
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='posts-container'>
      {posts && posts.length > 0 ? (
        posts.map(post => (
          <PostItem key={post.postid} post={post} currentUser={currentUser} />
        ))
      ) : (
        <div>No posts available</div>
      )}
    </div>
  );
};

export default Post;
