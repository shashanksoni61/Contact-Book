import React, { Fragment, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactForm from './ContactForm';
import ContactItem from './ContactItem';

const Contacts = () => {
  const { contacts, filteredResult } = useContext(ContactContext);
  // you can right away destructre it or you can do this
  // const contactContext = useContext(ContactContext);

  if (contacts.length === 0) {
    return <h4>Please Add a Contact</h4>;
  }
  if (filteredResult !== null && filteredResult.length === 0) {
    return <h4>No Match Found</h4>;
  }
  return (
    <Fragment>
      {filteredResult &&
        filteredResult.map(contact => (
          <ContactItem key={contact.id} contact={contact} />
        ))}
      {!filteredResult &&
        contacts.map(contact => (
          <ContactItem key={contact.id} contact={contact} />
        ))}
    </Fragment>
  );
};

export default Contacts;
