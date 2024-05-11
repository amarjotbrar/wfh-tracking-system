//components
import NavBar from "../../molecules/NavBar/NavBar";
import RegisterForm from "../../organisms/RegisterForm/RegisterForm";

//styles
import styles from "./RegisterPage.module.scss";

const RegisterPage = () => {
  return (
    <>
      <NavBar />
      <div className={styles.RegisterPageBody}>
        <RegisterForm />
      </div>
    </>
  );
};

export default RegisterPage;
