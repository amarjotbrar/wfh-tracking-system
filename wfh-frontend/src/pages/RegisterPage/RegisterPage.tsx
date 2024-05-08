import NavBar from "../../molecules/NavBar/NavBar";
import RegisterForm from "../../organisms/RegisterForm/RegisterForm";
import "./RegisterPage.scss";

const RegisterPage = () => {
  return (
    <>
      <NavBar />
      <div className="LoginPageBody">
        <RegisterForm />
      </div>
    </>
  );
};

export default RegisterPage;
