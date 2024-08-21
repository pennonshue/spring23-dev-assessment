import mongoose from "mongoose";

export default async function connectDB() {
    if (mongoose.connection.readyState) {
        console.log("Already connected to the database.");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.DB_NAME,
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
    }
};