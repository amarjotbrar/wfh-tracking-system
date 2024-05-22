import styles from "./OrganizationUserHome.module.scss";
import NavBar from "../../molecules/NavBar/NavBar";
import OrganizationUserCalendar from "../../organisms/OrganizationUserCalander/OrganizationUserCalendar";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

const OrganizationUserHome = () => {
  const [navtext, setnavtext] = useState("");

  const handleNavText = (text: string) => {
    setnavtext(text);
  } 
  return (
    <>
      <NavBar NavText={navtext} logout={true}/>
      <div className={styles.OrganizationUserHome}>
        <OrganizationUserCalendar handleNavText={handleNavText}/>
      </div>
      <ToastContainer/>
    </>
  );
};

export default OrganizationUserHome;
