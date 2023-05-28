import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../PhonebookSlice/PhonebookSlice';
import { Box, Button, UnorderedList, ListItem, Heading, Center } from '@chakra-ui/react';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.phonebook.contacts);
  const filter = useSelector((state) => state.phonebook.filter);
  const sort = useSelector((state) => state.phonebook.sort);

  let filteredContacts = contacts.filter((contact) =>
  (contact.name && contact.name.toLowerCase().includes(filter.toLowerCase())) ||
  (contact.number && contact.number.includes(filter))
);

   if (sort === 'asc') {
    filteredContacts = filteredContacts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'desc') {
    filteredContacts = filteredContacts.sort((a, b) => b.name.localeCompare(a.name));
  }

  return (
    <Box>
      <Center>
      {filteredContacts.length > 0 && (
        <Heading as="h2" size="md" my={4}>Contacts</Heading>
        )}
        </Center>
      <Center>
      <UnorderedList>
        {filteredContacts.map((contact) => (
          <ListItem key={contact.id}>
            {contact.name}: {contact.number}
            <Button 
              ml={4}
              colorScheme="red" 
              size="xs" 
              onClick={() => dispatch(deleteContact(contact.id))}
            >
              Delete
            </Button>
          </ListItem>
        ))}
        </UnorderedList>
        </Center>
    </Box>
  );
};

export default ContactList;