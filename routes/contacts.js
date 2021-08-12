const express = require('express');
const router = express.Router();

// @route       GET  api/v1/contacts
// @desc        get  all users contacts of logged user
// @access      Private
router.get('/', (req, res) => {
  res.send('Get all Contacts');
});

// @route       POST  api/v1/contacts
// @desc        add new contact
// @access      Private
router.post('/', (req, res) => {
  res.send('Add new Contacts');
});

// @route       PUT  api/v1/contacts/:id
// @desc        Update contact by id
// @access      Private
router.put('/', (req, res) => {
  res.send('Update Contacts');
});

// @route       DELETE  api/v1/contacts/:id
// @desc        Delete contact by id
// @access      Private
router.delete('/', (req, res) => {
  res.send('Delete Contacts');
});

module.exports = router;
