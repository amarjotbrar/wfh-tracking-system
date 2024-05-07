import './NavBar.scss'
import { Navbar, Nav} from 'rsuite';
import {Others} from '@rsuite/icons'
import 'rsuite/dist/rsuite.min.css';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  return (
    <div>
        <Navbar appearance='default'>
            <Navbar.Brand><b>WFH</b></Navbar.Brand>
            <Nav>
                  <Nav.Item icon={<Others/>} onClick={()=>{navigate('/')}}>Home</Nav.Item>
            </Nav>
        </Navbar>
    </div>
  )
}

export default NavBar