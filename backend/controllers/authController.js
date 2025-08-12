const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const register = async (req, res) => {
    try {
        const {name, email, password, role} = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(409).json({error: 'Email already in use'});

        const hashedPassword = await bcrypt.hash(password, 10);
        const userRole = role && ['user', 'admin'].includes(role) ? role : 'user';

        const user = new User({name, email, password: hashedPassword, role: userRole});
        await user.save();

        const {password: _, ...userData} = user.toObject();
        res.status(201).json(userData);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({error: 'Invalid credentials'});

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({error: 'Invalid credentials'});

        const token = jwt.sign(
            {userId: user._id, email: user.email, role: user.role},
            process.env.JWT_SECRET || 'your_jwt_secret_key',
            {expiresIn: '1h'}
        );

        res.json({message: 'Login successful', token});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

const logout = (req, res) => {
    // Usually logout is client-side by deleting the token
    res.json({message: 'Logout successful (client should delete token)'});
};


module.exports = {
    register,
    login,
    logout,
};
