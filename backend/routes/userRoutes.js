const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Admin Login Route
router.post('/adminLogin', userController.adminLogin);

// User Login Route
router.post('/userLogin', userController.userLogin);

// Add User Route (Admin Only)
router.post('/addUser', userController.addUser);

// Delete User Route (Admin Only)
router.delete('/deleteUser/:userId', userController.deleteUser);

module.exports = router;