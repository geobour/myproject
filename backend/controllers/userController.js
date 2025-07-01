const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().lean();
        res.set('Cache-Control', 'no-store');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email and password are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userRole = role && ['user', 'admin'].includes(role) ? role : 'user';

        const user = new User({ name, email, password: hashedPassword, role: userRole });
        await user.save();

        // Avoid sending password hash back in response
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json(userResponse);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).lean();
        if (!user) return res.status(404).json({ error: 'User not found' });

        delete user.password; // don't send password hash
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: 'Invalid ID format' });
    }
};

exports.deleteUser = async (req, res) => {
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
};
