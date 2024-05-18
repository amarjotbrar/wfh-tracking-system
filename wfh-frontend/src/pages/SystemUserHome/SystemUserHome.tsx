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

  const togglePopup = () => {
    setPopup(!popup);
  };

  return (
    <>
      <NavBar />
      <div className={styles.SystemUserHomeBody}>
        <div className={styles.CreateOrganizationContainer}>
          <Button
            size="lg"
            appearance="primary"
            color="green"
            onClick={togglePopup}
          >
            Create Organization
          </Button>
        </div>
        {popup ? <CreateOrganizationForm /> : <></>}
        <div className={styles.AllOrganizationsContainer}>
          <ShowAllOrganizations />
        </div>
      </div>
    </>
  );
};

export default SystemUserHome;
