import React from "react";
import { TextField } from "@mui/material";

const TextBox = ({ label, value, onChange }) => {
  return (
    <div className="w-64">
      <TextField
        label={label}
        value={value}
        onChange={onChange}
        fullWidth
        variant="outlined"
      />
    </div>
  );
};

export default TextBox;
