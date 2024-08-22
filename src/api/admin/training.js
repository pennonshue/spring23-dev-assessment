import connectDB from "../../../server/database/utils/connect.js";
import Train from "../../../server/database/models/training.js"
import express from 'express';
import auth_JWT from '../utils/auth.js';

const router = express.Router();

async function pagination(pageNumber) {
    try {
        await connectDB();
        const objectsPerPage = 3
        // Fetches the first 3 animal docs from db
        if (pageNumber == 1){
            const trainings = await Train.find({}).limit(objectsPerPage) 
            return trainings
        }
        // Num objects to read up to the current page
        const readTo = objectsPerPage * (pageNumber - 1)
        // id of last document before current page
        const skip = await Train.find({}, "_id").limit(readTo-2) 
        // last doc fetched
        const minId = skip[skip.length-1]._id

        // > minID == skipping prev pages
        const trainings = await Train.find({}).skip(skip).limit(objectsPerPage);


        return trainings
    } catch (e) {
        console.log(e)
    }
}
router.get('/', auth_JWT, async (req, res) => {
    try {
        await connectDB()
        const pageNumber = req.query.page || 1;
        let trainings = await pagination(pageNumber)
        res.status(200).json(trainings);
    } catch (e) {
        return res.status(500).json({success: false, message: e.message})
    }
});

export default router



