import express from 'express';
const router = express.Router();
import connectDB from "../../server/database/connect.js"
import User from "../../server/database/models/user.js"

// POST to database
    router.post('/', async (req, res) => {
        if (req.method === 'POST') {
            const data = req.body;

            try {
                await connectDB()
                let newUserData = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: data.password,
                    profilePicture: data.profilePicture
                }
                const user = new User(newUserData)
                await user.save()
                return res.status(200).send({message: "User Created Successfully!"})
                
            } catch (error) {
                return res.status(500).send({message: 'Error creating user', error})
            }
        } else {
            return res.status(400).send({message: 'Otherrr'})
        }
});

export default router
