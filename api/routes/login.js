import express from "express";
import { dbGet ,dbAll } from "../database/connectionDB.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {promisify} from 'util'
import dotenv from "dotenv";


dotenv.config();
const router = express.Router();



const asyncBcryptCompare = promisify(bcrypt.compare); // Promisify bcrypt.compare

// POST /api/login - User login
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide both username and password.',user : null });
    }

    try {
        // Get the user from the database
        const user = await dbGet('SELECT * FROM Users WHERE username = ?', [username]);
        console.log(user)
        // Check if the user exists
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password.',user : null });
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await asyncBcryptCompare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password.',user : null });
        }

        // If login is successful, generate JWT token
        const token = jwt.sign(
            { username: user.username, userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // Set cookie with the JWT token
        res.cookie('jwt', token, { httpOnly: true, maxAge: process.env.TIME_OUT ,secure: true}); // Cookie expires in 1 hour (3600000 ms)
         
        // Respond with success message and username
        res.status(200).json({ message: 'Login successful', user : user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'An error occurred while logging in. Please try again later.',user : null });
    }
});

export default router;
