import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';
import ContactState from '../../context/contact/ContactState';

const Contacts = () => {
  const { contacts, filteredResult, getContacts, loading } =
    useContext(ContactContext);
  // you can right away destructre it or you can do this
  // const contactContext = useContext(ContactContext);

  useEffect(() => {
    getContacts();
  }, []);

  if (contacts === null) {
    return <h4>Please add contacts</h4>;
  }
  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please Add a Contact</h4>;
  }
  if (filteredResult !== null && filteredResult.length === 0) {
    return <h4>No Match Found</h4>;
  }
  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {filteredResult &&
            filteredResult.map(contact => (
              <CSSTransition
                key={contact._id}
                timeout={500}
                classNames='item'
                r
              >
                <ContactItem contact={contact} />
              </CSSTransition>
            ))}
          {!filteredResult &&
            contacts.map(contact => (
              <CSSTransition key={contact._id} timeout={500} classNames='item'>
                <ContactItem contact={contact} />
              </CSSTransition>
            ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
