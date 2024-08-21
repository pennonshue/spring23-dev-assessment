import mongoose from "mongoose"

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    hoursTrained: {
        type: Number,
        required: true
    },
    owner: {
        // type: ObjectId,
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    dateOfBirth: {
        type: Date,
    },
    profilePicture: {
        type: String
    }
})

const Animal = mongoose.models.Animal || mongoose.model('Animal', animalSchema);
export default Animal;