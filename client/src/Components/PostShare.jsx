import React, { useState } from 'react';
import { useMutation, useQuery ,useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import ShareList from './ShareList';

const fetchShares = async (postId) => {
  const { data } = await axios.get('/api/share', {
    params: { postid: postId }
  });
  return data.share;
};

const sharePost = async ({ username, usershareto, postid }) => {
  const { data } = await axios.post('/api/share', {
    username,
    usershareto,
    postid
  });
  return data;
};

const PostShare = ({ postid, currentUser }) => {
  const queryClient = useQueryClient();
  const [showShareList, setShowShareList] = useState(false);

  const { data: sharesData, isLoading: isLoadingShares } = useQuery({
    queryKey: ['shares', postid],
    queryFn: () => fetchShares(postid)
  });

  const shareMutation = useMutation({
    mutationFn: sharePost,
    onSuccess: () => {
      queryClient.invalidateQueries(['shares', postid]);
      setShowShareList(false);
    },
    onError: (error) => {
      console.error('Error sharing post:', error);
    },
  });

  const handleShare = (userToShare) => {
    shareMutation.mutate({
      username: currentUser.user.username,
      usershareto: userToShare,
      postid
    });
  };

  return (
    <div>
      <div className="share-button" onClick={() => setShowShareList(!showShareList)}>
        <i className="fa fa-share"></i>
        <span className="share-count">
          {isLoadingShares ? 'Loading...' : sharesData ? sharesData.length : 0}
        </span>
      </div>
      {showShareList && (
        <ShareList currentUser={currentUser} onShare={handleShare} />
      )}
    </div>
  );
};

export default PostShare;
