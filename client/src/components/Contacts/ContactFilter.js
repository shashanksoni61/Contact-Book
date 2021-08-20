import React, { useContext, useEffect, useState } from 'react';
import contactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
  const { filterContacts, clearFilter } = useContext(contactContext);
  const [text, setText] = useState('');

  useEffect(() => {
    console.log('useEffect from filter ran');
    if (text !== '') {
      console.log('value of text inside useEffect', text);
      filterContacts(text);
    } else {
      clearFilter();
    }
  }, [text]);

  //   this is also working but upper code is better

  //   const filterInputHandler = e => {
  //     setText(e.target.value);
  //     console.log(text);
  //     if (text !== '') {
  //       filterContacts(text);
  //     }
  //   };

  //   useEffect(() => {
  //     console.log('useEffect from filter ran');
  //     console.log('value of text inside useEffect', text);
  //     if (text === '') {
  //       clearFilter();
  //     }
  //   }, [text]);

  return (
    <input
      type='text'
      placeholder='Enter text to filter'
      value={text}
      onChange={e => setText(e.target.value)}
    />
    // <input
    //   type='text'
    //   placeholder='Enter text to filter'
    //   value={text}
    //   onChange={filterInputHandler}
    // />
  );
};

export default ContactFilter;
