import { useState } from "react";

import { Calendar } from "rsuite";

import "rsuite/dist/rsuite.min.css";
import CreateWfhRequestForm from "../CreateWfhRequestForm/CreateWfhRequestForm";

const OrganizationUserCalendar = () => {
  const [popup, setPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const formatDate = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const showPopup = () => {
    setPopup(true);
  }

  const hidePopup = () => {
    setPopup(false);
  }

  const handleSelect = (date: Date) => {
    const newDate = formatDate(date);
    setSelectedDate(newDate);
    showPopup();
  }


  return (
    <>
      <Calendar
        bordered
        onSelect={handleSelect}
      />
      {popup ? <CreateWfhRequestForm requestDate={selectedDate} closePopup={hidePopup}/> : <></>}
    </>
  );
};

export default OrganizationUserCalendar;
