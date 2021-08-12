const express = require('express');
const router = express.Router();

// @route       GET api/v1/auth
// @desc        get the logged in users
// @access      private
router.get('/', (req, res) => {
  res.send('get logged user');
});

// @route       POST api/v1/auth
// @desc        Authenticate the user and get JWT token
// @access      private
router.post('/', (req, res) => {
  res.send('Login user');
});

module.exports = router;
