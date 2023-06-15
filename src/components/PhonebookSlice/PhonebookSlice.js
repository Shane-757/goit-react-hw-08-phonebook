import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
  contacts: [],
  filter: '',
  sort: '',
  status: 'idle',  
  error: null,  
};

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
  const response = await fetch(`https://connections-api.herokuapp.com/docs/#/contacts/${id}`, {
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