// 3rd file to handle dispatched action from Components

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

export default function contactReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: payload,
        loading: false,
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [payload, ...state.contacts],
        loading: false,
      };

    case DELETE_CONTACT:
      //   console.log('deleteContent dispatched from reducer with payload', payload);
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact._id !== payload),
        loading: false,
      };

    case SET_CURRENT:
      console.log('set current dispatched from reducer with payload', payload);
      return {
        ...state,
        current: payload,
      };

    case CLEAR_CURRENT:
      console.log('clear current dispatched from reducer');
      return {
        ...state,
        current: null,
      };

    case UPDATE_CONTACT: {
      console.log('update contact dispatched from reducer');
      return {
        ...state,
        contacts: state.contacts.map(contact => {
          console.log('payload update contact from reducer ', payload);
          if (contact._id === payload._id) {
            return payload;
          }
          return contact;
        }),
        loading: false,
      };
    }

    case FILTER_CONTACTS:
      return {
        ...state,
        filteredResult: state.contacts.filter(contact => {
          const regex = new RegExp(`${payload}`, 'gi');
          return contact.name.match(regex) || contact.email.match(regex);
        }),
      };

    case CLEAR_FILTER:
      return {
        ...state,
        filteredResult: null,
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: payload,
      };

    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        filteredResult: null,
        error: null,
        current: null,
      };
    default:
      return state;
  }
}
