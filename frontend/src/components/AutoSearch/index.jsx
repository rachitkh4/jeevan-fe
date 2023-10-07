import React, { useState } from 'react';
import { TextField, Autocomplete } from '@mui/material';

const AutoSearch = ({ data }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (event, value) => {
    setSearchValue(value);
    if (value.trim() === '') {
      setSearchResults([]);
    } else {
      const filteredResults = data.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  };

  return (
    <Autocomplete
      options={searchResults}
      getOptionLabel={(option) => option.name} // Return the 'name' property
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          variant="outlined"
          value={searchValue}
          onChange={handleSearchChange}
        />
      )}
    />
  );
};

export default AutoSearch;
