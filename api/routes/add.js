import express from "express";
import { dbGet,dbRun } from "../database/connectionDB.js";
import bcrypt from 'bcryptjs';

const router = express.Router();

// POST /api/register - Add new user

router.post('/', async (req, res) => {
    const { username, email, dateOfBirth, gender, password } = req.body;

    // Check if any required fields are empty
    if (!username || !email || !dateOfBirth || !gender || !password) {
        return res.status(400).json({ message: 'Please provide all required fields.', user: null });
    }

    try {
        // Check if the username already exists
        const userCheck = await dbGet('SELECT * FROM users WHERE username = $1', [username]);
        console.log(userCheck)
        if (userCheck?.username) {

            return res.status(400).json({ message: 'Username already exists. Please choose a different username.', user: null });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        const result = await dbRun(
            'INSERT INTO users (username, email, date_of_birth, gender, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [username, email, dateOfBirth, gender, hashedPassword]
        );

        res.status(201).json({ message: 'User registered successfully', user: result });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'An error occurred while registering user. Please try again later.', user: null });
    }
});

export default router;
