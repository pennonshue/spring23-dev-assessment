import mongoose from "mongoose"

const trainingSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    hours: {
        type: Number,
        required: true
    },
    animal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    trainingLogVideo: {
        type: String
    }
})

const Training = mongoose.models.Training || mongoose.model('Training', trainingSchema);
export default Training;