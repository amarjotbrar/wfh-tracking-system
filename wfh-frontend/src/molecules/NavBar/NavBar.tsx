//modules
import { useNavigate } from "react-router-dom";

//library components
import { Navbar, Nav } from "rsuite";
import { Others } from "@rsuite/icons";
import "rsuite/dist/rsuite.min.css";

//styles
import styles from "./NavBar.module.scss";

const NavBar = () => {
  const navigate = useNavigate();
  return (
      <Navbar className={styles.Navbar} appearance="default">
        <Navbar.Brand>
          <b>WFH</b>
        </Navbar.Brand>
        <Nav>
          <Nav.Item
            icon={<Others />}
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </Nav.Item>
        </Nav>
      </Navbar>
  );
};

export default NavBar;
