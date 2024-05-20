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
      <NavBar />
      <div className={styles.SystemUserHomeBody}>
        <div className={styles.CreateOrganizationContainer}>
          <Button
            size="lg"
            appearance="primary"
            color="green"
            onClick={openPopup}
          >
            Create Organization
          </Button>
        </div>
        {popup ? <CreateOrganizationForm closePopup = {closePopup} toggleChange={toggleChange}/> : <></>}
        <div className={styles.AllOrganizationsContainer}>
          <ShowAllOrganizations change={change}/>
        </div>
      </div>
    </>
  );
};

export default SystemUserHome;
