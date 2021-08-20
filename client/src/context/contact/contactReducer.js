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
} from '../types';

export default function contactReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, payload],
      };
    case DELETE_CONTACT:
      //   console.log('deleteContent dispatched from reducer with payload', payload);
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== payload),
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
          if (contact.id === payload.id) {
            return payload;
          }
          return contact;
        }),
      };
    }
    default:
      return state;
  }
}
