import Welcome from "../../atoms/Welcome/Welcome"
import RegisterCard from "../../molecules/RegisterCard/RegisterCard"
import LoginCard from "../../molecules/LoginCard/LoginCard"
import "./HomePage.scss"
import NavBar from "../../molecules/NavBar/NavBar"

function HomePage() {
  return (
    <>
      <NavBar/>
      <Welcome/>
      <div className="HomeBody">

        <div className="Left">
          <RegisterCard/>
        </div>
        <div className="Separator"></div>

        <div className="Right">
          <LoginCard/>
        </div>
        
      </div>
    </>
  )
}

export default HomePage
