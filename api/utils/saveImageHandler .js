import { dbRun } from "../database/connectionDB.js";

const saveImageHandler = async (req, res) => {
  const { postId } = req;
  const { imageUrl } = req;

  try {
    if (!postId || !imageUrl) {
      return res.status(400).json({ message: 'Post ID and image URL are required' });
    }

    // Insert image information into the Images table
    await dbRun('INSERT INTO Images (post_id, image_url) VALUES (?, ?)', [postId, imageUrl]);

    console.log('addImageHandler: Success', { postId, imageUrl });

    res.status(201).json({ message: 'Image added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default saveImageHandler;
