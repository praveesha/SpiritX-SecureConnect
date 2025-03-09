const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

// Signup
router.post('/signup', async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body;

        if (!username || !password || !confirmPassword) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (username.length < 8) {
            return res.status(400).json({ error: 'Username must be at least 8 characters long' });
        }

        // Password must contain at least one lowercase letter, one uppercase letter, and one special character
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/.test(password)) {
            return res.status(400).json({ error: 'Password must contain at least one lowercase letter, one uppercase letter, and one special character' });
        }

        // Ensure the passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        // Check if a user with this username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user without the email
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully! Redirecting to login...' });
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Incorrect password' });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: `Hello, ${user.username}!`, token });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

router.get('/user/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');  // Exclude the password field
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);  // Send the user profile details
    } catch (error) {
        console.error('Profile Error:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

module.exports = router;