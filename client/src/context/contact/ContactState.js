// 2nd File for creating a state and exporting a provider component to wrap other components inside it

import { useReducer } from 'react';
import axios from 'axios';
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
  CONTACT_ERROR,
  GET_CONTACTS,
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filteredResult: null,
    error: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Actions
  // Get Contacts
  const getContacts = async () => {
    try {
      const res = await axios.get('/api/v1/contacts');
      dispatch({
        type: GET_CONTACTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // 1. Add contact
  const addContact = async contact => {
    console.log('Add contact Fired from context state/provider');
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/v1/contacts', contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // 2. Delete contact
  const deleteContact = async id => {
    console.log('working', id);
    try {
      await axios.delete(`/api/v1/contacts/${id}`);

      dispatch({
        type: DELETE_CONTACT,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
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

  // 8. Clear Contacts from state after logout
  const clearContacts = () => dispatch({ type: CLEAR_CONTACTS });

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filteredResult: state.filteredResult,
        error: state.error,
        getContacts,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        clearContacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
