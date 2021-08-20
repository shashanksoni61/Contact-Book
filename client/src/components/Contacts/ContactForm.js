import React, { useContext, useState } from 'react';
import contactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const { addContact } = useContext(contactContext);

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
    addContact(contact);
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal',
    });
  };

  return (
    <form onSubmit={submitContact}>
      <h2 className='text-primary'>Add Contact</h2>
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
          value='Add Contact'
          className='btn btn-primary btn-block'
        />
      </div>
    </form>
  );
};

export default ContactForm;
