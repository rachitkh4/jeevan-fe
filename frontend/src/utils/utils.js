import { format } from "date-fns";

export const convertDateFormat = (dateString, formatNeeded) => {
  const formattedDate = format(new Date(dateString), formatNeeded);
  return formattedDate;
};

export const convertToNumber = (value) => {
  const parsedValue = parseFloat(value);
  return isNaN(parsedValue) ? value : parsedValue;
};

export const getDayFromString = (value) => {
  const date = new Date(value);
  const day = date.toLocaleDateString("en-US", { weekday: "long" });
  return day;
};

export const convertTimeSlot = (timeSlot24hr) => {
  let timeParts = timeSlot24hr.split('-');
  let startTime = timeParts[0].trim();
  let endTime = timeParts[1].trim();

  let startTimeParts = startTime.split(':');
  let startHours = parseInt(startTimeParts[0]);
  let startMinutes = parseInt(startTimeParts[1]);

  let endTimeParts = endTime.split(':');
  let endHours = parseInt(endTimeParts[0]);
  let endMinutes = parseInt(endTimeParts[1]);

  let startMeridiem = (startHours < 12) ? 'AM' : 'PM';
  let endMeridiem = (endHours < 12) ? 'AM' : 'PM';

  if (startHours === 0) {
    startHours = 12;
  } else if (startHours > 12) {
    startHours -= 12;
  }

  if (endHours === 0) {
    endHours = 12;
  } else if (endHours > 12) {
    endHours -= 12;
  }

  let convertedTimeSlot =
    startHours + ':' + (startMinutes < 10 ? '0' + startMinutes : startMinutes) + startMeridiem +
    ' - ' +
    endHours + ':' + (endMinutes < 10 ? '0' + endMinutes : endMinutes) + endMeridiem;

  return convertedTimeSlot;
}
