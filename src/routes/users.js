// src/routes/user.js
const auth = require('../config/authentications');

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create a new user
router.post('/', async (req, res) => {
  try {
    const userPayload = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 12),
      status: req.body.status,
    }
    const user = await User.create(userPayload);
    res.json({
      status: 'success',
      message: 'User Registered!',
      data: { user: { email: user.email}},
    });
  } catch (error) {
    // res.status(500).json({ message: 'Failed to create user.' });
    res.status(500).json({ message: error.message });
  }
});

// Get all users
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users.' });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found.' });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user.' });
  }
});

// Update user by ID
router.put('/:id', async (req, res) => {
  const userPayload = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 12),
    status: req.body.status,
  }
  try {
    const [updatedRowsCount] = await User.update(userPayload, {
      where: { id: req.params.id }
    });
    if (updatedRowsCount === 0) {
      res.status(404).json({ message: 'User not found.' });
    } else {
      const user = await User.findByPk(req.params.id);
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user.' });
  }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedRowsCount = await User.destroy({ where: { id: req.params.id } });
    if (deletedRowsCount === 0) {
      res.status(404).json({ message: 'User not found.' });
    } else {
      res.json({ message: 'User deleted successfully.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user.' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}});
    if(!user){
      res.status(401).json({ message: 'User not found' });
    }else if (await bcrypt.compare(req.body.password, user['password'])) {
      const tokenPayload = {
        email: user['email'],
      };
      res.json(
        {
          status: 'success',
          message: 'User Logged In!',
          token: jwt.sign(tokenPayload, 'SECRET')
        }
      );
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
