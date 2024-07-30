// src/routes/authroutes.js
import express from 'express';
import Admin from '../models/adminModel.js';

const router = express.Router();

// Admin Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log(username, email, password);

    // Create a new admin
    const admin = new Admin({ username, email, password });
    await admin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Admin Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password is correct
    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Prepare data to send back to the client
    const { password: userPassword, ...otherDetails } = user._doc;

    // Send response with user details (excluding password)
    res.status(200).json({ details: { ...otherDetails } });
    console.log("Logged in successfully");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
