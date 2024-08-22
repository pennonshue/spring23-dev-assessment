import express from 'express';
const router = express.Router();
import connectDB from "../../server/database/utils/connect.js"
import Animal from "../../server/database/models/animal.js"
import UserSchema from "../../server/database/models/user.js"
import auth_JWT from '../api/utils/auth.js';

// Create animal
router.post('/', auth_JWT, async (req, res) => {
        if (req.method === 'POST') {
            const data = req.body;
            const userId = req.user.id;
            try {
                await connectDB()
                let newAnimalData = {
                    name: data.name,
                    hoursTrained: data.hoursTrained,
                    owner: userId,
                    dateOfBirth: data.dateOfBirth,
                    profilePicture: data.profilePicture
                }
                // Check if a user exists in the database
                const user_exists = await UserSchema.findOne({_id: userId}).lean();
                if (user_exists === null) {
                    return res.status(400).send({message: "Can't create animal. User does not exist"}) 
                }

                const animal = new Animal(newAnimalData)
                await animal.save()
                return res.status(200).send({message: "Animal created Successfully!"})
                
            } catch (error) {
                return res.status(500).send({message: 'Error creating animal', error})
            }
        } else {
            return res.status(400).send({message: 'Can only POST at this endpoint'})
        }
});

export default router
