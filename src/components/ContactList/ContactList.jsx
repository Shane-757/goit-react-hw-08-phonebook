import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, updateContact } from "Redux/Actions/phonebookActions";
import { Box, Button, UnorderedList, ListItem, Heading, Center, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input } from '@chakra-ui/react';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.phonebook.contacts);
  const filter = useSelector((state) => state.phonebook.filter);
  const sort = useSelector((state) => state.phonebook.sort);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  let filteredContacts = contacts.filter((contact) =>
  (contact.name && contact.name.toLowerCase().includes(filter.toLowerCase())) ||
  (contact.number && contact.number.includes(filter))
);

  if (sort === 'asc') {
    filteredContacts = filteredContacts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'desc') {
    filteredContacts = filteredContacts.sort((a, b) => b.name.localeCompare(a.name));
  }

 const handleUpdate = () => {
  dispatch(updateContact({id: currentContact.id, name: newName, number: newNumber}));
  setUpdateModalOpen(false);
};

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
            <Button 
              ml={4}
              colorScheme="blue" 
              size="xs" 
              onClick={() => {
                setCurrentContact(contact);
                setUpdateModalOpen(true);
              }}
            >
              Update
            </Button>
          </ListItem>
        ))}
      </UnorderedList>
      </Center>
      <Modal isOpen={updateModalOpen} onClose={() => setUpdateModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Contact</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="New Name" value={newName} onChange={(e) => setNewName(e.target.value)} />
            <Input placeholder="New Number" value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
              Update
            </Button>
            <Button variant="ghost" onClick={() => setUpdateModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ContactList;