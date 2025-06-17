const express = require('express');
const router = express.Router();
const User = require('../models/User');

const bcrypt = require('bcrypt');
const authenticateToken = require('../auth/authMiddleware');

// Register route (POST /register)
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Login route (POST /login)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid email or password' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ error: 'Invalid email or password' });

        const token = require('jsonwebtoken').sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET || 'your_jwt_secret_key',
            { expiresIn: '1h' }
        );

        res.json({ message: 'Logged in successfully', token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Logout route - client side deletes token
router.post('/logout', (req, res) => {
    res.json({ message: 'Logout successful (delete token client-side)' });
});

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = new User({ name, email });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: 'Invalid ID format' });
    }
});

// Delete user route protected by JWT middleware
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        if (req.user.userId !== req.params.id) {
            return res.status(403).json({ error: 'Forbidden: cannot delete other users' });
        }
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Invalid ID format' });
    }
});

module.exports = router;
