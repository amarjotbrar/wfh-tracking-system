//modules
import { useState } from "react";

//library components
import { Button } from "rsuite";

//components
import NavBar from "../../molecules/NavBar/NavBar";
import CreateOrganizationForm from "../../organisms/CreateOrganizationForm/CreateOrganizationForm";
import ShowAllOrganizations from "../../organisms/ShowAllOrganizations/ShowAllOrganizations";

//styles
import styles from "./SystemUserHome.module.scss";

const SystemUserHome = () => {
  const [popup, setPopup] = useState(false);
  const [change, setChange] = useState(true);

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
    </>
  );
};

export default SystemUserHome;
