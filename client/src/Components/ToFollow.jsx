import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query'; 
import axios from 'axios'; 
import ToggleButton from './ToggleButton';
import ToFollowItem from './ToFollowItem';
import './ToFollow.scss';
const LIMIT_SHUFFLE_USERS=4;
const fetchToFollow = async (username) => {
    try {
        const res = await axios.get(`/api/follow/shuffle?username=${username}`);
        if (res.data.users) {
            return res.data.users;
        }
        return [];
    } catch (error) {
        throw error;
    }
};

const ToFollow = ({ currentUser }) => {
    const queryClient = useQueryClient();

    const [showToFollow, setShowToFollow] = useState(false); // State to control visibility of toFollow list
    
    const { data: toFollow = [], error, isLoading } = useQuery({
        queryKey: ['tofollow', currentUser.user.username],
        queryFn: () => fetchToFollow(currentUser.user.username), 
    });

    const toggleToFollow = () => {
        setShowToFollow(!showToFollow);
    };

    const handleShuffle = () => {
        queryClient.invalidateQueries(['tofollow', currentUser.user.username]);
    };

    return (
        <div className='tofollow-container'>
            <div className='tofollow-header'>
                <ToggleButton
                    isActive={showToFollow}
                    onClick={toggleToFollow}
                    activeText="Hide To Follow"
                    inactiveText="Show To Follow"
                />
            </div>
            {showToFollow && (
                <div className='tofollow-list'>
                    {toFollow.slice(0,LIMIT_SHUFFLE_USERS).map((follower) => ( // Limit to 4 users
                        <ToFollowItem 
                            key={follower.id}
                            username={currentUser.user.username}
                            followUsername={follower.username}
                        />
                    ))}
                    <button onClick={handleShuffle} className='shuffle-button'>
                        Shuffle
                    </button>
                </div>
            )}
        </div>
    );
};

export default ToFollow;
