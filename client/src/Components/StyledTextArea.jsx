// src/Components/StyledTextarea.jsx
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

const highlightHashtags = (text) => {
  const parts = text.split(/(#[a-zA-Z0-9_]+)/g);
  return parts.map((part, index) => {
    if (part.startsWith('#')) {
      return <span key={index} style={{ color: 'blue', fontWeight:'bold' }}>{part}</span>;
    }
    return part;
  });
};

const StyledTextarea = ({ content, setContent }) => {
  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div
      style={{
        border: '1px solid #ddd',
        padding: '10px',
        borderRadius: '5px',
        width: '100%',
        minHeight: '100px',
        fontSize: '16px',
        lineHeight: '1.5',
        position: 'relative'
      }}
    >
      <TextareaAutosize
        value={content}
        onChange={handleChange}
        placeholder="Write something..."
        style={{
          width: '100%',
          border: 'none',
          outline: 'none',
          fontSize: '16px',
          lineHeight: '1.5',
          resize: 'none',
          backgroundColor: 'transparent',
          color: 'transparent',
          caretColor: 'black',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          width: 'calc(100% - 20px)',
          pointerEvents: 'none',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          fontSize: '16px',
          lineHeight: '1.5',
        }}
      >
        {highlightHashtags(content)}
      </div>
    </div>
  );
};

export default StyledTextarea;
