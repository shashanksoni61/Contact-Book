import React, { useContext, useState, useEffect } from 'react';
import contactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const { addContact, current, updateContact, clearCurrent } =
    useContext(contactContext);

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    }
  }, [current]);

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  const { name, email, phone, type } = contact;

  const contacstInput = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const submitContact = e => {
    e.preventDefault();
    if (current !== null) {
      updateContact(contact);
    } else {
      addContact(contact);
    }
    clearCurrent();
  };

  return (
    <form onSubmit={submitContact}>
      <h2 className='text-primary'>
        {current !== null ? 'Edit' : 'Add'} Contact
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={contacstInput}
      />
      <input
        type='text'
        placeholder='Email'
        name='email'
        value={email}
        onChange={contacstInput}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={contacstInput}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        placeholder='Type'
        name='type'
        value='personal'
        checked={type.toLowerCase() === 'personal'}
        onChange={contacstInput}
      />
      Personal{' '}
      <input
        type='radio'
        placeholder='Type'
        name='type'
        value='professional'
        checked={type.toLowerCase() === 'professional'}
        onChange={contacstInput}
      />
      Professional{' '}
      <div>
        <input
          type='submit'
          value={current !== null ? 'Update Contact' : 'Add Contact'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button
            className='btn btn-gray btn-block'
            onClick={() => {
              clearCurrent();
            }}
          >
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
