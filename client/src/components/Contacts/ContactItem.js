import React from 'react';

const ContactItem = ({ contact: { id, name, email, phone, type } }) => {
  return (
    <div className='card bg-light border-radius'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
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
      <button className='btn btn-dark btn-sm border-radius'>Edit</button>
      <button className='btn btn-danger btn-sm border-radius'>Delete</button>
    </div>
  );
};

export default ContactItem;
