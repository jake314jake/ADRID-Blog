import React from 'react';
import Avatar from 'react-avatar';

const UserAvatar = ({ userName ,displayUsername=true}) => {
  return (
    <>
      {userName ? (
        <>
        <Avatar name={userName} round={true} size="40"  />
        {displayUsername?<div className='username-container'>{userName}</div>:""}
        
        </>
      ) : (
        <Avatar name="Guest" round={true} size="40" />
      )}
    </>
  );
};

export default UserAvatar;
