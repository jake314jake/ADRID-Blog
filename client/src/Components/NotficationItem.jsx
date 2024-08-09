import React from 'react';
import UserAvatar from './UserAvatar';
import axios from 'axios';
import './NotificationItem.scss';
import { useQueryClient } from '@tanstack/react-query';

const setNotificationSeen = async (notificationID) => {
  try {
    await axios.patch('/api/notify', { notficationID: notificationID });
  } catch (error) {
    console.error('Error marking notification as seen:', error);
  }
};

const NotificationItem = ({ notification }) => {
  const queryClient = useQueryClient(); 

  const handleClick = async () => {
    
    await setNotificationSeen(notification.id);

    // Invalidate the notifications query to refresh data
    queryClient.invalidateQueries(['notifications', notification.username]);
  };

  return (
    <div className="notification-item" onClick={handleClick}>
      <UserAvatar userName={notification.actionuser} className="user-avatar" />
      <p>{notification.type}</p>
      <span>{notification.createdAgo}</span>
    </div>
  );
};

export default NotificationItem;
