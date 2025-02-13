const bcrypt = require('bcryptjs');
const db = require('../config/db');
const { generateToken } = require('../utils/jwtUtils');

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
    if (err) return res.status(500).send('Server error');
    
    if (result.length > 0) {
      return res.status(400).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', 
      [name, email, hashedPassword, role], (err, result) => {
        if (err) return res.status(500).send('Error creating user');
        
        const newUser = { id: result.insertId, name, email, role };
        const token = generateToken(newUser);
        
        res.status(201).json({ user: newUser, token });
    });
  });
};

// Fetch all users
const getAllUsers = (req, res) => {
  db.query('SELECT id, name, email, role FROM users', (err, result) => {
    if (err) return res.status(500).send('Error fetching users');
    
    res.status(200).json(result);
  });
};

// Update user details
const updateUser = (req, res) => {
  const userId = req.params.id;
  const { name, email, role } = req.body;
  
  db.query('UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?', 
    [name, email, role, userId], (err, result) => {
      if (err) return res.status(500).send('Error updating user');
      
      if (result.affectedRows === 0) {
        return res.status(404).send('User not found');
      }
      
      res.status(200).send('User updated');
  });
};

// Delete a user
const deleteUser = (req, res) => {
  const userId = req.params.id;
  
  db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
    if (err) return res.status(500).send('Error deleting user');
    
    if (result.affectedRows === 0) {
      return res.status(404).send('User not found');
    }
    
    res.status(200).send('User deleted');
  });
};

module.exports = {
  registerUser,
  getAllUsers,
  updateUser,
  deleteUser
};
