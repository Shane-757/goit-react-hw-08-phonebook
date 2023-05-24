import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../PhonebookSlice/PhonebookSlice';
import styles from './ContactList.module.css';

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
    <div>
      {filteredContacts.length > 0 && (
        <h2 className={styles.contactTitle}>Contacts</h2>
      )}
      <ul>
        {filteredContacts.map((contact) => (
          <li className={styles.contactInfo} key={contact.id}>
            {contact.name}: {contact.number}
            <button
              className={styles.deleteButton}
              onClick={() => dispatch(deleteContact(contact.id))}
            >
              Delete
            </button>
          </li>
        ))}
        </ul>
    </div>
  );
};

export default ContactList;