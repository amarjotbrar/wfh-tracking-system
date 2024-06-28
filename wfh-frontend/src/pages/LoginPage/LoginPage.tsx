//components
import { useNavigate } from "react-router-dom";
import NavBar from "../../molecules/NavBar/NavBar";
import LoginForm from "../../organisms/LoginForm/LoginForm";

//styles
import styles from "./LoginPage.module.scss";
import { verifyUser } from "../../services/verifyToken/verifyToken";
import { useEffect } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  
  

  useEffect(() => {
    const verify = async() => {
      const token = localStorage.getItem('token')
      if(!token)
      {
        return;
      }
      const response = await verifyUser(token);
      if(response.ok)
      {
        const result = await response.json();
        const userType = result.data.userType;
        console.log(userType)
        if(userType === 'system') navigate('/sys/home');
        else if(userType === 'admin') navigate("/org/admin");
        else if(userType === 'user') navigate("/org/user");
      }
      else{
        localStorage.removeItem('token');
        navigate('/')
      }
    }
    verify();
  },[navigate])

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
