import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import contactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
  const { id, name, email, phone, type } = contact;
  const { deleteContact, setCurrent, clearCurrent } =
    useContext(contactContext);

  return (
    <div className='card bg-light border-radius'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type.toLowerCase() === 'professional'
              ? 'badge-success'
              : 'badge-primary')
          }
        >
          {type[0].toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open'></i> {email}{' '}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone'></i> {phone}{' '}
          </li>
        )}
      </ul>
      <button
        className='btn btn-dark btn-sm border-radius'
        onClick={() => setCurrent(contact)}
      >
        Edit
      </button>
      <button
        className='btn btn-danger btn-sm border-radius'
        onClick={() => {
          deleteContact(id);
          clearCurrent();
        }}
      >
        Delete
      </button>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
