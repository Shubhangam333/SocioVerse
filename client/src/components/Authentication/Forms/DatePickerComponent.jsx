import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";

const DatePickerComponent = ({ dob }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="flex flex-col gap-2 text-slate-950 mb-2 ">
      <h2>Please Select your Date of Birth</h2>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy" // You can customize the date format
        placeholderText="Select a date"
        dob={selectedDate}
        className="w-80 focus:outline-none focus:border-2 border-slate-500 text-lg font-serif "
      />

      {selectedDate && (
        <p>Selected date: {selectedDate.toLocaleDateString()}</p>
      )}
    </div>
  );
};

DatePickerComponent.propTypes = {
  dob: PropTypes.instanceOf(Date),
};

export default DatePickerComponent;
