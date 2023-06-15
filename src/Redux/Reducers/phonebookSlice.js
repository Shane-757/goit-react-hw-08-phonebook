import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact, updateContact } from "Redux/Actions/phonebookActions";

const initialState = {
  contacts: [],
  filter: '',
  sort: '',
  status: 'idle',  
  error: null,  
};

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
      })
      .addCase(updateContact.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
        state.contacts[index] = action.payload;
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { changeFilter, changeSort } = phonebookSlice.actions;
export default phonebookSlice.reducer;