const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

// Importing User Model
const User = require('../models/User');

// @route       POST  api/v1/users
// @desc        register a user
// @access      Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check(
      'password',
      'Password with minimum 6 characters is required'
    ).isLength({
      min: 6,
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send(req.body);
  }
);

module.exports = router;
