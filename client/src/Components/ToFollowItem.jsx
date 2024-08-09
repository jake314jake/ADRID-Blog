import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query'; 
import axios from 'axios'; 
import UserAvatar from './UserAvatar'; 

const followUser = async ({ username, followUsername }) => {
    try {
        const res = await axios.post("/api/follow", { username, followUsername });
        if (res.data.user) {
            return true;
        }
        return false;
    } catch (error) {
        throw error;
    }
};
const notify =async (username,type,actionuser)=>{
    const { data } = await axios.post('/api/notify', {
        username,
        type,
        actionuser
      });
      return data;
  }
const ToFollowItem = ({ username, followUsername }) => {
    const [isFollowing, setIsFollowing] = useState(false); // State to track if user is following
    const queryClient = useQueryClient();
  
    const mutation = useMutation({
      mutationFn: followUser,
      onSuccess: () => {
        queryClient.invalidateQueries(['followers', username]);
        setIsFollowing(true); // Set state to true on success
        notify(followUsername,"Follow",username);
      },
      onError: (error) => {
        console.error('Error following user:', error); 
      },
    });
  
    const handleFollow = (event) => {
      event.preventDefault();
      mutation.mutate({
        username,
        followUsername
      });
    };
  
    return (
        <div className='followers-card'>
            <div className='follower-box'>
                <UserAvatar userName={followUsername} displayUsername={true} />
                {isFollowing ? (
                    <span className='following-span'>Following</span> // Display "Following" when user is following
                ) : (
                    <button className='follow-button' onClick={handleFollow}> 
                        Follow
                    </button>
                )}
            </div>
        </div>
    )
}

export default ToFollowItem;
