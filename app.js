import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import healthRoute from './src/api/health.js'; 
import userRoute from './src/api/user.js';
import animalRoute from './src/api/animal.js';
import trainingRoute from './src/api/training.js';
import adminUserRoute from './src/api/admin/users.js'

dotenv.config();
const app = express();
app.use(express.json());
const APP_PORT = 5000;

app.use(cors({ origin: true }));

app.get('/', (req, res) => {
    res.json({"Hello": "World",
            "Version": 2})
})

// API routes
app.use('/api/health', healthRoute);
app.use('/api/user', userRoute);
app.use('/api/animal', animalRoute);
app.use('/api/training', trainingRoute);
app.use('/api/admin/users', adminUserRoute);

app.listen(APP_PORT, () => {
    console.log(`api listening at http://localhost:${APP_PORT}`)
})