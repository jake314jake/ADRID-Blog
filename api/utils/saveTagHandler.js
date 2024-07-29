import { dbGet, dbRun, dbAll } from "../database/connectionDB.js";

const saveTagHandler = async (req, res, next) => {
  const { content, postId } = req;

  try {
    // Extract tags from the content
    const tagPattern = /#(\w+)/g;
    const tags = [];
    let match;
    while ((match = tagPattern.exec(content)) !== null) {
      tags.push(match[1]);
    }

    const tagIds = [];
    for (const tag of tags) {
      // Check if the tag exists
      let tagRecord = await dbGet('SELECT id FROM Tags WHERE name = ?', [tag]);
      if (!tagRecord) {
        // Create the tag if it doesn't exist
        await dbRun('INSERT INTO Tags (name) VALUES (?)', [tag]);
        tagRecord = await dbGet('SELECT id FROM Tags WHERE name = ?', [tag]);
      }
      tagIds.push(tagRecord.id);
    }

    // Link tags to the post
    for (const tagId of tagIds) {
      await dbRun('INSERT OR IGNORE INTO PostTags (post_id, tag_id) VALUES (?, ?)', [postId, tagId]);
    }

    req.tags = tags; // Attach the tags to the request object
    next(); // Call the next middleware or route handler
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while saving tags.', error });
  }
};

export default saveTagHandler;
