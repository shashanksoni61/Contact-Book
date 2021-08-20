import React, { Fragment, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactForm from './ContactForm';
import ContactItem from './ContactItem';

const Contacts = () => {
  const { contacts } = useContext(ContactContext);
  // you can right away destructre it or you can do this
  // const contactContext = useContext(ContactContext);

  return (
    <Fragment>
      {contacts.map(contact => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </Fragment>
  );
};

export default Contacts;
