import express from 'express';
import photoRoute from './routes/photos.js';
import tagRoute from './routes/tags.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 8081;
const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());

app.use('/public-image', express.static("./files"));

app.use((req, res, next) => {
    req.user = {
        name: 'khushbu',
        role: 'Trainee'
    };
    console.log('incoming request');
    next();
});

app.use('/photos', photoRoute);
app.use('/tags', tagRoute);

app.get('/', (req, res) => {
    res.send('Welcome to khushbu-shukla-snaps API');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});