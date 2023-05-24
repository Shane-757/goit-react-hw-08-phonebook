import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter, changeSort } from '../PhonebookSlice/PhonebookSlice';
import styles from './Filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.phonebook.filter);
  const sort = useSelector((state) => state.phonebook.sort);

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    dispatch(changeFilter(filterValue));
  };

  const handleSortChange = (event) => {
    dispatch(changeSort(event.target.value));
  };

  return (
    <>
      <h2 className={styles.filterTitle}>Search</h2>
      <input
        className={styles.filterInput}
        type="text"
        name="filter"
        value={filter}
        onChange={handleFilterChange}
      />
      <select className={styles.filterInput} value={sort} onChange={handleSortChange}>
        <option value="asc">Alphabetical</option>
        <option value="desc">Reverse Alphabetical</option>
      </select>
    </>
  );
};

export default Filter;