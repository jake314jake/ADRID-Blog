import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import NotificationItem from './NotficationItem';
import "./Notfication.scss"

const fetchNotifications = async (username) => {
  const { data } = await axios.get('/api/notify', {
    params: { username }
  });
  
  return data.notification || []; 
};

const Notification = ({ username }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const { data: notifications = [], isLoading, isError } = useQuery({
    queryKey: ['notifications', username],
    queryFn: () => fetchNotifications(username),
    enabled: !!username,
  });

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="notification-wrapper">
      <div className="notification-icon" onClick={toggleNotifications}>
      <i className="fa-regular fa-bell"></i>
        {notifications.length > 0 && (
          <span className="notification-count">{notifications.length}</span>
        )}
      </div>
      {showNotifications && (
        <div className="notification-list">
          {isLoading ? (
            <p>Loading notifications...</p>
          ) : isError ? (
            <p>Error fetching notifications</p>
          ) : notifications.length === 0 ? (
            <p>No new notifications</p>
          ) : (
            notifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
