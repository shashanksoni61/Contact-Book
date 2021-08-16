import { useReducer } from 'react';
import { v4 } from 'uuid';
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
        type: 'Personal',
      },
      {
        id: 2,
        name: 'Test 1',
        email: 'test1@gmail.com',
        phone: '1234567890',
        type: 'Professional',
      },
      {
        id: 3,
        name: 'John Doe',
        email: 'jdoe@gmail.com',
        phone: '1234567890',
        type: 'Personal',
      },
    ],
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Actions
  // 1. Add contact
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
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
