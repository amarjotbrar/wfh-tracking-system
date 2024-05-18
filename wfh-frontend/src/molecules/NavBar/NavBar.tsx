//modules
import { useNavigate } from "react-router-dom";

//library components
import { Navbar, Nav } from "rsuite";
import { Others } from "@rsuite/icons";
import "rsuite/dist/rsuite.min.css";

//styles
import styles from "./NavBar.module.scss";

const NavBar = ({NavText = ""}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem('token');
    navigate('/');
  }
  return (
      <Navbar className={styles.Navbar} appearance="default">
        <Navbar.Brand>
          <b>WFH</b>
        </Navbar.Brand>
        <Nav>
          <Nav.Item
            icon={<Others />}
            onClick={handleClick}
          >
            Home
          </Nav.Item>
          <Nav.Item>{NavText}</Nav.Item>
        </Nav>
      </Navbar>
  );
};

export default NavBar;
