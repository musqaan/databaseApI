const express = require('express');
const router = express.Router();
const { registerUser, getAllUsers, updateUser, deleteUser } = require('../controllers/userController');
const authenticateJWT = require('../middleware/authMiddleware');

// User registration route
router.post('/users', registerUser);

// Fetch all users (secure this route with JWT)
router.get('/users', authenticateJWT, getAllUsers);

// Update user details (secure this route with JWT)
router.put('/users/:id', authenticateJWT, updateUser);

// Delete user (secure this route with JWT)
router.delete('/users/:id', authenticateJWT, deleteUser);

module.exports = router;
