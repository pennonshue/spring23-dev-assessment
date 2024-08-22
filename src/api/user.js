import express from 'express';
const router = express.Router();
import connectDB from "../../server/database/utils/connect.js"
import User from "../../server/database/models/user.js"
import bcrypt from "bcrypt"

// POST to database
    router.post('/', async (req, res) => {
        if (req.method === 'POST') {
            const data = req.body;

            try {
                await connectDB()
                // hash password
                const password = req.body.password
                // console.log(password)
                const salt = await bcrypt.genSalt(10) // unique to each password 
                const hashed = await bcrypt.hash(password, salt)
                // console.log(hash)
                let newUserData = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: hashed,
                    profilePicture: data.profilePicture
                }
                const user = new User(newUserData)
                await user.save()
                return res.status(200).send({message: "User Created Successfully!"})
                
            } catch (error) {
                return res.status(500).send({message: 'Error creating user', error})
            }
        } else {
            return res.status(400).send({message: 'Can only POST at this endpoint'})
        }
});

export default router
