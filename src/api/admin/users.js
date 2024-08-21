import connectDB from "../../../server/database/connect.js";
import User from "../../../server/database/models/user.js"
import express from 'express';

const router = express.Router();

async function pagination(pageNumber) {
    try {
        await connectDB();
        const objectsPerPage = 3
        // Fetches the first 3 animal docs from db
        if (pageNumber == 1){
            const users = await User.find({}).limit(objectsPerPage) 
            return users
        }
        // Num objects to read up to the current page
        const readTo = objectsPerPage * (pageNumber - 1)
        // id of last document before current page
        const skip = await User.find({}, "_id").limit(readTo-2) 
        // last doc fetched
        const minId = skip[skip.length-1]._id

        // > minID == skipping prev pages
        // const animals = await Animal.find({_id: { $gt: minId }}).limit(objectsPerPage) 


        const users = await User.find({}).skip(skip).limit(objectsPerPage);


        return users
    } catch (e) {
        console.log(e)
    }
}

router.get('/'), async (req, res) => {
    try {
        console.log("pringin")
        await connectDB()
        const pageNumber = req.query.page || 1;
        let users = await pagination(pageNumber)
        res.status(200).json(users);
    } catch (e) {
        return res.status(500).json({success: false, message: e.message})
    }
}

export default router



