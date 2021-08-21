import React, { useContext, useEffect } from 'react';
import ContactFilter from '../Contacts/ContactFilter';
import ContactForm from '../Contacts/ContactForm';
import Contacts from '../Contacts/Contacts';
import authContext from '../../context/auth/authContext';

const Home = () => {
  const { loadUser } = useContext(authContext);

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
