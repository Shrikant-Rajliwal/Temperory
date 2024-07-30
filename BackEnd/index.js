import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './config/db.js'; // Correct path without 'src'
import itemsRoutes from "./routes/itemroutes.js";
import authRoutes from "./routes/authroutes.js"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8800;

// Connect to MongoDB
connectDb();

// // Middleware setup
app.use(cors({ credentials: true, origin: 'http://localhost:5173' })); // Allow CORS
app.use(express.json()); // Parse JSON bodies

// Use the itemsRoutes
app.use('/items', itemsRoutes); // Prefix the route with '/items'
app.use('/admin',authRoutes);

// Error middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

// Start the server
app.listen(PORT, (err) => {
  if (err) {
    console.error("Error in server setup:", err);
    return;
  }
  console.log(`Server listening on Port ${PORT}`);
});
