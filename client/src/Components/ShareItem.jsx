import React from 'react';
import UserAvatar from './UserAvatar';
import "./ShareItem.scss"
const ShareListItem = ({ follower, onShare }) => {
  return (
    <div className="share-list-item">
      <UserAvatar userName={follower.username} displayUsername={true} />
      <button className="share-button" onClick={onShare}>
        Share
      </button>
    </div>
  );
};

export default ShareListItem;
