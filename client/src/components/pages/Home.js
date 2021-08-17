import React from 'react';
import Contacts from '../Contacts/Contacts';

const Home = props => {
  return (
    <div className='grid-2'>
      <div>{/* Contact Form */}</div>
      <div>
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
