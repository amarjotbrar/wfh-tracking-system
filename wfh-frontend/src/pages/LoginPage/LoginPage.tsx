import NavBar from "../../molecules/NavBar/NavBar";
import LoginForm from "../../organisms/LoginForm/LoginForm";
import "./LoginPage.scss";

const LoginPage = () => {
  return (
    <>
      <NavBar />
      <div className="LoginPageBody">
        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;
