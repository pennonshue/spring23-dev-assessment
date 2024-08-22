import express from 'express';
const router = express.Router();
import User from '../../../server/database/models/user.js';
import connectDB from '../../../server/database/utils/connect.js';
import bcrypt from "bcrypt";

router.post('/', async (req, res) => {
    if (req.method === 'POST') {
        const data = req.body;
        try {
            await connectDB()
            let loginData = {
                email: data.email,
                password: data.password,
            }
            console.log(loginData)
            const user = await User.findOne({email: loginData.email})
            console.log(user)

            // Check if user in database
            if(user == null) {
                return res.status(400).send({message: "User not found"})
            }

            const password_match = await bcrypt.compare(loginData.password, user.password)
            if (!password_match) {
                return res.status(403).send({message: "Incorrect Password. Try again!"})
            }
            return res.status(200).send({message: "Logged in!"})

        } catch (e) {
            return res.status(500).send({message: "Login error", e})
        }
    } 
});

export default router