import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContacts } from '../PhonebookSlice/PhonebookSlice';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import { Box, Heading, Center } from '@chakra-ui/react';

const PhoneApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Box className="PhoneApp">
      <Center>
        <Heading as="h1" size="lg">Phone Book</Heading>
      </Center>
      <ContactForm />
      <Filter />
      <ContactList />
    </Box>
  );
};

export default PhoneApp;