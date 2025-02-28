import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../data/tags.json');

// Read the tags data from the JSON file
const readTagsData = () => {
  const data = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(data);
};

let tags = readTagsData();

// Get all tags
router.get('/', (req, res) => {
  res.json(tags);
});

// Search for tags containing a particular tag element
router.get('/search', (req, res) => {
  const searchTerm = req.query.tag;
  if (!searchTerm) {
    return res.status(400).send('Tag query parameter is required');
  }
  const filteredTags = tags.filter(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
  res.json(filteredTags);
});


export default router;