const User = require('../models/userModel');

// Hardcoded admin credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

// Admin Login
exports.adminLogin = async (req, res) => {
    const { userId, password } = req.body;
    try {
        if (userId === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            res.status(200).json({ success: true, role: 'admin', canAddEvidence: true });
        } else {
            res.status(401).json({ success: false, message: 'Invalid admin credentials' });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Add User (Admin Only)
exports.addUser = async (req, res) => {
    const { userId, password, role, canAddEvidence } = req.body;
    try {
        const newUser = new User({ userId, password, role, canAddEvidence });
        await newUser.save();
        res.status(201).json({ success: true, message: 'User added successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete User (Admin Only)
exports.deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        await User.deleteOne({ userId });
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// User Login
exports.userLogin = async (req, res) => {
    const { userId, password } = req.body;
    try {
        const user = await User.findOne({ userId });
        if (user && user.password === password) {
            res.status(200).json({ success: true, role: user.role, canAddEvidence: user.canAddEvidence });
        } else {
            res.status(404).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};