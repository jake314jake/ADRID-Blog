import React from 'react';

const PostBody= ({ username, postid }) => {
  return (
    <div className="image-container">
      <img src={`api/post/image/${username}/${postid}`} alt="Post" />
    </div>
  );
};

export default PostBody;
