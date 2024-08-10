import React, { useEffect } from 'react';
import { useQuery,useQueryClient} from '@tanstack/react-query';
import axios from 'axios';

// Notify backend
const notify = async (username, type, actionuser) => {
    const { data } = await axios.post('/api/notify', {
      username,
      type,
      actionuser
    });
    return data;
  };

// Fetch likes data
const fetchLikes = async (postid) => {
    const { data } = await axios.get('/api/like', {
      params: { postid: postid }
    });
    return data.like;
  };

const PostLike = ({ post, currentUser, liked, setLiked }) => {
    const queryClient = useQueryClient();
  const { data: likesData, isLoading } = useQuery({
    queryKey: ['likes', post.postid],
    queryFn: () => fetchLikes(post.postid),
  });

  useEffect(() => {
    if (likesData) {
      setLiked(likesData.some(reaction => reaction.user_id === currentUser.user.id));
    }
  }, [likesData, currentUser.user.id, setLiked]);

  const handleLike = async () => {
    try {
      if (liked) {
        await axios.delete('/api/like', {
          data: { username: currentUser.user.username, postid:post.postid }
        });
      } else {
        await axios.post('/api/like', {
          username: currentUser.user.username,
          postid:post.postid
        });
        await notify(post.username, "like", currentUser.user.username); 
      }
      setLiked(!liked);
      // Invalidate the query to refetch likes data
      queryClient.invalidateQueries(['likes', post.postid]);
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  return (
    <div className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLike}>
      <i className="fa fa-heart"></i>
      <span className="like-count">
        {isLoading ? 'Loading...' : likesData ? likesData.length : 0}
      </span>
    </div>
  );
};

export default PostLike;
