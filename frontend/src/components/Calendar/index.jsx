import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Calendar = ({selectedDate, setSelectedDate}) => {
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DateCalendar
          value={selectedDate}
          onChange={handleDateChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default Calendar;
