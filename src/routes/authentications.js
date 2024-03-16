// src/routes/user.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Login user
router.post('/login', async (req, res) => {
  try {
    console.log('Check--payload->', req.body);
    const user = await User.find(req.body.email);
    console.log('Check--response->', user);
    res.json("546s4df6s4df6s5d4f6s54df6s5d4f654");
  } catch (error) {
    // res.status(500).json({ message: 'Failed to create user.' });
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
