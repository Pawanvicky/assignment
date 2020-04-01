const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const verify = require('./verifyToken');

// Fetching all the users
router.get('/', (req, res, next) => {
  User.find()
    .exec()
    .then(usersList => res.status(200).json(usersList))
    .catch(err => res.status(500).json({ error: err }));
});

// Finding a specific user by ID
router.get('/:userId', (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .exec()
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

// Updating a specific user by ID
router.patch('/:userId', (req, res, next) => {
  const id = req.params.userId;
  User.updateOne(id)
    .exec()
    .then(user => {
      if (user) {
        user.userrole = req.body.userrole;
        user.status = req.body.status;
        user.save();
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

// Deleting a specific user by ID
router.delete('/:userId', (req, res, next) => {
  const id = req.params.userId;
  User.findByIdAndRemove(id)
    .exec()
    .then(result => {
      res.status(200).json({ message: 'User Removed' });
    })
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;