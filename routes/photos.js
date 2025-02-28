import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../data/photos.json');

// Read the photos data from the JSON file
const readPhotosData = () => {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
};

let photos = readPhotosData();

// Get all photos
router.get('/', (req, res) => {
    res.json(photos);
});

// Get a single photo by ID
router.get('/:id', (req, res) => {
    const photo = photos.find(p => p.id === req.params.id);
    if (!photo) return res.status(404).send('Photo not found');
    res.json(photo);
});

// Get comments for a photo by ID
router.get('/:id/comments', (req, res) => {
    const photo = photos.find(p => p.id === req.params.id);
    if (!photo) return res.status(404).send('Photo not found');
    res.json(photo.comments);
});

// Add a comment to a photo
router.post('/:id/comments', (req, res) => {
    const photo = photos.find(p => p.id === req.params.id);
    if (!photo) return res.status(404).send('Photo not found');

    const newComment = {
        name: req.body.name,
        comment: req.body.comment,
        id: req.body.id,
        timestamp: req.body.timestamp
    };
    photo.comments.push(newComment);
    fs.writeFileSync(dataPath, JSON.stringify(photos, null, 2));
    res.status(201).json(newComment);
});

export default router;