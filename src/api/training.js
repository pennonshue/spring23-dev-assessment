import express from 'express';
const router = express.Router();
import connectDB from "../../server/database/utils/connect.js"
import Training from "../../server/database/models/training.js"
import UserSchema from "../../server/database/models/user.js"
import AnimalSchema from "../../server/database/models/animal.js"
import auth_JWT from '../api/utils/auth.js';

// POST to database
    router.post('/', auth_JWT, async (req, res) => {
        if (req.method === 'POST') {
            const data = req.body;
            const userID = req.user.id
            try {
                await connectDB()
                let newTrainingData = {
                    date: data.date,
                    description: data.description,
                    hours: data.hours,
                    animal: data.animal,
                    user: userID,
                    trainingLogVideo: data.trainingLogVideo
                }
                const user_exists = await UserSchema.findOne({ _id: userID }).lean();
                const animal_exists =  await AnimalSchema.findOne({ _id: newTrainingData.animal }).lean();
                if (user_exists === null) {
                    return res.status(400).send({message: "Can't create training. User does not exist"}) 
                } else if (animal_exists == null) {
                    return res.status(400).send({message: "Can't create training. Animal does not exist"}) 
                }

                const training = new Training(newTrainingData)
                await training.save()
                return res.status(200).send({message: "Training Created Successfully!"})
                
            } catch (error) {
                return res.status(500).send({message: 'Error creating training log', error})
            }
        } else {
            return res.status(400).send({message: 'Can only POST at this endpoint'})
        }
});

export default router
