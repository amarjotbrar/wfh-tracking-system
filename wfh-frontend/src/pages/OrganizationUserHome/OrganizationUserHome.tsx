import styles from "./OrganizationUserHome.module.scss";
import NavBar from "../../molecules/NavBar/NavBar";
import OrganizationUserCalendar from "../../organisms/Calendar/Calendar";

const OrganizationUserHome = () => {
  return (
    <>
      <NavBar />
      <div className={styles.OrganizationUserHome}>
        <OrganizationUserCalendar />
      </div>
    </>
  );
};

export default OrganizationUserHome;
