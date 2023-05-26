import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContacts } from '../PhonebookSlice/PhonebookSlice';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import { Box, Heading } from '@chakra-ui/react';

const PhoneApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Box className="PhoneApp">
      <Heading as="h1" size="lg">Phone Book</Heading>
      <ContactForm />
      <Filter />
      <ContactList />
    </Box>
  );
};

export default PhoneApp;