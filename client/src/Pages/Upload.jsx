import React, { useState } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import './Upload.scss'; // Import the SCSS file
import UserAvatar from '../Components/UserAvatar';
import StyledTextArea from '../Components/StyledTextArea';

const Upload = ({ currentUser }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();

  const addPost = async ({ username, content, image }) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('content', content);
    formData.append('image', image);

    try {
      const response = await axios.post('/api/post', formData);
      setMessage(`Post created successfully`);
      return response.data; // Return data from the response
    } catch (error) {
      if (error.response) {
        setMessage(`Error: ${error.response.data.error}`);
      } else {
        setMessage(`Error: ${error.message}`);
      }
      throw error; // Rethrow the error to let useMutation handle it
    }
  };

  const mutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      // Invalidate and refetch posts
      queryClient.invalidateQueries(['posts', currentUser.user.username]);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate({
      username: currentUser.user.username,
      content,
      image,
    });
  };

  return (
    <div className="upload-container">
      <form onSubmit={handleSubmit}>
        <div className="form-header">
          <UserAvatar userName={currentUser.user.username} displayUsername={true} />
        </div>
        <div className="form-group">
          <StyledTextArea content={content} setContent={setContent}></StyledTextArea>
        </div>
        <div className="form-group">
          <label htmlFor="image" className="image-label">
            <i className="fa fa-camera"></i>
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit" className="submit-button">Post</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Upload;
