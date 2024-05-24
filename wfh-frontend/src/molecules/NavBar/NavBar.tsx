//modules
import { useNavigate } from "react-router-dom";

//library components
import { Navbar, Nav, Button } from "rsuite";
import { Others } from "@rsuite/icons";
import {toast} from 'react-toastify';
import "rsuite/dist/rsuite.min.css";

//styles
import styles from "./NavBar.module.scss";

const NavBar = ({NavText = "", logout = false}:NavBarProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem('token');
    toast.error("Logged out!")
    navigate('/');
  }
  return (
    <>
    <Navbar className={styles.Navbar} appearance="default" {...NavText === "System User" ? {style:{position:"fixed"}}: {}}>
        <Navbar.Brand>
          <b>WFH</b>
        </Navbar.Brand>
        <Nav>
          {!logout ? <Nav.Item
            icon={<Others />}
            onClick={() => {navigate('/')}}
          >
            Home
          </Nav.Item>: <></>}
          
          <Nav.Item>{NavText}</Nav.Item>
        </Nav>
        <Nav pullRight>
        <Nav.Item>
            {logout ? <Button className={styles.logoutButton} appearance="primary" color="red" onClick={handleClick}>Logout</Button> : <></>}
          </Nav.Item>
        </Nav>
      </Navbar>
    </>
  );
};

export default NavBar;
