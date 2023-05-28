import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from '../PhonebookSlice/PhonebookSlice';
import { Box, Button, FormControl, FormLabel, Input, Center, useToast } from '@chakra-ui/react';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.phonebook.contacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const toast = useToast();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const existingContact = contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      toast({
        title: "Error",
        description: `${name} is already in contacts.`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      dispatch(addContact({ name, number }));
      setName('');
      setNumber('');
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} width="300px" margin="auto">
      
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input 
          type="text"
          name="name"
          pattern="^[a-zA-Za-яА-Я]+(([' -][a-zA-Za-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
          value={name}
          onChange={handleNameChange} 
        />
      </FormControl>

      
      <FormControl id="number" isRequired>
        <FormLabel>Phone Number</FormLabel>
        <Input 
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={number}
          onChange={handleNumberChange}
        />
      </FormControl>
        <Center>
          <Button mt={4} colorScheme="teal" type="submit">Add Contact</Button>
        </Center>
    </Box>
  );
};

export default ContactForm;