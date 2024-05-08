import "./SysUserHome.scss";
import NavBar from "../../molecules/NavBar/NavBar";
import { Button } from "rsuite";
import AllOrgs from "../../organisms/AllOrgs/AllOrgs";
import { useState } from "react";
import CreateOrgForm from "../../organisms/CreateOrgForm/CreateOrgForm";

const SysUserHome = () => {
  const [popup, setPopup] = useState(false);

  const togglePopup = () => {
    console.log("hello");
    setPopup(!popup);
  };

  return (
    <>
      <NavBar />
      <div className="SysHomeBody">
        <div className="createOrgContainer">
          <Button
            size="lg"
            appearance="primary"
            color="green"
            onClick={togglePopup}
          >
            Create Organization
          </Button>
        </div>
        {popup ? <CreateOrgForm /> : <></>}
        <div className="AllOrgsContainer">
          <AllOrgs />
        </div>
      </div>
    </>
  );
};

export default SysUserHome;
