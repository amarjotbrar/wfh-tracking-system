//modules
import { useEffect, useState } from "react";

//library components
import { Button } from "rsuite";
import { ToastContainer } from "react-toastify";

//components
import NavBar from "../../molecules/NavBar/NavBar";
import CreateOrganizationForm from "../../organisms/CreateOrganizationForm/CreateOrganizationForm";
import ShowAllOrganizations from "../../organisms/ShowAllOrganizations/ShowAllOrganizations";

//styles
import styles from "./SystemUserHome.module.scss";
import { useNavigate } from "react-router-dom";
import { verifyUser } from "../../services/verifyToken/verifyToken";

const SystemUserHome = () => {
  const [popup, setPopup] = useState(false);
  const [change, setChange] = useState(true);
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
        if(userType === 'admin') navigate("/org/admin");
        else if(userType === 'user') navigate("/org/user");
      }
      else{
        localStorage.removeItem('token');
        navigate('/')
      }
    }
    verify();
  },[navigate])

  const toggleChange = () => {
    setChange(!change);
  }

  const openPopup = () => {
    setPopup(true);
  };

  const closePopup = () => {
    setPopup(false);
  }

  return (
    <>
      <NavBar NavText="System User" logout={true}/>
      <div className={styles.SystemUserHomeBody}>
        <div className={styles.CreateOrganizationContainer}>
          <Button className={styles.CreateButton}
            size="lg"
            appearance="primary"
            color="green"
            onClick={openPopup}
          >
            Create Organization
          </Button>
        </div>
        <div className={styles.AllOrganizationsContainer}>
          <ShowAllOrganizations change={change}/>
        </div>
      </div>
      {popup ? <CreateOrganizationForm closePopup = {closePopup} toggleChange={toggleChange}/> : <></>}
      <ToastContainer/>
    </>
  );
};

export default SystemUserHome;
