const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();

const auth = require('../middleware/auth');
const Contact = require('../models/Contact');

// @route       GET  api/v1/contacts
// @desc        get  all contacts of logged user
// @access      Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       POST  api/v1/contacts
// @desc        add new contact
// @access      Private
router.post(
  '/',
  [auth, check('name', 'Name is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route       PUT  api/v1/contacts/:id
// @desc        Update contact by id
// @access      Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // build contact object initially
  const contactFields = {};

  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact)
      return res.status(404).json({ msg: 'Contact Does Not Exist' });

    // make sure user owned the contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Invalid Contact Id' });

    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       DELETE  api/v1/contacts/:id
// @desc        Delete contact by id
// @access      Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact)
      return res.status(404).json({ msg: 'Contact Does Not Exist' });

    // make sure user owned the contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Contact Removed' });
  } catch (err) {
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Invalid Contact Id' });
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
