//modules
import { useEffect, useState } from "react";

//library components
import { Button, Modal} from "rsuite";
import { toast } from "react-toastify";

//services
import { makeAdmin, showOrganizationUsers } from "../../services/systemUserServices/systemUserServices";

//types
import { OrganizationUserData, showUserProps } from "./types";

//styles
import 'react-toastify/dist/ReactToastify.css';
import styles from "./ShowOrganizationUsers.module.scss";
import UsersTable from "../UsersTable/UsersTable";
import CreateOrganizationUserForm from "../CreateOrganizationUserForm/CreateOrganizationUserForm";

const ShowOrganizationUsers = ({org_name, closePopup} : showUserProps) => {
  const [popup, setPopup] = useState(false);
  const [data , setData]= useState<OrganizationUserData[]>([]);
  const [content, setContent] = useState(true);

    async function getData() {
        try {
          const token = localStorage.getItem('token');
          if(!token){
            toast.error("Unauthorized Access!");
            return;
          }
          console.log(org_name);
          const response = await showOrganizationUsers(org_name, token);
          const result = await response.json();
          
          if (!response.ok) {
            toast.error("Unable to Show Organization Users!");
          } else {
            setData(result.data.response);
            setPopup(true);
          }
        } catch (error) {
          toast.error("Error fetching data!")
          console.error("Error fetching data:", error);
        }
      }

      useEffect(()=>{
        getData();
      },[])

    const handleAdminClick = async (id: string) => {
      console.log(id);
      const token = localStorage.getItem('token');
      if(!token){
        toast.error("Unauthorized Access!");
      }
      else{
      const response = await makeAdmin(id, token);
      const result = await response.json();

      if(response.ok)
        {
          toast.success("Created Admin");
          getData();
        }
      else 
      {
        toast.error(result.data.error);
      }
      
      console.log(result.data);
    }
  }

  const togglePopup = () => {
    closePopup();
  };

  const showForm = () => {
    setContent(false);
  }

  const showUsers = () => {
    setContent(true);
    getData();
  }

  return (
    <>
    <Modal open={popup} onClose={togglePopup}  className={styles.modal} >
      <Modal.Header>
        <Modal.Title>{content ?"Users in" : "Create User in"} {org_name.toUpperCase()}: </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        {content ? <UsersTable data={data} handleAdminClick={handleAdminClick}/> : <CreateOrganizationUserForm org_name={org_name} showUsers={showUsers}/> }
      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        {
          content ?
          <Button appearance="primary" color="blue" onClick={showForm}>Create New User</Button>:
          <Button appearance="primary" color="green" onClick={showUsers}> Show Users</Button> 
        }    
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default ShowOrganizationUsers;
