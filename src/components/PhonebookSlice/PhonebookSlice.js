import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = {
  contacts: [],
  filter: '',
  sort: '',
  status: 'idle',  // to represent the loading status
  error: null,  // to store any error message
};

// Fetch contacts from API
export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  const response = await fetch('https://646796f0e99f0ba0a812b3b3.mockapi.io/contacts');
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Failed to fetch contacts');
  }
});

// Add a new contact
export const addContact = createAsyncThunk('contacts/addContact', async ({ name, number }) => {
  const newContact = { id: nanoid(), name, number };
  const response = await fetch('https://646796f0e99f0ba0a812b3b3.mockapi.io/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
  const response = await fetch(`https://646796f0e99f0ba0a812b3b3.mockapi.io/contacts/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    return id;
  } else {
    throw new Error('Failed to delete contact');
  }
});

const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.filter = action.payload;
    },
    changeSort: (state, action) => {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addContact.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contacts.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteContact.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { changeFilter, changeSort } = phonebookSlice.actions;
export default phonebookSlice.reducer;