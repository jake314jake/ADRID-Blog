import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query'; 
import axios from 'axios'; 
import ToggleButton from './ToggleButton'; 
import FollowersItem from './FollowersItem';

const fetchFollowers = async (username) => {
    try {
        const res = await axios.get(`/api/follow?username=${username}`);
        return res.data.follow;
    } catch (error) {
        console.error("Fetch followers error:", error);
        throw error; 
    }
};

const Followers = ({ currentUser }) => {
    const { data: followers, error, isLoading } = useQuery({
        queryKey: ['followers', currentUser.user.username],
        queryFn: () => fetchFollowers(currentUser.user.username), 
    });

    const [showFollowers, setShowFollowers] = useState(false);

    const toggleFollowers = () => {
        setShowFollowers(!showFollowers);
    };

    return (
        <div className='followers-container'>
            <div className='followers-header'>
                <ToggleButton
                    isActive={showFollowers}
                    onClick={toggleFollowers}
                    activeText="Hide Followers"
                    inactiveText="Show Followers"
                />
            </div>
            {showFollowers && (
                <div className='followers-list'>
                    {followers?.map((follower, index) => (
                        <FollowersItem key={index} username={currentUser.user.username} follower={follower}  /> 
                    ))}
                </div>
            )}
            {isLoading && <div>Loading...</div>} 
            {error && <div>Error: {error.message}</div>} 
        </div>
    );
};

export default Followers;
