import styles from "./OrganizationUserHome.module.scss";
import NavBar from "../../molecules/NavBar/NavBar";
import OrganizationUserCalendar from "../../organisms/OrganizationUserCalander/OrganizationUserCalendar";
import { ToastContainer } from "react-toastify";

const OrganizationUserHome = () => {
  return (
    <>
      <NavBar />
      <div className={styles.OrganizationUserHome}>
        <OrganizationUserCalendar />
      </div>
      <ToastContainer/>
    </>
  );
};

export default OrganizationUserHome;
