import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ShareListItem from './ShareItem';
import "./ShareList.scss"
// Fetch followers
const fetchFollowers = async (username) => {
    try {
        const res = await axios.get(`/api/follow?username=${username}`);
        return res.data.follow;
    } catch (error) {
        console.error("Fetch followers error:", error);
        throw error; 
    }
};

const ShareList = ({ currentUser, onShare }) => {
  const { data: followers = [], isLoading, isError } = useQuery({
    queryKey: ['followers', currentUser.user.username],
    queryFn: () => fetchFollowers(currentUser.user.username)
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading followers</p>;

  return (
    <div className="share-list">
      {followers.map(follower => (
        <ShareListItem 
          key={follower.username} 
          follower={follower} 
          onShare={() => onShare(follower.username)}
        />
      ))}
    </div>
  );
};

export default ShareList;
