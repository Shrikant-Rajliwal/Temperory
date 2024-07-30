// src/config/db.js
import mongoose from "mongoose" 
// import dotenv from "dotenv"


// dotenv.config()

const connectDb = async () => {
    try {
        await mongoose.connect("mongodb+srv://shrikant:d0ZEbVUtl0Bws6tR@cluster0.pkbh9xo.mongodb.net/crud");
        console.log("Connected to DB");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
};

// module.exports = connectDb;
export default connectDb;


