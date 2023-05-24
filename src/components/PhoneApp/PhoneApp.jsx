import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContacts } from 'components/PhonebookSlice/PhonebookSlice';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';

const PhoneApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="PhoneApp">
      <h1>Phone Book</h1>
      <ContactForm />
      <Filter />
      <ContactList />
    </div>
  );
};

export default PhoneApp;