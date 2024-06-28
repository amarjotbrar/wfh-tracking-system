import styles from "./OrganizationUserHome.module.scss";
import NavBar from "../../molecules/NavBar/NavBar";
import OrganizationUserCalendar from "../../organisms/OrganizationUserCalander/OrganizationUserCalendar";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyUser } from "../../services/verifyToken/verifyToken";

const OrganizationUserHome = () => {
  const [navtext, setnavtext] = useState("");

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
        else if(userType === 'admin') navigate("/org/admin");
      }
      else{
        localStorage.removeItem('token');
        navigate('/')
      }
    }
    verify();
  },[navigate])

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
