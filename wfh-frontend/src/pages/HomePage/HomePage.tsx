//modules
import { useNavigate } from "react-router-dom";

//components
import RegisterCard from "../../molecules/RegisterSection/RegisterCard";
import LoginCard from "../../molecules/LoginSection/LoginCard";
import NavBar from "../../molecules/NavBar/NavBar";

//css
import styles from "./HomePage.module.scss";


const HomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // const token = localStorage.getItem('token');
    navigate('/login')
  }

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
