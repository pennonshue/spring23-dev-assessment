import connectDB from "../../../server/database/utils/connect.js";
import Animal from "../../../server/database/models/animal.js"
import express from 'express';
import auth_JWT from '../utils/auth.js';

const router = express.Router();

async function pagination(pageNumber) {
    try {
        await connectDB();
        const objectsPerPage = 3
        // Fetches the first 3 animal docs from db
        if (pageNumber == 1){
            const animals = await Animal.find({}).limit(objectsPerPage) 
            return animals
        }
        // Num objects to read up to the current page
        const readTo = objectsPerPage * (pageNumber - 1)
        // id of last document before current page
        const skip = await Animal.find({}, "_id").limit(readTo-2) 
        // last doc fetched
        const minId = skip[skip.length-1]._id

        // > minID == skipping prev pages
        // const animals = await Animal.find({_id: { $gt: minId }}).limit(objectsPerPage) 
        const animals = await Animal.find({}).skip(skip).limit(objectsPerPage);


        return animals
    } catch (e) {
        console.log(e)
    }
}

router.get('/', auth_JWT, async (req, res) => {
    try {
        await connectDB()
        const pageNumber = req.query.page || 1;
        let animals = await pagination(pageNumber)
        res.status(200).json(animals);
    } catch (e) {
        return res.status(500).json({success: false, message: e.message})
    }
});

export default router



