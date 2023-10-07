import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const CustomAutoComplete = ({
  handleInputChange,
  handleOptionChange,
  options,
  setOptions,
  autocompleteRef,
  label = "",
  placeholder = "",
}) => {
  return (
    <Autocomplete
      freeSolo
      ref={autocompleteRef}
      options={options}
      getOptionLabel={(option) => option?.label}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          onChange={handleInputChange}
          placeholder={placeholder}
        />
      )}
      onChange={handleOptionChange}
    />
  );
};

export default CustomAutoComplete;
