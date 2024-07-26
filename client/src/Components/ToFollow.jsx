import React, { useContext, useEffect, useState } from 'react';
import { FollowContext } from '../Context/FollowContext';
import UserAvatar from './UserAvatar';
import ToggleButton from './ToggleButton'; // Adjust the path as needed

const ToFollow = ({ currentUser, numberOfUsers }) => {
    const { toFollow, fetchToFollow, followUser, followers } = useContext(FollowContext);
    const [toggleFetch, setToggleFetch] = useState(true);
    const [showToFollow, setShowToFollow] = useState(false); // State to control visibility of toFollow list

    const handleFollow = (username, followUsername) => {
        followUser(username, followUsername);
    };

    const handleShuffle = () => {
        setToggleFetch(!toggleFetch);
    };

    useEffect(() => {
        fetchToFollow(currentUser.user.username, numberOfUsers);
    }, [toggleFetch, currentUser.user.username, numberOfUsers]);

    const isFollowing = (username) => {
        return followers.some(follower => follower.username === username);
    };

    const toggleToFollow = () => {
        setShowToFollow(!showToFollow);
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
                    {toFollow.map(follower => (
                        <div key={follower.id} className='tofollow-card'>
                            <UserAvatar userName={follower.username} />
                            {isFollowing(follower.username) ? (
                                <span className='follow-message'>Following</span>
                            ) : (
                                <button className='follow-button' onClick={() => handleFollow(currentUser.user.username, follower.username)}>
                                    Follow
                                </button>
                            )}
                        </div>
                    ))}
                    <button onClick={handleShuffle} className='shuffle-button'>Shuffle</button>
                </div>
                 
            )}
           
        </div>
    );
};

export default ToFollow;
