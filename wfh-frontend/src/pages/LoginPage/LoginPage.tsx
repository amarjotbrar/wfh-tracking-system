//components
import NavBar from "../../molecules/NavBar/NavBar";
import LoginForm from "../../organisms/LoginForm/LoginForm";

//styles
import styles from "./LoginPage.module.scss";

const LoginPage = () => {
  return (
    <>
      <NavBar NavText="Login Page" logout={false}/>
      <div className={styles.LoginPageBody}>
        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;
