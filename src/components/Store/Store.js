import { configureStore } from '@reduxjs/toolkit';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';
import phonebookReducer from '../PhonebookSlice/PhonebookSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, phonebookReducer);

export const store = configureStore({
  reducer: {
    phonebook: persistedReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);