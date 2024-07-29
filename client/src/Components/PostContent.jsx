// src/Components/PostContent.jsx
import React from 'react';

const PostContent = ({ content }) => {
  // Function to parse content and wrap tags with a styled span
  const parseContent = (content) => {
    const tagPattern = /#\w+/g;
    const parts = content.split(tagPattern);

    return parts.map((part, index) => {
      const tag = content.match(tagPattern) ? content.match(tagPattern)[index] : null;
      return (
        <React.Fragment key={index}>
          {part}
          {tag && <span style={{ color: 'blue', fontWeight: 'bold' }}>{tag}</span>}
        </React.Fragment>
      );
    });
  };

  return <p>{parseContent(content)}</p>;
};

export default PostContent;
