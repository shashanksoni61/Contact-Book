const express = require('express');
const router = express.Router();

// @route       POST  api/v1/users
// @desc        register a user
// @access      Public
router.post('/', (req, res) => {
  res.send('Register user route');
});

module.exports = router;
