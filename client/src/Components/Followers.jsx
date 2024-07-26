import React, { useContext, useEffect, useState } from 'react';
import { FollowContext } from '../Context/FollowContext';
import UserAvatar from '../Components/UserAvatar';
import ToggleButton from './ToggleButton'; 

const Followers = ({ currentUser }) => {
    const { followers, unfollowUser, fetchFollowers, followChanged } = useContext(FollowContext);
    const [showFollowers, setShowFollowers] = useState(false);

    const handleUnfollow = (followUsername) => {
        unfollowUser(currentUser.user.username, followUsername);
    };

    useEffect(() => {
        fetchFollowers(currentUser.user.username);
    }, [followChanged]);

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
                    {followers.map(follower => (
                        <div key={follower.username} className='followers-card'>
                            <div className='follower-box'>
                                <UserAvatar userName={follower.username} displayUsername={true} />
                                <button className='unfollow-button' onClick={() => handleUnfollow(follower.username)}>
                                    Unfollow
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Followers;
