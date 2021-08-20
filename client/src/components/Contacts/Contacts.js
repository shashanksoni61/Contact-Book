import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
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
      <TransitionGroup>
        {filteredResult &&
          filteredResult.map(contact => (
            <CSSTransition key={contact.id} timeout={500} classNames='item' r>
              <ContactItem contact={contact} />
            </CSSTransition>
          ))}
        {!filteredResult &&
          contacts.map(contact => (
            <CSSTransition key={contact.id} timeout={500} classNames='item'>
              <ContactItem contact={contact} />
            </CSSTransition>
          ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;
