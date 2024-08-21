import express from 'express';
const router = express.Router();
import connectDB from "../../server/database/connect.js"
import Training from "../../server/database/models/training.js"

// POST to database
    router.post('/', async (req, res) => {
        if (req.method === 'POST') {
            const data = req.body;

            try {
                await connectDB()
                let newTrainingData = {
                    date: data.date,
                    description: data.description,
                    hours: data.hours,
                    animal: data.animal,
                    user: data.user,
                    trainingLogVideo: data.trainingLogVideo
                }
                const training = new Training(newTrainingData)
                await training.save()
                return res.status(200).send({message: "Training Created Successfully!"})
                
            } catch (error) {
                return res.status(500).send({message: 'Error creating training log', error})
            }
        } else {
            return res.status(400).send({message: 'Otherrr'})
        }
});

export default router
