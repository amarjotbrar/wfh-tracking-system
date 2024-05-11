//molecules
import RegisterCard from "../../molecules/RegisterCard/RegisterCard";
import LoginCard from "../../molecules/LoginCard/LoginCard";
import NavBar from "../../molecules/NavBar/NavBar";

//css
import "./HomePage.scss";


const HomePage = () => {
  return (
    <>
      <NavBar />
      <div className="WelcomeContainer">
        <h2>Welcome to</h2>
        <h2 className="Focused">"Work From Home Tracking System"</h2>
      </div>
      <div className="HomeBody">
        <div className="Left">
          <RegisterCard />
        </div>
        <div className="Separator"></div>

        <div className="Right">
          <LoginCard />
        </div>
      </div>
    </>
  );
};

export default HomePage;
