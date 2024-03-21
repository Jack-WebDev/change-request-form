import { useState } from 'react';
import "./DateInput.css"

function DateInput() {
  const [selectedDate, setSelectedDate] = useState('');

  // Get today's date in the format YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    // <div>
      <input
        type="date"
        id="dateInput"
        value={selectedDate}
        min={today}
        onChange={handleDateChange}
      />
    // </div>
  );
}

export default DateInput;
