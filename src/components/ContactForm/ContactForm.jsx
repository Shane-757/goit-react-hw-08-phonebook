import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from '../PhonebookSlice/PhonebookSlice';
import { Box, Button, FormControl, FormLabel, Input, Heading } from '@chakra-ui/react';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.phonebook.contacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const existingContact = contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      alert(`${name} is already in contacts.`);
    } else {
      dispatch(addContact({ name, number }));
      setName('');
      setNumber('');
    }
  };

    return (
    <Box as="form" onSubmit={handleSubmit} width="300px" margin="auto">
      <Heading as="h2" size="md" mb={4}>Name</Heading>
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input 
          type="text"
          name="name"
          pattern="^[a-zA-Za-яА-Я]+(([' -][a-zA-Za-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
          value={name}
          onChange={handleInputChange} 
        />
      </FormControl>

      <Heading as="h2" size="md" mt={4} mb={4}>Phone Number</Heading>
      <FormControl id="number" isRequired>
        <FormLabel>Phone Number</FormLabel>
        <Input 
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={number}
          onChange={handleInputChange}
        />
      </FormControl>

      <Button mt={4} colorScheme="teal" type="submit">Add Contact</Button>
    </Box>
  );
};

export default ContactForm;
