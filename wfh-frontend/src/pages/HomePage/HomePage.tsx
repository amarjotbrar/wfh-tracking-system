//modules
import { useNavigate } from "react-router-dom";

//components
import RegisterCard from "../../molecules/RegisterSection/RegisterCard";
import LoginCard from "../../molecules/LoginSection/LoginCard";
import NavBar from "../../molecules/NavBar/NavBar";

//css
import styles from "./HomePage.module.scss";
import { verifyUser } from "../../services/verifyToken/verifyToken";
import { useEffect } from "react";


const HomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // const token = localStorage.getItem('token');
    navigate('/login')
  }

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
        if(userType === 'system') navigate("sys/home");
        else if(userType === 'admin') navigate("org/admin");
        else if(userType === 'user') navigate("org/user");
      }
      else{
        localStorage.removeItem('token');
      }
    }
    verify();
  },[navigate])

  return (
    <>
      <NavBar NavText="Home Page" logout={false}/>
      <div className={styles.WelcomeContainer}>
        <h2>Welcome to</h2>
        <h2 className={styles.Focused}>"Work From Home Tracking System"</h2>
      </div>

      <div className={styles.HomeBody}>
        <div className={styles.Left}>
          <RegisterCard />
        </div>

        <div className={styles.Separator}></div>

        <div className={styles.Right}>
          <LoginCard handleLogin={handleLogin} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
