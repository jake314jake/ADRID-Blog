import React, { useState } from 'react';
import axios from 'axios';
import './Upload.scss'; // Import the SCSS file
import UserAvatar from '../Components/UserAvatar';

const Upload = ({ currentUser }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', currentUser.user.username);
    formData.append('content', content);
    formData.append('image', image);

    try {
      const response = await axios.post('/api/post', formData);

      setMessage(`Post created successfully: ${response.data.postId}`);
    } catch (error) {
      if (error.response) {
        setMessage(`Error: ${error.response.data.error}`);
      } else {
        setMessage(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="upload-container">
      <form onSubmit={handleSubmit}>
        <div className="form-header">
          <UserAvatar userName={currentUser.user.username} displayUsername={false} />
        </div>
        <div className="form-group">
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write something..."
            required
          ></textarea>
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
