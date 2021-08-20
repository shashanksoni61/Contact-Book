import React from 'react';
import ContactForm from '../Contacts/ContactForm';
import Contacts from '../Contacts/Contacts';

const Home = props => {
  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
