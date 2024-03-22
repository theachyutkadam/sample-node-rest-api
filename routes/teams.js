// src/routes/team.js
const auth = require('../config/authentications');
const express = require('express');
const router = express.Router();
const Team = require('../models/team');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create a new team
router.post('/', async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.json({
      status: 'success',
      message: 'Team Registered!',
      data: { team: team},
    });
  } catch (error) {
    if(error.errors[0].message){
      res.status(500).json({ message: error.errors[0].message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// Get all teams
router.get('/', auth, async (req, res) => {
  try {
    const teams = await Team.findAll();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teams.' });
  }
});

// Get team by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    if (!team) {
      res.status(404).json({ message: 'Team not found.' });
    } else {
      res.json(team);
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch team.' });
  }
});

// Update team by ID
router.put('/:id', auth, async (req, res) => {
  try {
    const [updatedRowsCount] = await Team.update(req.body, {
      where: { id: req.params.id }
    });
    if (updatedRowsCount === 0) {
      res.status(404).json({ message: 'Team not found.' });
    } else {
      const team = await Team.findByPk(req.params.id);
      res.json(team);
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update team.' });
  }
});

// Delete team by ID
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedRowsCount = await Team.destroy({ where: { id: req.params.id } });
    if (deletedRowsCount === 0) {
      res.status(404).json({ message: 'Team not found.' });
    } else {
      res.json({ message: 'Team deleted successfully.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete team.' });
  }
});

module.exports = router;
