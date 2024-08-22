import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import healthRoute from './src/api/health.js'; 
import userRoute from './src/api/user.js';
import animalRoute from './src/api/animal.js';
import trainingRoute from './src/api/training.js';
import adminUserRoute from './src/api/admin/users.js';
import adminAnimalRoute from './src/api/admin/animals.js';
import adminTrainingRoute from './src/api/admin/training.js';
import loginRoute from './src/api/utils/login.js';
import verifyRoute from './src/api/utils/verify.js';
import auth_JWT from './src/api/utils/auth.js'

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
app.use('/api/health', auth_JWT, healthRoute);
app.use('/api/user/login', loginRoute);
app.use('/api/user/verify', verifyRoute);
app.use('/api/user', auth_JWT, userRoute);
app.use('/api/animal', auth_JWT, animalRoute);
app.use('/api/training', auth_JWT, trainingRoute);
app.use('/api/admin/users', auth_JWT, adminUserRoute);
app.use('/api/admin/animals', auth_JWT, adminAnimalRoute);
app.use('/api/admin/training', auth_JWT, adminTrainingRoute);


app.listen(APP_PORT, () => {
    console.log(`api listening at http://localhost:${APP_PORT}`)
})