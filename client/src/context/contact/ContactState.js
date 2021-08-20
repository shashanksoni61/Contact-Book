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
  CLEAR_CURRENT,
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
    current: null,
    filteredResult: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Actions
  // 1. Add contact
  const addContact = contact => {
    console.log('Add contact Fired from context state/provider');
    contact.id = uuid();
    dispatch({
      type: ADD_CONTACT,
      payload: contact,
    });
  };

  // 2. Delete contact
  const deleteContact = id => {
    // console.log('working', id);
    dispatch({
      type: DELETE_CONTACT,
      payload: id,
    });
  };

  // 3. Set Current contact
  const setCurrent = contact => {
    console.log('set current fired from context state/provider', contact);
    dispatch({
      type: SET_CURRENT,
      payload: contact,
    });
  };

  // 4. Clear current contact
  const clearCurrent = () => {
    console.log('clear current fired');
    dispatch({
      type: CLEAR_CURRENT,
    });
  };

  // 5. Update contact
  const updateContact = current => {
    console.log('update contact fired from context state/provider');
    console.log('with updated contact', current);
    dispatch({
      type: UPDATE_CONTACT,
      payload: current,
    });
  };

  // 6. Filter Contacts
  const filterContacts = text => {
    console.log('filter contact fired from context state/provider');
    dispatch({
      type: FILTER_CONTACTS,
      payload: text,
    });
  };

  // 7. clear filter
  const clearFilter = () => {
    console.log('clear filter fired from context state/provider');
    dispatch({
      type: CLEAR_FILTER,
    });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filteredResult: state.filteredResult,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
