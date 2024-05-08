import NavBar from "../../molecules/NavBar/NavBar";
import LoginForm from "../../organisms/LoginForm/LoginForm";
import "./LoginPage.scss";

const LoginPage = () => {
const baseImg = 'https://images.pexels.com/photos/20476928/pexels-photo-20476928/free-photo-of-sneakers-a-basketball-and-an-analog-camera-lying-on-an-old-rug.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'

  return (
    <>
      <NavBar />
      <div className="LoginPageBody">
        <LoginForm />
        <div>
          <img src={baseImg} alt="" />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
