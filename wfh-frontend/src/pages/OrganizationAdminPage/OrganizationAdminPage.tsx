import styles from "./OrganizationAdminPage.module.scss";
import NavBar from "../../molecules/NavBar/NavBar";
import {ToastContainer} from "react-toastify";
import AdminDashboard from "../../organisms/AdminDashboard/AdminDashboard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyUser } from "../../services/verifyToken/verifyToken";

const OrganizationAdminPage = () => {
  const [org_name, setOrgname] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const verify = async() => {
      const token = localStorage.getItem('token')
      if(!token)
      {
        return;
      }
      const response = await verifyUser(token);
      if(response.ok)
      {
        const result = await response.json();
        const userType = result.data.userType;
        console.log(userType)
        if(userType === 'system') navigate('/sys/home');
        else if(userType === 'user') navigate("/org/user");
      }
      else{
        localStorage.removeItem('token');
        navigate('/')
      }
    }
    verify();
  },[navigate])

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
