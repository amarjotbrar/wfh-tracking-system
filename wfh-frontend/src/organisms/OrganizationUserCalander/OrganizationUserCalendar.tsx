import { useState, useEffect } from "react";

import { Calendar } from "rsuite";
import {toast} from "react-toastify";
import{ jwtDecode } from "jwt-decode";

import "rsuite/dist/rsuite.min.css";
import CreateWfhRequestForm from "../CreateWfhRequestForm/CreateWfhRequestForm";
import styles from "./OrganizationUserCalendar.module.scss"
import { showWfhRequests } from "../../services/organizationUserServices/organizationUserServices";
import { CalendarProps, requestData } from "./types";
import "./styles.css"
import RequestDetails from "../RequestDetails/RequestDetails";
import { tokenData } from "../AdminDashboard/types";

const OrganizationUserCalendar = ({handleNavText}: CalendarProps) => {
  const [popup, setPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [data, setData] = useState<requestData[]> ([]);
  const [details, setDetails] = useState(false);
  const [requestDetails, setRequestDetails] = useState<requestData | null> (null);
  const [remainingLeaves, setRemainingLeaves] = useState(0);
  const [maxWfhDays, setMaxWfhDays] = useState(0);

  const formatDate = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const today = new Date();
  const thisMonth = formatDate(today).substring(3);
  const [selectedMonth, setSelectedMonth] = useState(thisMonth);

  const getData = async () => {
    const token = localStorage.getItem('token');
    if(!token)
    {
      toast.error("Unauthorized Access!");
      return;
    }
    const decoded : tokenData  = jwtDecode(token);
    handleNavText(`Hello ${decoded.firstName}!`);
    try {
      const response = await showWfhRequests(token, selectedMonth);
      const result = await response.json();
      if(!response.ok)
      {
        toast.error(result.data.error)
      }
      if(response.ok)
      {
        setData(result.data.response);
        setMaxWfhDays(decoded.maxWfhDays);
      }
      
    } catch (error) {
      toast.error("Unable to fetch requests!");
    }
  };

  useEffect(() => {
    getData();
  },[selectedMonth]);

  useEffect(() => {
    setRemainingLeaves(countRemaining());
  },[data]);

  const showPopup = () => {
    setPopup(true);
  }

  const showDetails = () => {
    setDetails(true);
  }
  const hideDetails = () => {
    setDetails(false);
  }

  const hidePopup = () => {
    getData();
    setPopup(false);
  }

  const handleSelect = (date: Date) => {
    const newDate = formatDate(date);
    setSelectedDate(newDate);
    const isPresent = data.find(item => item.requestDate === newDate)
    if(isPresent)
    {
      setRequestDetails(isPresent);
      showDetails();
    }
    else
    {
      if(date < today){
        toast.error("Can only apply for future date!")
      }
      else if (remainingLeaves >= maxWfhDays) {
        toast.error("No WFH requests remaining for this month!")
      } else {
        showPopup();
      }
    }
  }

  const renderCell = (date: Date) => {
    const formattedDate = (formatDate(date));

    const isPresent = data.find(item => item.requestDate === formattedDate)
    let grey = ""
    if(date < today) grey = "Grey"
    if(date == today) grey = ""

    if(!isPresent)
    {
      return `Normal ${grey}`;
    }
    else
    {
      if(isPresent.isApproved === "Pending") return `Yellow ${grey}`;
      else if(isPresent.isApproved === "Approved") return `Green ${grey}`;
      else return `Red ${grey}`;
    }
  }

  const handleMonthChange = (date: Date) => {
    const newDate = formatDate(date);
    setSelectedMonth(newDate.substring(3));
  }

  const countRemaining = () => {
    const count = data.filter((request) => {
      return(request.isApproved === "Pending" || request.isApproved === "Approved");
    })
    if(!count)
    {
      return 0;
    }
    else
    {
      return Object.keys(count).length;
    }
  }


  return (
    <>
    <div className={styles.CalendarBody}>
    <div className={styles.leftBar}>
      <div className={styles.ColorPicker}>
          <div className={styles.yellowBox}></div>
          <p>Pending Request</p>
      </div>
      <div className={styles.ColorPicker}>
          <div className={styles.greenBox}></div>
          <p>Approved Request</p>
      </div>
      <div className={styles.ColorPicker}>
          <div className={styles.redBox}></div>
          <p>Rejected Request</p>
      </div>
      <div className={styles.ColorPicker}>
        <p>WFH days: <b>{remainingLeaves}/{maxWfhDays}</b></p>
      </div>
    </div>
    <div className={styles.CalendarContainer}>
      <Calendar
          bordered
          onSelect={handleSelect}
          cellClassName={renderCell}
          onMonthChange={handleMonthChange}
      />
    </div>
    </div>
    
      {popup ? <CreateWfhRequestForm requestDate={selectedDate} closePopup={hidePopup}/> : <></>}
      {details ? <RequestDetails requestDetails={requestDetails} hideDetails={hideDetails} requestDate={selectedDate}/> : <></>}
    </>
  );
};

export default OrganizationUserCalendar;
