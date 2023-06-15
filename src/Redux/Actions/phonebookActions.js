import { createAsyncThunk } from '@reduxjs/toolkit';

// Fetch contacts from API
export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  const userToken = localStorage.getItem('userToken');  
  const response = await fetch('https://connections-api.herokuapp.com/contacts', {
    headers: {
      'Authorization': `Bearer ${userToken}`,  
    },
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Failed to fetch contacts');
  }
});

// Add a new contact
export const addContact = createAsyncThunk('contacts/addContact', async ({ name, number }) => {
  const newContact = {
    "name": name,
    "number": number
  };
  const userToken = localStorage.getItem('userToken');  
  const response = await fetch('https://connections-api.herokuapp.com/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`,  
    },
    body: JSON.stringify(newContact),
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Failed to add contact');
  }
});

// Delete a contact
export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id) => {
  const userToken = localStorage.getItem('userToken');  
  const response = await fetch(`https://connections-api.herokuapp.com/contacts/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${userToken}`,  
    },
  });
  if (response.ok) {
    return id;
  } else {
    throw new Error('Failed to delete contact');
  }
});

// Update a contact
export const updateContact = createAsyncThunk('contacts/updateContact', async ({id, name, number}) => {
  if (!name || !number) {
    throw new Error('Both name and number must be provided for updating a contact');
  }

  const updatedContact = {
    "name": name,
    "number": number
  };
  const userToken = localStorage.getItem('userToken');  
  const response = await fetch(`https://connections-api.herokuapp.com/contacts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`,  
    },
    body: JSON.stringify(updatedContact),
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Failed to update contact');
  }
});