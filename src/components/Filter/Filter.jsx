import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter, changeSort } from '../PhonebookSlice/PhonebookSlice';
import { Box, Heading, Input, Select, Container } from '@chakra-ui/react';

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
    <Container maxW="container.md" width="300px" margin="auto">
    <Box>
        <Heading as="h2" size="md" mt={4} mb={4}>Search</Heading>
      <Input
        type="text"
        name="filter"
        value={filter}
        onChange={handleFilterChange}
        mb={4}
      />
      <Select value={sort} onChange={handleSortChange}>
        <option value="asc">Alphabetical</option>
        <option value="desc">Reverse Alphabetical</option>
      </Select>
      </Box>
      </Container>
  );
};

export default Filter;