import fs from 'fs';
import path from 'path';

const uploadFileHandler = async (req, res, next) => {
  const { username, postId } = req;

  if (!req.files || !req.files.image) {
    return res.status(400).json({ message: 'No files were uploaded.' });
  }

  const image = req.files.image;
  const dir = `public/upload/post/${username}/${postId}`;

  // Create directory if it doesn't exist
  fs.mkdirSync(dir, { recursive: true });

  const filePath = path.join(dir, `${Date.now()}-${image.name}`);

  // Move the file to the desired directory
  image.mv(filePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'File upload failed.' });
    }

    // Set the image URL on req
    req.imageUrl = `/upload/post/${username}/${postId}/${path.basename(filePath)}`;
    next();
  });
};

export default uploadFileHandler;
