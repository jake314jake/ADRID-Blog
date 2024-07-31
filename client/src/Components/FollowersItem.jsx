import React from 'react';
import axios from 'axios'; 
import { useMutation, useQueryClient } from '@tanstack/react-query'; 
import UserAvatar from './UserAvatar';

const unfollowUser = async ({ username, followUsername }) => {
  try {
    const { data } = await axios.delete('/api/follow', {
      data: { username, followUsername } 
    });
    if (data.user) {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

const FollowersItem = ({ username, follower }) => {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: unfollowUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['followers', username]);
    },
    onError: (error) => {
      console.error('Error unfollowing user:', error); 
    },
  });

  const handleUnfollow = (event) => {
    event.preventDefault();
    mutation.mutate({
      username,
      followUsername: follower.username
    });
  };

  return (
    <div className='followers-card'>
      <div className='follower-box'>
        <UserAvatar userName={follower.username} displayUsername={true} />
        <button className='unfollow-button' onClick={handleUnfollow}> 
          Unfollow
        </button>
      </div>
    </div>
  );
};

export default FollowersItem;
