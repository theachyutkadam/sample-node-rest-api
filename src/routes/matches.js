// src/routes/match.js
const auth = require('../config/authentications');
const express = require('express');
const router = express.Router();
const Match = require('../models/match');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create a new match
router.post('/', async (req, res) => {
  try {
    const match = await Match.create(req.body);
    res.json({
      status: 'success',
      message: 'Match Registered!',
      data: { match: match },
    });
  } catch (error) {
    if(error.errors[0].message){
      res.status(500).json({ message: error.errors[0].message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// Get all matches
router.get('/', auth, async (req, res) => {
  try {
    const matches = await Match.findAll();
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch matches.' });
  }
});

// Get match by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const match = await Match.findByPk(req.params.id);
    if (!match) {
      res.status(404).json({ message: 'Match not found.' });
    } else {
      res.json(match);
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch match.' });
  }
});

// Update match by ID
router.put('/:id', auth, async (req, res) => {
  try {
    const [updatedRowsCount] = await Match.update(req.body, {
      where: { id: req.params.id }
    });
    if (updatedRowsCount === 0) {
      res.status(404).json({ message: 'Match not found.' });
    } else {
      const match = await Match.findByPk(req.params.id);
      res.json(match);
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update match.' });
  }
});

// Delete match by ID
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedRowsCount = await Match.destroy({ where: { id: req.params.id } });
    if (deletedRowsCount === 0) {
      res.status(404).json({ message: 'Match not found.' });
    } else {
      res.json({ message: 'Match deleted successfully.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete match.' });
  }
});

module.exports = router;
