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

export default router;