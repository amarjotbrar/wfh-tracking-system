import styles from "./OrganizationAdminPage.module.scss";
import NavBar from "../../molecules/NavBar/NavBar";

const OrganizationAdminPage = () => {
  return (
    <>
      <NavBar />
      <div className={styles.OrganizationAdminPage}>
        <h1>This is Admin Page</h1>
      </div>
    </>
  );
};

export default OrganizationAdminPage;
