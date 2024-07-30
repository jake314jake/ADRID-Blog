import React from 'react';
import Avatar from 'react-avatar';
import './UserAvatar.scss';
const UserAvatar = ({ userName ,displayUsername=true}) => {
  return (
    
     <div className="avatar-container">
      {userName ? (
        <>
        <Avatar name={userName} round={true} size="40"  />
        {displayUsername?<div className='username-container'>{userName}</div>:""}
        
        </>
      ) : (
        <Avatar name="Guest" round={true} size="40" />
      )}
    </div>
  );
};

export default UserAvatar;
