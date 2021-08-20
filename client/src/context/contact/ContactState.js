// 2nd File for creating a state and exporting a provider component to wrap other components inside it

import { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  UPDATE_CONTACT,
  CLEAR_CONTACTS,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Shashank Soni',
        email: 'shashanksoni61@gmail.com',
        phone: '1234567890',
        type: 'personal',
      },
      {
        id: 2,
        name: 'Test 1',
        email: 'test1@gmail.com',
        phone: '1234567890',
        type: 'professional',
      },
      {
        id: 3,
        name: 'John Doe',
        email: 'jdoe@gmail.com',
        phone: '1234567890',
        type: 'personal',
      },
      {
        id: 4,
        name: 'Naruto Uzumaki',
        email: 'hokage@gmail.com',
        phone: '1234567890',
        type: 'Professional',
      },
    ],
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Actions
  // 1. Add contact
  const addContact = contact => {
    contact.id = uuid();
    dispatch({
      type: ADD_CONTACT,
      payload: contact,
    });
  };
  // 2. Delete contact
  // 3. Set Current contact
  // 4. Clear current contact
  // 5. Update contact
  // 6. Filter Contacts
  // 7. clear filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addContact,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
