import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContacts } from "Redux/Actions/phonebookActions";
import ContactForm from '../../components/ContactForm/ContactForm';
import ContactList from '../../components/ContactList/ContactList';
import Filter from '../../components/Filter/Filter';
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