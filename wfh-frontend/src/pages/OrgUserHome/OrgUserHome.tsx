import "./OrgUserHome.scss";
import NavBar from "../../molecules/NavBar/NavBar";
import OrgCalendar from "../../organisms/Calendar/Calendar";

const OrgUserHome = () => {
  return (
    <>
      <NavBar />
      <div className="OrgHomeBody">
        <OrgCalendar />
      </div>
    </>
  );
};

export default OrgUserHome;
