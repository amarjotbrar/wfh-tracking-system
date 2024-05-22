import styles from "./OrganizationAdminPage.module.scss";
import NavBar from "../../molecules/NavBar/NavBar";
import {ToastContainer} from "react-toastify";
import AdminDashboard from "../../organisms/AdminDashboard/AdminDashboard";
import { useState } from "react";

const OrganizationAdminPage = () => {
  const [org_name, setOrgname] = useState("");

  const handleOrgName = (name: string) => {
    setOrgname(name.toUpperCase());
  }
  return (
    <>
      <NavBar NavText={"Organization Admin " + org_name} logout={true}/>
        <div className={styles.AdminPageBody}>
          <AdminDashboard handleOrgName = {handleOrgName}/>
        </div> 
      <ToastContainer/>
    </>
  );
};

export default OrganizationAdminPage;
