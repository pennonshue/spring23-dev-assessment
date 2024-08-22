import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectDB from '../../../server/database/utils/connect.js';
import User from '../../../server/database/models/user.js';
import dotenv from 'dotenv';

dotenv.config()
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        await connectDB();
        const { email, password } = req.body;
        // get user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).send({ message: "Could not find user with this email" });
        }

        const password_match = await bcrypt.compare(password, user.password);
        if (!password_match) {
            return res.status(403).send({ message: "Invalid email or password" });
        }
        console.log(password)
        console.log(user.password)
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                name: user.name,
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        return res.status(200).send({ message: "Logged in!", token});

    } catch (error) {
        return res.status(500).send({ message: "Error occured in user verification" });
    }
});

export default router;
