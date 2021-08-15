const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

//Model
const User = require('../models/User');

const router = express.Router();

// @route       GET api/v1/auth
// @desc        get the logged in users
// @access      private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       POST api/v1/auth
// @desc        Authenticate/Log In the user and get JWT token
// @access      private
router.post(
  '/',
  [
    check('email', 'Please Enter A Valid Email').isEmail(),
    check('password', 'Password Is Required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'User Does Not Exist' });
      }

      //comparing hashed password with entered password
      const isMatch = await bcrypt.compare(password, user.password);
      // bcrypt.compare(Kisko Compare karna, Kisse compare karna), it returns a boolean

      if (!isMatch) {
        return res.status(400).json({ msg: 'Password Does not Match' });
      }

      // both varified now so sending a token

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('JWTSecret'),
        {
          expiresIn: 7200,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
